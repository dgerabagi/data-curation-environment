// Updated on: C165 (Add package-lock.json to non-selectable patterns)
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";
import { Services } from "@/backend/services/services";
import { serverIPCs } from "@/client/views";
import { VIEW_TYPES } from "@/common/view-types";
import { API as GitAPI, Status } from "../types/git";
import { ProblemCountsMap } from "@/common/ipc/channels.type";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);
const EXCEL_EXTENSIONS = new Set(['.xlsx', '.xls', '.csv']);
const WORD_EXTENSIONS = new Set(['.docx', '.doc']);
const EXCLUSION_PATTERNS = ['.git', 'dce_cache', 'out']; 
const NON_SELECTABLE_PATTERNS = ['/node_modules', '/.vscode', 'flattened_repo.md', 'prompt.md', 'package-lock.json'];

const normalizePath = (p: string) => p.replace(/\\/g, '/');

export class FileTreeService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;
    private refreshDebounceTimer: NodeJS.Timeout | null = null;
    private diagnosticsDebounceTimer: NodeJS.Timeout | null = null;
    private gitApi?: GitAPI;
    private autoAddQueue: string[] = [];
    private isProcessingAutoAdd = false;

    constructor(gitApi?: GitAPI) {
        this.gitApi = gitApi;
        if (this.gitApi) {
            this.gitApi.onDidOpenRepository(() => this.triggerFullRefresh());
            this.gitApi.repositories.forEach(repo => {
                repo.state.onDidChange(() => this.triggerFullRefresh());
            });
        }
    }

    private triggerFullRefresh() {
        if (this.refreshDebounceTimer) clearTimeout(this.refreshDebounceTimer);
        this.refreshDebounceTimer = setTimeout(() => {
            this.fileTreeCache = null;
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'fileOp' });
            }
        }, 500);
    }

    private triggerDiagnosticsUpdate() {
        if (this.diagnosticsDebounceTimer) clearTimeout(this.diagnosticsDebounceTimer);
        this.diagnosticsDebounceTimer = setTimeout(() => {
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.UpdateProblemCounts, { problemMap: this.getProblemCountsMap() });
            }
        }, 750);
    }

    public initializeWatcher() {
        if (this.watcher) this.watcher.dispose();
        
        this.watcher = vscode.workspace.createFileSystemWatcher('**/*');
        const onFileChange = (uri: vscode.Uri) => {
            if (EXCLUSION_PATTERNS.some(pattern => normalizePath(uri.fsPath).includes(`/${pattern}/`))) return;
            this.triggerFullRefresh();
        };

        this.watcher.onDidCreate(async (uri: vscode.Uri) => {
            const normalizedPath = normalizePath(uri.fsPath);
            
            const isNonSelectable = NON_SELECTABLE_PATTERNS.some(pattern => normalizedPath.includes(pattern));

            if (isNonSelectable) {
                Services.loggerService.log(`[Auto-Add] Ignoring newly created non-selectable file: ${normalizedPath}`);
                onFileChange(uri);
                return;
            }

            if (Services.fileOperationService.hasFileToIgnoreForAutoAdd(normalizedPath)) {
                Services.fileOperationService.removeFileToIgnoreForAutoAdd(normalizedPath);
            } else if (Services.selectionService.getAutoAddState()) {
                this.autoAddQueue.push(normalizedPath);
                this.processAutoAddQueue();
            }
            onFileChange(uri);
        });
        this.watcher.onDidChange(onFileChange);
        this.watcher.onDidDelete(onFileChange);
        vscode.languages.onDidChangeDiagnostics(() => this.triggerDiagnosticsUpdate());
    }

    private async processAutoAddQueue() {
        if (this.isProcessingAutoAdd || this.autoAddQueue.length === 0) {
            return;
        }
        this.isProcessingAutoAdd = true;
    
        const pathsToAdd = [...this.autoAddQueue];
        this.autoAddQueue = [];
    
        const currentSelection = await Services.selectionService.getLastSelection();
        const newSelection = [...new Set([...currentSelection, ...pathsToAdd])];
        await Services.selectionService.saveCurrentSelection(newSelection);
        
        this.isProcessingAutoAdd = false;
    
        if (this.autoAddQueue.length > 0) {
            this.processAutoAddQueue();
        }
    }

    private async getFileStats(filePath: string): Promise<Omit<FileNode, 'name' | 'absolutePath' | 'children'>> {
        const normalizedFilePath = normalizePath(filePath);
        const isSelectable = !NON_SELECTABLE_PATTERNS.some(p => normalizedFilePath.includes(p));
        const extension = path.extname(filePath).toLowerCase();

        try {
            const stats = await fs.stat(filePath);
            const isImage = IMAGE_EXTENSIONS.has(extension);
            const isPdf = extension === '.pdf';
            const isExcel = EXCEL_EXTENSIONS.has(extension);
            const isWordDoc = WORD_EXTENSIONS.has(extension);
            
            const baseStats = { sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1, isSelectable };

            if (isImage) return { ...baseStats, tokenCount: 0 };
            if (isPdf) return { ...baseStats, tokenCount: Services.contentExtractionService.getVirtualPdfContent(filePath)?.tokenCount || 0 };
            if (isExcel) return { ...baseStats, tokenCount: Services.contentExtractionService.getVirtualExcelContent(filePath)?.tokenCount || 0 };
            if (isWordDoc) return { ...baseStats, tokenCount: Services.contentExtractionService.getVirtualWordContent(filePath)?.tokenCount || 0 };

            if (stats.size > 5_000_000) return { ...baseStats, tokenCount: 0 };
            
            const content = await fs.readFile(filePath, 'utf-8');
            return { ...baseStats, tokenCount: Math.ceil(content.length / 4) };
        } catch (error: any) {
            return { tokenCount: 0, sizeInBytes: 0, isImage: false, extension, isPdf: false, isExcel: false, isWordDoc: false, fileCount: 1, error: error.message, isSelectable };
        }
    }

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager, forceRefresh: boolean = false) {
        Services.loggerService.log(`handleWorkspaceFilesRequest started. forceRefresh=${forceRefresh}`);
        if (!forceRefresh && this.fileTreeCache) {
            Services.loggerService.log(`Serving file tree from cache.`);
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders?.[0]) {
            Services.loggerService.warn(`No workspace folder found.`);
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        Services.loggerService.log(`Building file tree from scratch.`);
        const fileTree = await this.buildTreeFromTraversal(workspaceFolders[0].uri);
        this.fileTreeCache = [fileTree];
        Services.loggerService.log(`File tree built. Sending to client.`);
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
        Services.loggerService.log(`handleWorkspaceFilesRequest finished.`);
    }

    private getGitStatusMap(): Map<string, string> {
        if (!this.gitApi?.repositories[0]) return new Map();
        
        const repo = this.gitApi.repositories[0];
        const getStatusChar = (s: Status) => ({ [Status.INDEX_ADDED]: 'A', [Status.MODIFIED]: 'M', [Status.DELETED]: 'D', [Status.UNTRACKED]: 'U', [Status.IGNORED]: 'I', [Status.CONFLICT]: 'C' }[s] || '');
        
        const changes = [...repo.state.workingTreeChanges, ...repo.state.indexChanges, ...repo.state.mergeChanges];
        
        return changes.reduce((acc, change) => {
            const statusChar = getStatusChar(change.status);
            if (statusChar) {
                acc.set(normalizePath(change.uri.fsPath), statusChar);
            }
            return acc;
        }, new Map<string, string>());
    }

    private getProblemCountsMap(): ProblemCountsMap {
        const problemMap: ProblemCountsMap = {};
        for (const [uri, diagnosticArr] of vscode.languages.getDiagnostics()) {
            const path = normalizePath(uri.fsPath);
            problemMap[path] = problemMap[path] || { error: 0, warning: 0 };
            for (const diag of diagnosticArr) {
                if (diag.severity === vscode.DiagnosticSeverity.Error) problemMap[path].error++;
                else if (diag.severity === vscode.DiagnosticSeverity.Warning) problemMap[path].warning++;
            }
        }
        return problemMap;
    }

    private async buildTreeFromTraversal(rootUri: vscode.Uri): Promise<FileNode> {
        Services.loggerService.log(`buildTreeFromTraversal starting for root: ${rootUri.fsPath}`);
        const rootPath = rootUri.fsPath;
        const gitStatusMap = this.getGitStatusMap();
        const problemCountsMap = this.getProblemCountsMap();

        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: normalizePath(rootPath),
            children: await this._traverseDirectory(rootUri, gitStatusMap, problemCountsMap),
            tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false,
            gitStatus: gitStatusMap.get(normalizePath(rootPath)),
            problemCounts: problemCountsMap[normalizePath(rootPath)],
            isSelectable: true,
        };
        this._aggregateStats(rootNode);
        Services.loggerService.log(`buildTreeFromTraversal finished. Root node has ${rootNode.children?.length} children.`);
        return rootNode;
    }
    
    private async _traverseDirectory(dirUri: vscode.Uri, gitStatusMap: Map<string, string>, problemCountsMap: ProblemCountsMap): Promise<FileNode[]> {
        const children: FileNode[] = [];
        try {
            const entries = await vscode.workspace.fs.readDirectory(dirUri);

            for (const [name, type] of entries) {
                if (name === '.git' || name === 'dce_cache' || name === 'out') continue;

                const childUri = vscode.Uri.joinPath(dirUri, name);
                const childPath = normalizePath(childUri.fsPath);
                const isSelectable = !NON_SELECTABLE_PATTERNS.some(p => childPath.includes(p));

                if (type === vscode.FileType.Directory) {
                    const isSpecialDir = name.toLowerCase() === 'node_modules';
                    const dirNode: FileNode = { name, absolutePath: childPath, children: isSpecialDir ? [] : await this._traverseDirectory(childUri, gitStatusMap, problemCountsMap), tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false, gitStatus: gitStatusMap.get(childPath), problemCounts: problemCountsMap[childPath], isSelectable };
                    this._aggregateStats(dirNode);
                    children.push(dirNode);
                } else if (type === vscode.FileType.File) {
                    const stats = await this.getFileStats(childPath);
                    children.push({ name, absolutePath: childPath, ...stats, gitStatus: gitStatusMap.get(childPath), problemCounts: problemCountsMap[childPath], isSelectable });
                }
            }
        } catch (error: any) {
            Services.loggerService.error(`Error traversing directory ${dirUri.fsPath}: ${error.message}`);
        }
        return children.sort((a, b) => (!!a.children === !!b.children) ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) : (!!a.children ? -1 : 1));
    }

    private _aggregateStats(node: FileNode): void {
        if (!node.children) return;
        
        if (node.name.toLowerCase() === 'node_modules' || node.name.toLowerCase() === '.vscode') {
            node.tokenCount = 0;
            node.fileCount = 0;
            node.sizeInBytes = 0;
            return; 
        }

        let totalTokens = 0, totalFiles = 0, totalBytes = 0, totalErrors = node.problemCounts?.error || 0, totalWarnings = node.problemCounts?.warning || 0;
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
        if(totalErrors > 0 || totalWarnings > 0) node.problemCounts = { error: totalErrors, warning: totalWarnings };
    }
}