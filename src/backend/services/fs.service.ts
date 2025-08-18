import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";
import { Services } from "./services";
import { serverIPCs } from "@/client/views";
import { VIEW_TYPES } from "@/common/view-types";
import { API as GitAPI, Status } from "../types/git";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);
const EXCLUSION_PATTERNS = ['node_modules', 'dist', 'out', '.git', 'flattened_repo.md'];

// Helper to normalize paths to use forward slashes, which is consistent in webviews
const normalizePath = (p: string) => p.replace(/\\/g, '/');

export class FSService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;
    private debounceTimer: NodeJS.Timeout | null = null;
    private gitApi?: GitAPI;

    constructor(gitApi?: GitAPI) {
        this.gitApi = gitApi;
        if (this.gitApi) {
            this.gitApi.onDidOpenRepository(() => this.triggerRefresh());
            this.gitApi.repositories.forEach(repo => {
                repo.state.onDidChange(() => this.triggerRefresh());
            });
        }
    }

    private triggerRefresh() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            Services.loggerService.log(`Git state change detected. Invalidating cache and triggering refresh.`);
            this.fileTreeCache = null;
            
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, {});
            }
        }, 1000); // Debounce for 1s
    }

    public initializeWatcher() {
        if (this.watcher) {
            this.watcher.dispose();
        }
        
        this.watcher = vscode.workspace.createFileSystemWatcher('**/*');
        Services.loggerService.log("File system watcher initialized.");

        const onFileChange = (uri: vscode.Uri) => {
            const normalizedPath = normalizePath(uri.fsPath);
            if (EXCLUSION_PATTERNS.some(pattern => normalizedPath.includes(`/${pattern}/`))) {
                return;
            }
            this.triggerRefresh();
        };

        const onFileCreate = async (uri: vscode.Uri) => {
            const autoAddEnabled = Services.selectionService.getAutoAddState();
            if (autoAddEnabled) {
                Services.loggerService.log(`Auto-add enabled. Adding new file to selection: ${uri.fsPath}`);
                const currentSelection = Services.selectionService.getLastSelection();
                const newSelection = [...new Set([...currentSelection, normalizePath(uri.fsPath)])];
                await Services.selectionService.saveCurrentSelection(newSelection);
            }
            onFileChange(uri);
        };

        this.watcher.onDidChange(onFileChange);
        this.watcher.onDidCreate(onFileCreate);
        this.watcher.onDidDelete(onFileChange);

        // Watch for changes in diagnostics
        vscode.languages.onDidChangeDiagnostics(() => this.triggerRefresh());
    }

    private async getFileStats(filePath: string): Promise<{ tokenCount: number, sizeInBytes: number, isImage: boolean, extension: string }> {
        const extension = path.extname(filePath).toLowerCase();
        try {
            const stats = await fs.stat(filePath);
            const isImage = IMAGE_EXTENSIONS.has(extension);
            
            if (isImage) {
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: true, extension };
            }

            if (stats.size > 5_000_000) {
                Services.loggerService.warn(`Skipping token count for large file: ${filePath} (${stats.size} bytes)`);
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: false, extension };
            }
            
            const content = await fs.readFile(filePath, 'utf-8');
            const tokenCount = Math.ceil(content.length / 4);
            return { tokenCount, sizeInBytes: stats.size, isImage: false, extension };

        } catch (error: any) {
            Services.loggerService.warn(`Could not get stats for ${filePath}: ${error.message}`);
            return { tokenCount: 0, sizeInBytes: 0, isImage: false, extension };
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
        const fileTree = await this.buildTreeFromTraversal(rootUri);

        this.fileTreeCache = [fileTree];
        Services.loggerService.log("Sending file tree to client and caching result.");
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
    }

    private getGitStatusMap(): Map<string, string> {
        const statusMap = new Map<string, string>();
        if (!this.gitApi || this.gitApi.repositories.length === 0) {
            return statusMap;
        }
        
        const repo = this.gitApi.repositories[0];
        const getStatusChar = (status: Status): string => {
            switch (status) {
                case Status.INDEX_ADDED: return 'A';
                case Status.MODIFIED: return 'M';
                case Status.DELETED: return 'D';
                case Status.UNTRACKED: return 'U';
                case Status.IGNORED: return 'I';
                case Status.CONFLICT: return 'C';
                default: return '';
            }
        };

        repo.state.workingTreeChanges.forEach(change => statusMap.set(normalizePath(change.uri.fsPath), getStatusChar(change.status)));
        repo.state.indexChanges.forEach(change => statusMap.set(normalizePath(change.uri.fsPath), getStatusChar(change.status)));
        // Untracked files need to be handled separately as they are not in workingTreeChanges
        repo.state.untrackedChanges.forEach(uri => statusMap.set(normalizePath(uri.fsPath), 'U'));

        return statusMap;
    }

    private getProblemCountsMap(): Map<string, { error: number, warning: number }> {
        const problemMap = new Map<string, { error: number, warning: number }>();
        const diagnostics = vscode.languages.getDiagnostics();

        for (const [uri, diagnosticArr] of diagnostics) {
            const path = normalizePath(uri.fsPath);
            let counts = problemMap.get(path);
            if (!counts) {
                counts = { error: 0, warning: 0 };
                problemMap.set(path, counts);
            }
            for (const diag of diagnosticArr) {
                if (diag.severity === vscode.DiagnosticSeverity.Error) {
                    counts.error++;
                } else if (diag.severity === vscode.DiagnosticSeverity.Warning) {
                    counts.warning++;
                }
            }
        }
        return problemMap;
    }

    private async buildTreeFromTraversal(rootUri: vscode.Uri): Promise<FileNode> {
        const rootPath = rootUri.fsPath;
        const rootName = path.basename(rootPath);
        Services.loggerService.log(`Starting traversal from root: ${rootName}`);

        const gitStatusMap = this.getGitStatusMap();
        const problemCountsMap = this.getProblemCountsMap();

        const rootNode: FileNode = {
            name: rootName,
            absolutePath: normalizePath(rootPath),
            children: [],
            tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '',
            gitStatus: gitStatusMap.get(normalizePath(rootPath)),
            problemCounts: problemCountsMap.get(normalizePath(rootPath))
        };

        rootNode.children = await this._traverseDirectory(rootUri, gitStatusMap, problemCountsMap);
        this._aggregateStats(rootNode);

        return rootNode;
    }
    
    private async _traverseDirectory(dirUri: vscode.Uri, gitStatusMap: Map<string, string>, problemCountsMap: Map<string, { error: number, warning: number }>): Promise<FileNode[]> {
        const children: FileNode[] = [];
        try {
            const entries = await vscode.workspace.fs.readDirectory(dirUri);
            for (const [name, type] of entries) {
                if (EXCLUSION_PATTERNS.includes(name)) {
                    continue;
                }

                const childUri = vscode.Uri.joinPath(dirUri, name);
                const childPath = normalizePath(childUri.fsPath);

                if (type === vscode.FileType.Directory) {
                    const dirNode: FileNode = {
                        name,
                        absolutePath: childPath,
                        children: await this._traverseDirectory(childUri, gitStatusMap, problemCountsMap),
                        tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '',
                        gitStatus: gitStatusMap.get(childPath),
                        problemCounts: problemCountsMap.get(childPath)
                    };
                    this._aggregateStats(dirNode);
                    children.push(dirNode);
                } else if (type === vscode.FileType.File) {
                    const stats = await this.getFileStats(childPath);
                    const fileNode: FileNode = {
                        name,
                        absolutePath: childPath,
                        ...stats,
                        fileCount: 1,
                        gitStatus: gitStatusMap.get(childPath),
                        problemCounts: problemCountsMap.get(childPath)
                    };
                    children.push(fileNode);
                }
            }
        } catch (error: any) {
            Services.loggerService.error(`Error traversing directory ${dirUri.fsPath}: ${error.message}`);
        }

        children.sort((a, b) => {
            const aIsFolder = !!a.children;
            const bIsFolder = !!b.children;
            if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });

        return children;
    }

    private _aggregateStats(node: FileNode): void {
        if (!node.children) {
            node.fileCount = 1;
            return;
        }
        
        let totalTokens = 0;
        let totalFiles = 0;
        let totalBytes = 0;
        let totalErrors = node.problemCounts?.error || 0;
        let totalWarnings = node.problemCounts?.warning || 0;

        for (const child of node.children) {
            totalTokens += child.tokenCount;
            totalFiles += child.fileCount;
            totalBytes += child.sizeInBytes;
            if(child.problemCounts) {
                totalErrors += child.problemCounts.error;
                totalWarnings += child.problemCounts.warning;
            }
        }
        node.tokenCount = totalTokens;
        node.fileCount = totalFiles;
        node.sizeInBytes = totalBytes;
        if(totalErrors > 0 || totalWarnings > 0) {
            node.problemCounts = { error: totalErrors, warning: totalWarnings };
        }
    }

    // --- File Operations ---

    public async handleOpenFileRequest(filePath: string) {
        try {
            const uri = vscode.Uri.file(filePath);
            const doc = await vscode.workspace.openTextDocument(uri);
            await vscode.window.showTextDocument(doc);
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to open file: ${error.message}`);
            Services.loggerService.error(`Failed to open file ${filePath}: ${error.message}`);
        }
    }

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
        Services.loggerService.log(`Executing 'revealInExplorer' for path: ${filePath}`);
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