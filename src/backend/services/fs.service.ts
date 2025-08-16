import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

export class FSService {

    private async calculateTokenCount(filePath: string): Promise<number> {
        try {
            const stats = await fs.stat(filePath);
            // Ignore large files to prevent performance issues
            if (stats.isDirectory() || stats.size > 1_000_000) { 
                return 0;
            }
            const content = await fs.readFile(filePath, 'utf-8');
            // Simple approximation: 1 token ~ 4 characters
            return Math.ceil(content.length / 4);
        } catch (error) {
            // Could be a binary file or permissions issue, just return 0
            return 0;
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
        const files = await vscode.workspace.findFiles("**/*");
        const fileTree = await this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private async createFileTree(rootPath: string, files: vscode.Uri[]): Promise<FileNode> {
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: [],
            tokenCount: 0,
            fileCount: 0,
        };

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentNode = rootNode;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                let childNode = currentNode.children?.find(c => c.name === part);

                if (!childNode) {
                    const newPath = path.join(currentNode.absolutePath, part);
                    const isDirectory = i < parts.length - 1;

                    childNode = { 
                        name: part, 
                        absolutePath: newPath,
                        tokenCount: 0,
                        fileCount: isDirectory ? 0 : 1
                    };

                    if (isDirectory) {
                        childNode.children = [];
                    } else {
                        childNode.tokenCount = await this.calculateTokenCount(newPath);
                    }
                    currentNode.children?.push(childNode);
                }
                currentNode = childNode;
            }
        }
        
        // Post-process to calculate folder stats and sort
        this.processNode(rootNode);

        return rootNode;
    }

    private processNode(node: FileNode): void {
        if (!node.children) {
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
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });
        
        // Calculate totals for the current node
        let totalTokens = 0;
        let totalFiles = 0;
        for (const child of node.children) {
            totalTokens += child.tokenCount;
            totalFiles += child.fileCount;
        }
        node.tokenCount = totalTokens;
        node.fileCount = totalFiles;
    }
}