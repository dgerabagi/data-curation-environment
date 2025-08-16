import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";
import { Services } from "./services";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export class FSService {

    private async getFileStats(filePath: string): Promise<{ tokenCount: number, sizeInBytes: number, isImage: boolean }> {
        try {
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                return { tokenCount: 0, sizeInBytes: 0, isImage: false };
            }

            // isImage is determined by the exclusion glob now, so this is redundant but safe.
            const isImage = false; 

            if (stats.size > MAX_FILE_SIZE_BYTES) { 
                Services.loggerService.warn(`Skipping token count for large file: ${path.basename(filePath)} (${stats.size} bytes)`);
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

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("Received request for workspace files.");
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            Services.loggerService.warn("No workspace folder open. Sending empty file list.");
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        const rootUri = workspaceFolders[0].uri;
        const rootPath = rootUri.fsPath;
        
        // CRITICAL FIX (C18): Definitive exclusion for common large/unwanted directories and all image types.
        const excludePattern = '{**/node_modules/**,**/dist/**,**/out/**,**/.git/**,**/*.{png,jpg,jpeg,gif,svg,webp,ico}}';
        Services.loggerService.log(`Scanning for files with exclusion pattern: ${excludePattern}`);
        
        const files = await vscode.workspace.findFiles("**/*", excludePattern);
        Services.loggerService.log(`Found ${files.length} files after exclusion.`);
        
        const fileTree = await this.createFileTree(rootPath, files);

        Services.loggerService.log("Sending file tree to client.");
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private async createFileTree(rootPath: string, files: vscode.Uri[]): Promise<FileNode> {
        const rootStats = { tokenCount: 0, sizeInBytes: 0, isImage: false }; // Root is always a directory
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
                    const isDirectory = (await fs.stat(currentPath)).isDirectory();
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
        
        this.aggregateStats(rootNode);
        this.sortTree(rootNode);
        return rootNode;
    }

    private aggregateStats(node: FileNode): void {
        if (!node.children) {
            node.fileCount = 1;
            return;
        }

        let totalTokens = 0;
        let totalFiles = 0;
        let totalBytes = 0;
        for (const child of node.children) {
            this.aggregateStats(child);
            totalTokens += child.tokenCount;
            totalFiles += child.fileCount;
            totalBytes += child.sizeInBytes;
        }
        node.tokenCount = totalTokens;
        node.fileCount = totalFiles;
        node.sizeInBytes = totalBytes;
    }

    private sortTree(node: FileNode): void {
        if (!node.children) {
            return;
        }

        for (const child of node.children) {
            this.sortTree(child);
        }

        node.children.sort((a, b) => {
            const aIsFolder = !!a.children;
            const bIsFolder = !!b.children;
            if (aIsFolder !== bIsFolder) {
                return aIsFolder ? -1 : 1;
            }
            // Use localeCompare with numeric option for natural sorting (e.g., A2 before A10)
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });
    }
}