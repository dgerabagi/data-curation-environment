import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

// Images are excluded from the tree view entirely as per user feedback.
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);

export class FSService {

    private async getFileStats(filePath: string): Promise<{ tokenCount: number, sizeInBytes: number, isImage: boolean }> {
        try {
            const extension = path.extname(filePath).toLowerCase();
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                return { tokenCount: 0, sizeInBytes: 0, isImage: false };
            }

            const isImage = IMAGE_EXTENSIONS.has(extension);
            if (isImage) {
                // As per C18 feedback, images are excluded, but we'll handle them gracefully if they slip through.
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: true };
            }

            // Ignore very large files to prevent performance issues
            if (stats.size > 2_000_000) { 
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: false };
            }
            
            const content = await fs.readFile(filePath, 'utf-8');
            // Simple approximation: 1 token ~ 4 characters
            const tokenCount = Math.ceil(content.length / 4);
            return { tokenCount, sizeInBytes: stats.size, isImage: false };

        } catch (error) {
            // Could be a binary file or permissions issue
            console.warn(`Could not get stats for ${filePath}: ${error}`);
            return { tokenCount: 0, sizeInBytes: 0, isImage: false };
        }
    }

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        const rootUri = workspaceFolders[0].uri;
        if (!rootUri) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const rootPath = rootUri.fsPath;
        
        // CRITICAL FIX (C18): Robust exclusion for node_modules and all image types.
        const excludePattern = '{**/node_modules/**,**/*.png,**/*.jpg,**/*.jpeg,**/*.gif,**/*.svg,**/*.ico,**/*.webp}';
        const files = await vscode.workspace.findFiles("**/*", excludePattern);
        
        const fileTree = await this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private async createFileTree(rootPath: string, files: vscode.Uri[]): Promise<FileNode> {
        const rootStats = await this.getFileStats(rootPath);
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: [],
            ...rootStats,
            fileCount: 0, // Will be calculated
        };

        const allNodes = new Map<string, FileNode>();
        allNodes.set(rootPath, rootNode);

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentPath = rootPath;
            let parentNode = rootNode;

            for (const part of parts) {
                const oldPath = currentPath;
                currentPath = path.join(currentPath, part);
                let childNode = allNodes.get(currentPath);

                if (!childNode) {
                    const stats = await this.getFileStats(currentPath);
                    const isDirectory = stats.sizeInBytes === 0 && !stats.isImage; // Heuristic for directories
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
        if (!node.children) { // It's a file
            node.fileCount = 1;
            return;
        }

        // Recursively process children first
        for (const child of node.children) {
            this.processNode(child);
        }

        // Sort children: folders first, then files, then alphabetically
        node.children.sort((a, b) => {
            const aIsFolder = !!a.children;
            const bIsFolder = !!b.children;
            if (aIsFolder !== bIsFolder) {
                return aIsFolder ? -1 : 1;
            }
            // Use localeCompare with numeric option for natural sorting (e.g., A1, A2, A10)
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });
        
        // Calculate totals for the current node
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