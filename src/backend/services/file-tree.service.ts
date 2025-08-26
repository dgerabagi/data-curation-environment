// Updated on: C152 (Make node_modules visible but not counted)
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
import { ProblemCountsMap } from "@/common/ipc/channels.type";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);
const EXCEL_EXTENSIONS = new Set(['.xlsx', '.xls', '.csv']);
const WORD_EXTENSIONS = new Set(['.docx', '.doc']);
const EXCLUSION_PATTERNS = ['.git', 'dce_cache', '.vscode']; // C152: Removed node_modules and dist

const normalizePath = (p: string) => p.replace(/\\/g, '/');

export class FileTreeService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;
    private refreshDebounceTimer: NodeJS.Timeout | null = null;
    private diagnosticsDebounceTimer: NodeJS.Timeout | null = null;
    private gitApi?: GitAPI;

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
            if (Services.fileOperationService.hasFileToIgnoreForAutoAdd(normalizedPath)) {
                Services.fileOperationService.removeFileToIgnoreForAutoAdd(normalizedPath);
            } else if (Services.selectionService.getAutoAddState()) {
                const currentSelection = await Services.selectionService.getLastSelection();
                await Services.selectionService.saveCurrentSelection([...new Set([...currentSelection, normalizedPath])]);
            }
            onFileChange(uri);
        });
        this.watcher.onDidChange(onFileChange);
        this.watcher.onDidDelete(onFileChange);
        vscode.languages.onDidChangeDiagnostics(() => this.triggerDiagnosticsUpdate());
    }

    private async getFileStats(filePath: string): Promise<Omit<FileNode, 'name' | 'absolutePath' | 'children'>> {
        const extension = path.extname(filePath).toLowerCase();
        try {
            const stats = await fs.stat(filePath);
            const isImage = IMAGE_EXTENSIONS.has(extension);
            const isPdf = extension === '.pdf';
            const isExcel = EXCEL_EXTENSIONS.has(extension);
            const isWordDoc = WORD_EXTENSIONS.has(extension);
            
            if (isImage) return { tokenCount: 0, sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1 };
            if (isPdf) return { tokenCount: Services.contentExtractionService.getVirtualPdfContent(filePath)?.tokenCount || 0, sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1 };
            if (isExcel) return { tokenCount: Services.contentExtractionService.getVirtualExcelContent(filePath)?.tokenCount || 0, sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1 };
            if (isWordDoc) return { tokenCount: Services.contentExtractionService.getVirtualWordContent(filePath)?.tokenCount || 0, sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1 };

            if (stats.size > 5_000_000) return { tokenCount: 0, sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1 };
            
            const content = await fs.readFile(filePath, 'utf-8');
            return { tokenCount: Math.ceil(content.length / 4), sizeInBytes: stats.size, isImage, extension, isPdf, isExcel, isWordDoc, fileCount: 1 };
        } catch (error: any) {
            return { tokenCount: 0, sizeInBytes: 0, isImage: false, extension, isPdf: false, isExcel: false, isWordDoc: false, fileCount: 1, error: error.message };
        }
    }

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager, forceRefresh: boolean = false) {
        if (!forceRefresh && this.fileTreeCache) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders?.[0]) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        const fileTree = await this.buildTreeFromTraversal(workspaceFolders[0].uri);
        this.fileTreeCache = [fileTree];
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
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
        const rootPath = rootUri.fsPath;
        const gitStatusMap = this.getGitStatusMap();
        const problemCountsMap = this.getProblemCountsMap();

        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: normalizePath(rootPath),
            children: await this._traverseDirectory(rootUri, gitStatusMap, problemCountsMap),
            tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false,
            gitStatus: gitStatusMap.get(normalizePath(rootPath)),
            problemCounts: problemCountsMap[normalizePath(rootPath)]
        };
        this._aggregateStats(rootNode);
        return rootNode;
    }
    
    private async _traverseDirectory(dirUri: vscode.Uri, gitStatusMap: Map<string, string>, problemCountsMap: ProblemCountsMap): Promise<FileNode[]> {
        const children: FileNode[] = [];
        try {
            for (const [name, type] of await vscode.workspace.fs.readDirectory(dirUri)) {
                if (EXCLUSION_PATTERNS.includes(name)) continue;

                const childUri = vscode.Uri.joinPath(dirUri, name);
                const childPath = normalizePath(childUri.fsPath);

                if (type === vscode.FileType.Directory) {
                    const dirNode: FileNode = { name, absolutePath: childPath, children: await this._traverseDirectory(childUri, gitStatusMap, problemCountsMap), tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false, gitStatus: gitStatusMap.get(childPath), problemCounts: problemCountsMap[childPath] };
                    this._aggregateStats(dirNode);
                    children.push(dirNode);
                } else if (type === vscode.FileType.File) {
                    const stats = await this.getFileStats(childPath);
                    children.push({ name, absolutePath: childPath, ...stats, gitStatus: gitStatusMap.get(childPath), problemCounts: problemCountsMap[childPath] });
                }
            }
        } catch (error: any) {
            Services.loggerService.error(`Error traversing directory ${dirUri.fsPath}: ${error.message}`);
        }
        return children.sort((a, b) => (!!a.children === !!b.children) ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) : (!!a.children ? -1 : 1));
    }

    private _aggregateStats(node: FileNode): void {
        if (!node.children) return;
        
        // C152: Special handling for node_modules
        if (node.name.toLowerCase() === 'node_modules') {
            node.tokenCount = 0;
            node.fileCount = 0;
            node.sizeInBytes = 0;
            return; // Do not aggregate stats for node_modules content
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