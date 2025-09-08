// Updated on: C189 (Add .git and venv to non-selectable patterns)
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";
import { Services } from "@/backend/services/services";
import { serverIPCs } from "@/client/views";
import { VIEW_TYPES } from "@/common/view-types";
import { API as GitAPI, Status, Repository } from "../types/git";
import { ProblemCountsMap, GitStatusMap } from "@/common/ipc/channels.type";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);
const EXCEL_EXTENSIONS = new Set(['.xlsx', '.xls', '.csv']);
const WORD_EXTENSIONS = new Set(['.docx', '.doc']);
const EXCLUSION_PATTERNS = ['.git', 'dce_cache', 'out', '.vscode', 'dist']; 
const NON_SELECTABLE_PATTERNS = ['/node_modules/', '/.vscode/', '/.git/', '/venv/', '/flattened_repo.md', '/prompt.md', '/package-lock.json'];

const normalizePath = (p: string) => p.replace(/\\/g, '/');

export class FileTreeService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;
    private refreshDebounceTimer: NodeJS.Timeout | null = null;
    private decorationsDebounceTimer: NodeJS.Timeout | null = null;
    private gitApi?: GitAPI;
    private autoAddQueue: string[] = [];
    private isProcessingAutoAdd = false;
    private historyFilePath: string | undefined;

    constructor(gitApi?: GitAPI) {
        this.gitApi = gitApi;
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.historyFilePath = normalizePath(path.join(workspaceFolders[0].uri.fsPath, '.vscode', 'dce_history.json'));
        }

        if (this.gitApi) {
            this.gitApi.onDidOpenRepository(() => this.triggerFullRefresh('git repo opened'));
            this.gitApi.repositories.forEach(repo => {
                repo.state.onDidChange(() => {
                    Services.loggerService.warn(`[FTV-FLASH-DEBUG] Git repo state onDidChange event fired.`);
                    this.triggerDecorationsUpdate(); // Use lightweight update
                });
            });
        }
    }

    private triggerFullRefresh(reason: string) {
        Services.loggerService.log(`[triggerFullRefresh] Called because: ${reason}`);
        if (this.refreshDebounceTimer) clearTimeout(this.refreshDebounceTimer);
        this.refreshDebounceTimer = setTimeout(() => {
            this.fileTreeCache = null;
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'fileOp' });
            }
        }, 1500);
    }

    private triggerDecorationsUpdate() {
        if (this.decorationsDebounceTimer) clearTimeout(this.decorationsDebounceTimer);
        this.decorationsDebounceTimer = setTimeout(() => {
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.UpdateDecorations, { 
                    problemMap: this.getProblemCountsMap(),
                    gitStatusMap: this.getGitStatusMap()
                });
            }
        }, 750);
    }

    public initializeWatcher() {
        if (this.watcher) this.watcher.dispose();
        
        this.watcher = vscode.workspace.createFileSystemWatcher('**/*');
        const onFileChange = (uri: vscode.Uri, source: string) => {
            const normalizedPath = normalizePath(uri.fsPath);
            if (this.historyFilePath && normalizedPath === this.historyFilePath) {
                return;
            }
            for (const pattern of EXCLUSION_PATTERNS) {
                if (normalizedPath.includes(`/${pattern}/`)) {
                    return;
                }
            }
            this.triggerFullRefresh(`file change: ${path.basename(normalizedPath)}`);
        };

        this.watcher.onDidCreate(async (uri: vscode.Uri) => {
            const normalizedPath = normalizePath(uri.fsPath);
            if (this.historyFilePath && normalizedPath === this.historyFilePath) return;
            
            const isNonSelectable = !this._isSelectable(uri.fsPath, vscode.FileType.File);
            if (isNonSelectable) {
                onFileChange(uri, 'onDidCreate');
                return;
            }
            if (Services.fileOperationService.hasFileToIgnoreForAutoAdd(normalizedPath)) {
                Services.fileOperationService.removeFileToIgnoreForAutoAdd(normalizedPath);
            } else if (Services.selectionService.getAutoAddState()) {
                this.autoAddQueue.push(normalizedPath);
                this.processAutoAddQueue();
            }
            onFileChange(uri, 'onDidCreate');
        });
        this.watcher.onDidChange((uri) => onFileChange(uri, 'onDidChange'));
        this.watcher.onDidDelete((uri) => onFileChange(uri, 'onDidDelete'));
        vscode.languages.onDidChangeDiagnostics(() => this.triggerDecorationsUpdate());
    }

    private async processAutoAddQueue() {
        if (this.isProcessingAutoAdd || this.autoAddQueue.length === 0) return;
        this.isProcessingAutoAdd = true;
        const pathsToAdd = [...this.autoAddQueue];
        this.autoAddQueue = [];
        const currentSelection = await Services.selectionService.getLastSelection();
        const newSelection = [...new Set([...currentSelection, ...pathsToAdd])];
        await Services.selectionService.saveCurrentSelection(newSelection);
        this.isProcessingAutoAdd = false;
        if (this.autoAddQueue.length > 0) this.processAutoAddQueue();
    }

    private async getFileStats(filePath: string): Promise<Omit<FileNode, 'name' | 'absolutePath' | 'children'>> {
        const extension = path.extname(filePath).toLowerCase();
        try {
            const stats = await fs.stat(filePath);
            const isImage = IMAGE_EXTENSIONS.has(extension);
            const isPdf = extension === '.pdf';
            const isExcel = EXCEL_EXTENSIONS.has(extension);
            const isWordDoc = WORD_EXTENSIONS.has(extension);
            const baseStats = { sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1 };
            if (isImage) return { ...baseStats, tokenCount: 0, isSelectable: true };
            if (isPdf) return { ...baseStats, tokenCount: Services.contentExtractionService.getVirtualPdfContent(filePath)?.tokenCount || 0, isSelectable: true };
            if (isExcel) return { ...baseStats, tokenCount: Services.contentExtractionService.getVirtualExcelContent(filePath)?.tokenCount || 0, isSelectable: true };
            if (isWordDoc) return { ...baseStats, tokenCount: Services.contentExtractionService.getVirtualWordContent(filePath)?.tokenCount || 0, isSelectable: true };
            if (stats.size > 5_000_000) return { ...baseStats, tokenCount: 0, isSelectable: true };
            const content = await fs.readFile(filePath, 'utf-8');
            return { ...baseStats, tokenCount: Math.ceil(content.length / 4), isSelectable: true };
        } catch (error: any) {
            return { tokenCount: 0, sizeInBytes: 0, isImage: false, extension, isPdf: false, isExcel: false, isWordDoc: false, fileCount: 1, error: error.message, isSelectable: true };
        }
    }

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager, forceRefresh: boolean = false) {
        if (!forceRefresh && this.fileTreeCache) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
            this.triggerDecorationsUpdate(); // Also send latest decorations
            return;
        }
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const fileTree = await this.buildTreeFromTraversal(workspaceFolders[0].uri);
        this.fileTreeCache = [fileTree];
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
        this.triggerDecorationsUpdate(); // Also send latest decorations
    }

    private getGitStatusMap(): GitStatusMap {
        if (!this.gitApi?.repositories || this.gitApi.repositories.length === 0) return {};
        const repo: Repository = this.gitApi.repositories[0];
        const getStatusChar = (s: Status) => ({ [Status.INDEX_ADDED]: 'A', [Status.MODIFIED]: 'M', [Status.DELETED]: 'D', [Status.UNTRACKED]: 'U', [Status.IGNORED]: 'I', [Status.CONFLICT]: 'C' }[s] || '');
        const changes = [...repo.state.workingTreeChanges, ...repo.state.indexChanges, ...repo.state.mergeChanges];
        const statusMap: GitStatusMap = {};
        changes.forEach(change => {
            const statusChar = getStatusChar(change.status);
            if (statusChar) statusMap[normalizePath(change.uri.fsPath)] = statusChar;
        });
        return statusMap;
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
        const rootPath = rootUri.fsPath;
        const rootNode: FileNode = { name: path.basename(rootPath), absolutePath: normalizePath(rootPath), children: await this._traverseDirectory(rootUri), tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false, isSelectable: true, };
        this._aggregateStats(rootNode);
        return rootNode;
    }
    
    private _isSelectable(filePath: string, fileType: vscode.FileType): boolean {
        const normalizedPathWithSlash = normalizePath(filePath) + (fileType === vscode.FileType.Directory ? '/' : '');
        return !NON_SELECTABLE_PATTERNS.some(p => normalizedPathWithSlash.includes(p));
    }

    private async _traverseDirectory(dirUri: vscode.Uri): Promise<FileNode[]> {
        const children: FileNode[] = [];
        try {
            const entries = await vscode.workspace.fs.readDirectory(dirUri);
            for (const [name, type] of entries) {
                if (EXCLUSION_PATTERNS.some(p => name === p)) continue;
                const childUri = vscode.Uri.joinPath(dirUri, name);
                const childPath = normalizePath(childUri.fsPath);
                const isSelectable = this._isSelectable(childPath, type);
                if (type === vscode.FileType.Directory) {
                    const isSpecialDir = ['node_modules', '.git', 'venv'].includes(name.toLowerCase());
                    const dirNode: FileNode = { name, absolutePath: childPath, children: isSpecialDir ? [] : await this._traverseDirectory(childUri), tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false, isSelectable };
                    this._aggregateStats(dirNode);
                    children.push(dirNode);
                } else if (type === vscode.FileType.File) {
                    const stats = await this.getFileStats(childPath);
                    children.push({ name, absolutePath: childPath, ...stats, isSelectable });
                }
            }
        } catch (error: any) {
            Services.loggerService.error(`Error traversing directory ${dirUri.fsPath}: ${error.message}`);
        }
        return children.sort((a, b) => (!!a.children === !!b.children) ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) : (!!a.children ? -1 : 1));
    }

    private _aggregateStats(node: FileNode): void {
        if (!node.children) return;
        if (['node_modules', '.git', 'venv'].includes(node.name.toLowerCase())) {
            node.tokenCount = 0;
            node.fileCount = 0;
            node.sizeInBytes = 0;
            return; 
        }
        let totalTokens = 0, totalFiles = 0, totalBytes = 0;
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