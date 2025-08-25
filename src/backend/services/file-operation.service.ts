// src/backend/services/file-operation.service.ts
import * as vscode from "vscode";
import * as path from "path";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { Services } from "./services";
import { Action, MoveActionPayload } from "./action.service";
import { BatchWriteFile } from "@/common/ipc/channels.type";

const normalizePath = (p: string) => p.replace(/\\/g, '/');

export class FileOperationService {
    private filesToIgnoreForAutoAdd: Set<string> = new Set();

    public async fileExists(filePath: string): Promise<boolean> {
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(filePath));
            return true;
        } catch {
            return false;
        }
    }

    public async handleBatchFileWrite(files: BatchWriteFile[]): Promise<string[]> {
        Services.loggerService.log(`[File Operation] Received request to write ${files.length} files.`);
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage("Cannot write files: No workspace folder is open.");
            return [];
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const successfulPaths: string[] = [];

        try {
            for (const file of files) {
                const absolutePath = path.resolve(rootPath, file.path);
                const uri = vscode.Uri.file(absolutePath);
                // Ensure directory exists
                await vscode.workspace.fs.createDirectory(vscode.Uri.file(path.dirname(absolutePath)));
                const contentBuffer = Buffer.from(file.content, 'utf-8');
                await vscode.workspace.fs.writeFile(uri, contentBuffer);
                Services.loggerService.log(`Successfully wrote content to: ${file.path}`);
                successfulPaths.push(file.path);
            }
            vscode.window.showInformationMessage(`Successfully accepted and wrote ${files.length} files to the workspace.`);
        } catch (error: any) {
            Services.loggerService.error(`Failed during batch file write: ${error.message}`);
            vscode.window.showErrorMessage(`Failed to write files: ${error.message}`);
        }
        return successfulPaths;
    }

    public async handleFileContentRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`handleFileContentRequest initiated for: ${filePath}`);
        try {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders || workspaceFolders.length === 0) {
                throw new Error("No workspace folder open.");
            }
            const absolutePath = path.resolve(workspaceFolders[0].uri.fsPath, filePath);
            const uri = vscode.Uri.file(absolutePath);
            const contentBuffer = await vscode.workspace.fs.readFile(uri);
            const content = Buffer.from(contentBuffer).toString('utf-8');
            Services.loggerService.log(`Successfully read content for: ${filePath}. Sending to client.`);
            serverIpc.sendToClient(ServerToClientChannel.SendFileContent, { path: filePath, content });
        } catch (error: any) {
            Services.loggerService.error(`Failed to read file content for ${filePath}: ${error.message}`);
            serverIpc.sendToClient(ServerToClientChannel.SendFileContent, { path: filePath, content: `// Error: Could not read file content for ${filePath}. It may not exist in the workspace.` });
        }
    }

    public async handleFileExistenceRequest(paths: string[], serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`[File Existence] Received request to check paths: ${JSON.stringify(paths)}`);
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            Services.loggerService.error("[File Existence] Cannot check for files, no workspace folder is open.");
            serverIpc.sendToClient(ServerToClientChannel.SendFileExistence, { existenceMap: {} });
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
    
        const existenceMap: { [path: string]: boolean } = {};
        const checks = paths.map(async (p_raw) => {
            const p = p_raw.trim().replace(/^[`"']|[`"']$/g, '');
            if (!p) return;
    
            let absolutePath = path.resolve(rootPath, p);
            let normalizedPath = normalizePath(absolutePath);
    
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(normalizedPath));
                existenceMap[p_raw] = true;
            } catch {
                if (/^A\d+/.test(p)) {
                    const artifactPath = path.resolve(rootPath, 'src/Artifacts', p);
                    const normalizedArtifactPath = normalizePath(artifactPath);
                    try {
                        await vscode.workspace.fs.stat(vscode.Uri.file(normalizedArtifactPath));
                        existenceMap[p_raw] = true;
                        return;
                    } catch {}
                }
                existenceMap[p_raw] = false;
            }
        });
        await Promise.all(checks);
        serverIpc.sendToClient(ServerToClientChannel.SendFileExistence, { existenceMap });
    }

    private async _findAvailableCopyName(destinationPath: string): Promise<string> {
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(destinationPath));
        } catch (error) {
            return destinationPath;
        }
    
        const dir = path.dirname(destinationPath);
        const ext = path.extname(destinationPath);
        const baseName = path.basename(destinationPath, ext);
    
        let copyNum = 1;
        let nextPath = path.join(dir, `${baseName}-copy${ext}`);
        
        while (true) {
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(nextPath));
                copyNum++;
                nextPath = path.join(dir, `${baseName}-copy-${copyNum}${ext}`);
            } catch (error) {
                return nextPath;
            }
        }
    }

    public async handleCopyFileRequest(sourcePath: string, destinationDir: string) {
        try {
            const sourceName = path.basename(sourcePath);
            const initialDestinationPath = path.join(destinationDir, sourceName);
            const finalDestinationPath = await this._findAvailableCopyName(initialDestinationPath);
            const sourceUri = vscode.Uri.file(sourcePath);
            const destinationUri = vscode.Uri.file(finalDestinationPath);

            await vscode.workspace.fs.copy(sourceUri, destinationUri, { overwrite: false });
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to copy file: ${error.message}`);
        }
    }

    public async handleCopyFileFromUri(sourceUriString: string, targetDir: string) {
        try {
            const sourceUri = vscode.Uri.parse(sourceUriString);
            const fileName = path.basename(sourceUri.fsPath);
            const targetUri = vscode.Uri.file(path.join(targetDir, fileName));
            await vscode.workspace.fs.copy(sourceUri, targetUri);
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to copy file from URI: ${error.message}`);
        }
    }

    public async handleAddFileFromBuffer(targetPath: string, data: Uint8Array) {
        try {
            await vscode.workspace.fs.writeFile(vscode.Uri.file(targetPath), data);
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to add file from buffer: ${error.message}`);
        }
    }

    public async handleOpenFileRequest(filePath: string) {
        try {
            await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath));
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to open file ${filePath}: ${error.message}`);
        }
    }

    public async handleNewFileRequest(parentDirectory: string) {
        const newFileName = await vscode.window.showInputBox({ prompt: "Enter the name of the new file", value: "new-file.ts" });
        if (newFileName) {
            try {
                await vscode.workspace.fs.writeFile(vscode.Uri.file(path.join(parentDirectory, newFileName)), new Uint8Array());
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to create file: ${error.message}`);
            }
        }
    }
    
    public async handleCreateFileRequest(filePath: string) {
        Services.loggerService.log(`Received request to create file: ${filePath}`);
        try {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders || workspaceFolders.length === 0) throw new Error("No workspace folder open.");
            const absolutePath = path.resolve(workspaceFolders[0].uri.fsPath, filePath);
            await vscode.workspace.fs.writeFile(vscode.Uri.file(absolutePath), new Uint8Array());
            Services.loggerService.log(`Successfully created file: ${filePath}`);
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to create file: ${error.message}`);
            Services.loggerService.error(`Failed to create file ${filePath}: ${error.message}`);
        }
    }

    public async handleNewFolderRequest(parentDirectory: string) {
        const newFolderName = await vscode.window.showInputBox({ prompt: "Enter the name of the new folder", value: "new-folder" });
        if (newFolderName) {
            try {
                await vscode.workspace.fs.createDirectory(vscode.Uri.file(path.join(parentDirectory, newFolderName)));
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to create folder: ${error.message}`);
            }
        }
    }

    public async handleFileRenameRequest(oldPath: string, newName: string) {
        try {
            await vscode.workspace.fs.rename(vscode.Uri.file(oldPath), vscode.Uri.file(path.join(path.dirname(oldPath), newName)));
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to rename: ${error.message}`);
        }
    }

    public async handleMoveFileRequest(oldPath: string, newPath: string) {
        try {
            const lastSelection = await Services.selectionService.getLastSelection();
            if (!lastSelection.some(p => p.startsWith(oldPath))) {
                this.filesToIgnoreForAutoAdd.add(newPath);
                setTimeout(() => this.filesToIgnoreForAutoAdd.delete(newPath), 2000);
            }

            await vscode.workspace.fs.rename(vscode.Uri.file(oldPath), vscode.Uri.file(newPath));
            await Services.selectionService.updatePathInSelections(oldPath, newPath);
            Services.actionService.push({ type: 'move', payload: { fromPath: oldPath, toPath: newPath } as MoveActionPayload });
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to move file: ${error.message}`);
        }
    }

    public async handleFileDeleteRequest(filePath: string) {
        const confirmation = await vscode.window.showWarningMessage(`Are you sure you want to delete ${path.basename(filePath)}?`, { modal: true }, 'Delete');
        if (confirmation === 'Delete') {
            try {
                await vscode.workspace.fs.delete(vscode.Uri.file(filePath), { recursive: true, useTrash: true });
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to delete: ${error.message}`);
            }
        }
    }

    public async handleBatchFileDeleteRequest(paths: string[]) {
        if (paths.length === 0) return;
        const confirmation = await vscode.window.showWarningMessage(`Are you sure you want to delete ${paths.length} item(s)?`, { modal: true }, 'Delete');
        if (confirmation === 'Delete') {
            try {
                await Promise.all(paths.map(p => vscode.workspace.fs.delete(vscode.Uri.file(p), { recursive: true, useTrash: true })));
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to delete items: ${error.message}`);
            }
        }
    }

    public handleRevealInExplorerRequest(filePath: string) {
        vscode.commands.executeCommand('revealInExplorer', vscode.Uri.file(filePath));
    }

    public handleCopyPathRequest(filePath: string, relative: boolean) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        let pathToCopy = filePath;
        if (relative && workspaceFolders && workspaceFolders.length > 0) {
            pathToCopy = path.relative(workspaceFolders[0].uri.fsPath, filePath);
        }
        vscode.env.clipboard.writeText(pathToCopy);
        vscode.window.showInformationMessage(`Copied to clipboard: ${pathToCopy}`);
    }

    public addFileToIgnoreForAutoAdd(filePath: string) {
        this.filesToIgnoreForAutoAdd.add(filePath);
    }

    public hasFileToIgnoreForAutoAdd(filePath: string): boolean {
        return this.filesToIgnoreForAutoAdd.has(filePath);
    }

    public removeFileToIgnoreForAutoAdd(filePath: string) {
        this.filesToIgnoreForAutoAdd.delete(filePath);
    }
}