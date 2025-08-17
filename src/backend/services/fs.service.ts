import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";
import { Services } from "./services";
import { serverIPCs } from "@/client/views";
import { VIEW_TYPES } from "@/common/view-types";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);

export class FSService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;
    private debounceTimer: NodeJS.Timeout | null = null;

    public initializeWatcher() {
        if (this.watcher) {
            this.watcher.dispose();
        }
        
        this.watcher = vscode.workspace.createFileSystemWatcher('**/*');
        Services.loggerService.log("File system watcher initialized.");

        const changeHandler = (uri: vscode.Uri) => {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
            this.debounceTimer = setTimeout(() => {
                Services.loggerService.log(`File system change detected at ${uri.fsPath}. Invalidating cache and triggering refresh.`);
                this.fileTreeCache = null;
                
                const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                if (serverIpc) {
                    this.handleWorkspaceFilesRequest(serverIpc, true);
                } else {
                    Services.loggerService.warn("Could not push file tree update, serverIpc not available.");
                }
            }, 500);
        };

        this.watcher.onDidChange(changeHandler);
        this.watcher.onDidCreate(changeHandler);
        this.watcher.onDidDelete(changeHandler);
    }

    private async getFileStats(filePath: string): Promise<{ tokenCount: number, sizeInBytes: number, isImage: boolean }> {
        try {
            const extension = path.extname(filePath).toLowerCase();
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                return { tokenCount: 0, sizeInBytes: 0, isImage: false };
            }

            const isImage = IMAGE_EXTENSIONS.has(extension);
            if (isImage) {
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: true };
            }

            if (stats.size > 5_000_000) {
                Services.loggerService.warn(`Skipping token count for large file: ${filePath} (${stats.size} bytes)`);
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: false };
            }
            
            const content = await fs.readFile(filePath, 'utf-8');
            const tokenCount = Math.ceil(content.length / 4);
            return { tokenCount, sizeInBytes: stats.size, isImage: false };

        } catch (error: any) {
            Services.loggerService.warn(`Could not get stats for ${filePath}: ${error.message}`);
            return { tokenCount: 0, sizeInBytes: 0, isImage: false };
        }
    }

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager, forceRefresh: boolean = false) {
        if (!forceRefresh && this.fileTreeCache) {
            Services.loggerService.log("Serving file tree from cache.");
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
            return;
        }

        Services.loggerService.log("Building file tree from scratch.");
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            Services.loggerService.warn("No workspace folder open. Sending empty file list.");
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        const rootUri = workspaceFolders[0].uri;
        const rootPath = rootUri.fsPath;
        
        const excludePattern = '{**/node_modules/**,**/dist/**,**/out/**,**/.git/**,**/flattened_repo.md}';
        Services.loggerService.log(`Scanning for files with exclusion pattern: ${excludePattern}`);
        
        const files = await vscode.workspace.findFiles("**/*", excludePattern);
        Services.loggerService.log(`Found ${files.length} files after exclusion.`);
        
        const fileTree = await this.createFileTree(rootPath, files);

        this.fileTreeCache = [fileTree];
        Services.loggerService.log("Sending file tree to client and caching result.");
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
    }

    private async createFileTree(rootPath: string, files: vscode.Uri[]): Promise<FileNode> {
        const rootStats = await this.getFileStats(rootPath);
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: [],
            ...rootStats,
            fileCount: 0,
        };

        const allNodes = new Map<string, FileNode>();
        allNodes.set(rootPath, rootNode);

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentPath = rootPath;
            let parentNode = rootNode;

            for (const part of parts) {
                currentPath = path.join(currentPath, part);
                let childNode = allNodes.get(currentPath);

                if (!childNode) {
                    const stats = await this.getFileStats(currentPath);
                    const isDirectory = stats.sizeInBytes === 0 && !stats.isImage && (await fs.stat(currentPath)).isDirectory();
                    childNode = {
                        name: part,
                        absolutePath: currentPath,
                        ...stats,
                        fileCount: isDirectory ? 0 : 1
                    };
                    if (isDirectory) {
                        childNode.children = [];
                    }

                    if (parentNode.children) {
                        parentNode.children.push(childNode);
                        allNodes.set(currentPath, childNode);
                    }
                }
                parentNode = childNode;
            }
        }
        
        this.processNode(rootNode);
        return rootNode;
    }

    private processNode(node: FileNode): void {
        if (!node.children) {
            node.fileCount = 1;
            return;
        }

        for (const child of node.children) {
            this.processNode(child);
        }

        node.children.sort((a, b) => {
            const aIsFolder = !!a.children;
            const bIsFolder = !!b.children;
            if (aIsFolder !== bIsFolder) {
                return aIsFolder ? -1 : 1;
            }
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });
        
        let totalTokens = 0;
        let totalFiles = 0;
        let totalBytes = 0;
        for (const child of node.children) {
            totalTokens += child.tokenCount;
            totalFiles += child.fileCount;
            totalBytes += child.sizeInBytes;
        }
        node.tokenCount = totalTokens;
        node.fileCount = totalFiles;
        node.sizeInBytes = totalBytes;
    }

    // --- File Operations ---

    public async handleNewFileRequest(parentDirectory: string) {
        const newFileName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new file",
            value: "new-file.ts",
        });
        if (newFileName) {
            const newFilePath = path.join(parentDirectory, newFileName);
            try {
                await vscode.workspace.fs.writeFile(vscode.Uri.file(newFilePath), new Uint8Array());
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to create file: ${error.message}`);
            }
        }
    }

    public async handleNewFolderRequest(parentDirectory: string) {
        const newFolderName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new folder",
            value: "new-folder",
        });
        if (newFolderName) {
            const newFolderPath = path.join(parentDirectory, newFolderName);
            try {
                await vscode.workspace.fs.createDirectory(vscode.Uri.file(newFolderPath));
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to create folder: ${error.message}`);
            }
        }
    }

    public async handleFileRenameRequest(oldPath: string, newName: string) {
        const newPath = path.join(path.dirname(oldPath), newName);
        try {
            await vscode.workspace.fs.rename(vscode.Uri.file(oldPath), vscode.Uri.file(newPath));
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to rename: ${error.message}`);
        }
    }

    public async handleFileDeleteRequest(filePath: string) {
        const confirmation = await vscode.window.showWarningMessage(
            `Are you sure you want to delete ${path.basename(filePath)}? This will move it to the trash.`,
            { modal: true },
            'Delete'
        );
        if (confirmation === 'Delete') {
            try {
                await vscode.workspace.fs.delete(vscode.Uri.file(filePath), { recursive: true, useTrash: true });
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to delete: ${error.message}`);
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
}