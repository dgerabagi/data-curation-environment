// src/backend/services/file-operation.service.ts
// Updated on: C18 (Use extensionPath for asset files)
import * as vscode from "vscode";
import * as path from "path";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { Services } from "./services";
import { Action, MoveActionPayload } from "./action.service";
import { BatchWriteFile } from "@/common/ipc/channels.type";
import { diceCoefficient } from "@/common/utils/similarity";
import { promises as fs } from 'fs';

const normalizePath = (p: string) => p.replace(/\\/g, '/');

export class FileOperationService {
    private filesToIgnoreForAutoAdd: Set<string> = new Set();
    
    private getWorkspaceRoot(): string {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            throw new Error("No workspace folder open.");
        }
        // Use the first workspace folder's URI when multiple folders are open
        return workspaceFolders[0].uri.fsPath;
    }

    public async handleReadmeContentRequest(serverIpc: ServerPostMessageManager) {
        try {
            const readmePath = path.join(Services.context.extensionPath, 'README.md');
            Services.loggerService.log(`Attempting to read README from extension path: ${readmePath}`);
            const content = await fs.readFile(readmePath, 'utf-8');
            serverIpc.sendToClient(ServerToClientChannel.SendReadmeContent, { content });
        } catch (error) {
            Services.loggerService.error(`Failed to read README.md: ${error}`);
            serverIpc.sendToClient(ServerToClientChannel.SendReadmeContent, { content: '# README.md not found in extension files.' });
        }
    }

    public async handleChangelogContentRequest(serverIpc: ServerPostMessageManager) {
        try {
            const changelogPath = path.join(Services.context.extensionPath, 'CHANGELOG.md');
            Services.loggerService.log(`Attempting to read CHANGELOG from extension path: ${changelogPath}`);
            const content = await fs.readFile(changelogPath, 'utf-8');
            serverIpc.sendToClient(ServerToClientChannel.SendChangelogContent, { content });
        } catch (error) {
            Services.loggerService.error(`Failed to read CHANGELOG.md: ${error}`);
            serverIpc.sendToClient(ServerToClientChannel.SendChangelogContent, { content: '# CHANGELOG.md not found in extension files.' });
        }
    }

    public async fileExists(filePath: string): Promise<boolean> {
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(filePath));
            return true;
        } catch {
            return false;
        }
    }

    public async handleShowInformationMessageRequest(message: string) {
        Services.loggerService.log(`[UI NOTIFY] Received request to show message: "${message}"`);
        vscode.window.showInformationMessage(message);
    }

    public async handleOpenFolderRequest() {
        Services.loggerService.log(`[File Operation] Received request to open folder.`);
        try {
            await vscode.commands.executeCommand('vscode.openFolder');
        } catch (error: any) {
            Services.loggerService.error(`[File Operation] Failed to execute open folder command: ${error.message}`);
            vscode.window.showErrorMessage(`Failed to open folder: ${error.message}`);
        }
    }

    public async handleCopyTextToClipboardRequest(text: string) {
        Services.loggerService.log(`[Clipboard] Received request to copy text.`);
        try {
            await vscode.env.clipboard.writeText(text);
            vscode.window.showInformationMessage('File content copied to clipboard.');
        } catch (error: any) {
            Services.loggerService.error(`[Clipboard] Failed to copy: ${error.message}`);
            vscode.window.showErrorMessage('Failed to copy file content to clipboard.');
        }
    }

    public async handleFileComparisonRequest(filePath: string, modifiedContent: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`[Comparison] Received request for: ${filePath}`);
        try {
            const absolutePath = path.resolve(this.getWorkspaceRoot(), filePath);
            const originalContentBuffer = await vscode.workspace.fs.readFile(vscode.Uri.file(absolutePath));
            const originalContent = Buffer.from(originalContentBuffer).toString('utf-8');

            const originalTokens = Math.ceil(originalContent.length / 4);
            const modifiedTokens = Math.ceil(modifiedContent.length / 4);
            const similarity = diceCoefficient(originalContent, modifiedContent);

            serverIpc.sendToClient(ServerToClientChannel.SendFileComparison, {
                filePath,
                originalTokens,
                modifiedTokens,
                similarity
            });
        } catch (error: any) {
            Services.loggerService.error(`[Comparison] Failed for ${filePath}: ${error.message}`);
            // Send back error state
            serverIpc.sendToClient(ServerToClientChannel.SendFileComparison, {
                filePath,
                originalTokens: -1,
                modifiedTokens: Math.ceil(modifiedContent.length / 4),
                similarity: 0
            });
        }
    }

    public async handleBatchFileWrite(files: BatchWriteFile[]): Promise<string[]> {
        Services.loggerService.log(`[File Operation] Received request to write ${files.length} files.`);
        const rootPath = this.getWorkspaceRoot();
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
            const absolutePath = path.resolve(this.getWorkspaceRoot(), filePath);
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
        const rootPath = this.getWorkspaceRoot();
    
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
            const absolutePath = path.resolve(this.getWorkspaceRoot(), filePath);
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
                this.addFileToIgnoreForAutoAdd(newPath);
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
            // Use the first workspace folder's URI to compute a relative path
            pathToCopy = path.relative(workspaceFolders[0].uri.fsPath, filePath);
        }
        vscode.env.clipboard.writeText(pathToCopy);
        vscode.window.showInformationMessage(`Copied to clipboard: ${pathToCopy}`);
    }

    public addFileToIgnoreForAutoAdd(filePath: string) {
        Services.loggerService.log(`[Auto-Add] Temporarily ignoring: ${filePath}`);
        this.filesToIgnoreForAutoAdd.add(filePath);
        setTimeout(() => this.removeFileToIgnoreForAutoAdd(filePath), 2000);
    }

    public hasFileToIgnoreForAutoAdd(filePath: string): boolean {
        return this.filesToIgnoreForAutoAdd.has(filePath);
    }

    public removeFileToIgnoreForAutoAdd(filePath: string) {
        this.filesToIgnoreForAutoAdd.delete(filePath);
    }
}