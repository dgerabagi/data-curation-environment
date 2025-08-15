import * as vscode from "vscode";
import * as path from "path";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

export class FSService {
    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            // Send empty array if no folder is open
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        // For simplicity, we'll just use the first workspace folder.
        const rootUri = workspaceFolders[0].uri;
        if (!rootUri) {
            // This case is unlikely if the above check passes, but good for safety.
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const rootPath = rootUri.fsPath;
        const files = await vscode.workspace.findFiles("**/*");
        const fileTree = this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private createFileTree(rootPath: string, files: vscode.Uri[]): FileNode {
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: []
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
                    childNode = { name: part, absolutePath: newPath };
                    if (i < parts.length - 1) {
                        childNode.children = [];
                    }
                    currentNode.children?.push(childNode);
                }
                currentNode = childNode;
            }
        }
        return rootNode;
    }
}