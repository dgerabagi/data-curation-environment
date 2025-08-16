import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";
import { Services } from "./services";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);

export class FSService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;

    constructor() {
        this.setupFileSystemWatcher();
    }

    private setupFileSystemWatcher() {
        if (this.watcher) {
            this.watcher.dispose();
        }
        // Watch for changes in all files
        this.watcher = vscode.workspace.createFileSystemWatcher('**/*');

        const changeHandler = (uri: vscode.Uri) => {
            // Invalidate cache on any change
            this.fileTreeCache = null;
            Services.loggerService.log(`File system change detected at ${uri.fsPath}. Cache invalidated.`);
            // Optionally, push an update to the client here.
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

            if (stats.size > 5_000_000) { // 5MB threshold
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
        
        const excludePattern = '{**/node_modules/**,**/dist/**,**/out/**,**/.git/**}';
        Services.loggerService.log(`Scanning for files with exclusion pattern: ${excludePattern}`);
        
        const files = await vscode.workspace.findFiles("**/*", excludePattern);
        Services.loggerService.log(`Found ${files.length} files after exclusion.`);
        
        const fileTree = await this.createFileTree(rootPath, files);

        this.fileTreeCache = [fileTree]; // Cache the result
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
}