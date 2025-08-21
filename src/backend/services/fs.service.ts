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
import { Action, MoveActionPayload } from "./action.service";
// @ts-ignore - This is a workaround for a bug in pdf-parse that causes an ENOENT error in VS Code extensions.
import pdf from 'pdf-parse/lib/pdf-parse.js';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import { createStarryNight, common } from '@wooorm/starry-night';
import { toHtml } from 'hast-util-to-html';


const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);
const EXCEL_EXTENSIONS = new Set(['.xlsx', '.xls', '.csv']);
const WORD_EXTENSIONS = new Set(['.docx', '.doc']);
const EXCLUSION_PATTERNS = ['node_modules', 'dist', 'out', '.git', 'dce_cache'];

// Helper to normalize paths to use forward slashes, which is consistent in webviews
const normalizePath = (p: string) => p.replace(/\\/g, '/');

export class FSService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;
    private refreshDebounceTimer: NodeJS.Timeout | null = null;
    private diagnosticsDebounceTimer: NodeJS.Timeout | null = null;
    private gitApi?: GitAPI;
    private filesToIgnoreForAutoAdd: Set<string> = new Set();
    private pdfTextCache = new Map<string, { text: string; tokenCount: number }>();
    private excelMarkdownCache = new Map<string, { markdown: string; tokenCount: number }>();
    private wordTextCache = new Map<string, { text: string; tokenCount: number }>();
    private starryNight: any = null;

    constructor(gitApi?: GitAPI) {
        this.gitApi = gitApi;
        if (this.gitApi) {
            Services.loggerService.log(`FSService constructed with Git API. Found ${this.gitApi.repositories.length} repositories.`);
            this.gitApi.onDidOpenRepository(() => this.triggerFullRefresh());
            this.gitApi.repositories.forEach(repo => {
                repo.state.onDidChange(() => {
                    Services.loggerService.log(`Repo state changed for ${path.basename(repo.rootUri.fsPath)}`);
                    this.triggerFullRefresh();
                });
            });
        }
        this.initializeStarryNight();
    }

    private async initializeStarryNight() {
        try {
            this.starryNight = await createStarryNight(common);
            Services.loggerService.log('Starry Night syntax highlighter initialized.');
        } catch (error) {
            Services.loggerService.error(`Failed to initialize Starry Night: ${error}`);
        }
    }

    public async handleSyntaxHighlightRequest(code: string, lang: string, id: string, serverIpc: ServerPostMessageManager) {
        if (!this.starryNight) {
            Services.loggerService.error('Starry Night not initialized, cannot highlight.');
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml: `<pre><code>${code}</code></pre>`, id });
            return;
        }

        const scope = this.starryNight.flagToScope(lang);
        if (!scope) {
            Services.loggerService.warn(`No Starry Night scope found for language: ${lang}`);
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml: `<pre><code>${code}</code></pre>`, id });
            return;
        }

        try {
            const tree = this.starryNight.highlight(code, scope);
            const highlightedHtml = toHtml(tree);
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml, id });
        } catch (error) {
            Services.loggerService.error(`Starry Night highlighting failed for lang ${lang}: ${error}`);
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml: `<pre><code>${code}</code></pre>`, id });
        }
    }

    private triggerFullRefresh() {
        if (this.refreshDebounceTimer) {
            clearTimeout(this.refreshDebounceTimer);
        }
        this.refreshDebounceTimer = setTimeout(() => {
            Services.loggerService.log(`Git state change or file event detected. Invalidating cache and triggering full refresh.`);
            this.fileTreeCache = null;
            
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'fileOp' });
            }
        }, 500); // Debounce for 500ms
    }

    private triggerDiagnosticsUpdate() {
        if (this.diagnosticsDebounceTimer) {
            clearTimeout(this.diagnosticsDebounceTimer);
        }
        this.diagnosticsDebounceTimer = setTimeout(() => {
            Services.loggerService.log("Diagnostics changed, triggering lightweight update.");
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                const problemMap = this.getProblemCountsMap();
                serverIpc.sendToClient(ServerToClientChannel.UpdateProblemCounts, { problemMap });
            }
        }, 750);
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
            this.triggerFullRefresh();
        };

        const onFileCreate = async (uri: vscode.Uri) => {
            const normalizedPath = normalizePath(uri.fsPath);
            const autoAddEnabled = Services.selectionService.getAutoAddState();

            // Bug Fix: Check if this file was part of a recent move and should be ignored
            if (this.filesToIgnoreForAutoAdd.has(normalizedPath)) {
                this.filesToIgnoreForAutoAdd.delete(normalizedPath);
                Services.loggerService.log(`Ignoring auto-add for recently moved file: ${normalizedPath}`);
            } else if (autoAddEnabled) {
                Services.loggerService.log(`Auto-add enabled. Adding new file to selection: ${uri.fsPath}`);
                const currentSelection = await Services.selectionService.getLastSelection();
                const newSelection = [...new Set([...currentSelection, normalizedPath])];
                await Services.selectionService.saveCurrentSelection(newSelection);
            }
            onFileChange(uri);
        };

        this.watcher.onDidChange(onFileChange);
        this.watcher.onDidCreate(onFileCreate);
        this.watcher.onDidDelete(onFileChange);

        vscode.languages.onDidChangeDiagnostics(() => {
            this.triggerDiagnosticsUpdate();
        });
    }

    private async getFileStats(filePath: string): Promise<{ tokenCount: number, sizeInBytes: number, isImage: boolean, extension: string, isPdf: boolean, isExcel: boolean, isWordDoc: boolean }> {
        const extension = path.extname(filePath).toLowerCase();
        try {
            const stats = await fs.stat(filePath);
            const isImage = IMAGE_EXTENSIONS.has(extension);
            const isPdf = extension === '.pdf';
            const isExcel = EXCEL_EXTENSIONS.has(extension);
            const isWordDoc = WORD_EXTENSIONS.has(extension);
            
            if (isImage) {
                return { tokenCount: 0, sizeInBytes: stats.size, isImage, extension, isPdf: false, isExcel: false, isWordDoc: false };
            }

            if (isPdf) {
                 const cached = this.pdfTextCache.get(filePath);
                 return { tokenCount: cached?.tokenCount || 0, sizeInBytes: stats.size, isImage: false, extension, isPdf: true, isExcel: false, isWordDoc: false };
            }
            
            if (isExcel) {
                const cached = this.excelMarkdownCache.get(filePath);
                return { tokenCount: cached?.tokenCount || 0, sizeInBytes: stats.size, isImage: false, extension, isPdf: false, isExcel: true, isWordDoc: false };
            }

            if (isWordDoc) {
                const cached = this.wordTextCache.get(filePath);
                return { tokenCount: cached?.tokenCount || 0, sizeInBytes: stats.size, isImage: false, extension, isPdf: false, isExcel: false, isWordDoc: true };
            }

            if (stats.size > 5_000_000) {
                Services.loggerService.warn(`Skipping token count for large file: ${filePath} (${stats.size} bytes)`);
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: false, extension, isPdf: false, isExcel: false, isWordDoc: false };
            }
            
            const content = await fs.readFile(filePath, 'utf-8');
            const tokenCount = Math.ceil(content.length / 4);
            return { tokenCount, sizeInBytes: stats.size, isImage: false, extension, isPdf: false, isExcel: false, isWordDoc: false };

        } catch (error: any) {
            Services.loggerService.warn(`Could not get stats for ${filePath}: ${error.message}`);
            return { tokenCount: 0, sizeInBytes: 0, isImage: false, extension, isPdf: false, isExcel: false, isWordDoc: false };
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
            Services.loggerService.warn("Git API not available or no repositories found.");
            return statusMap;
        }
        
        const repo = this.gitApi.repositories[0];
        Services.loggerService.log(`Querying Git repo: ${repo.rootUri.fsPath}`);

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
        
        const changes = [
            ...repo.state.workingTreeChanges, 
            ...repo.state.indexChanges, 
            ...repo.state.mergeChanges
        ];
        
        Services.loggerService.log(`Found ${changes.length} changes in working tree/index/merge.`);
        changes.forEach(change => {
            const normPath = normalizePath(change.uri.fsPath);
            const statusChar = getStatusChar(change.status);
            if (statusChar) {
                statusMap.set(normPath, statusChar);
            }
        });
        
        return statusMap;
    }

    private getProblemCountsMap(): ProblemCountsMap {
        const problemMap: ProblemCountsMap = {};
        const diagnostics = vscode.languages.getDiagnostics();

        for (const [uri, diagnosticArr] of diagnostics) {
            const path = normalizePath(uri.fsPath);
            let counts = problemMap[path];
            if (!counts) {
                counts = { error: 0, warning: 0 };
                problemMap[path] = counts;
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
        Services.loggerService.log(`Built Git status map with ${gitStatusMap.size} entries.`);
        const problemCountsMap = this.getProblemCountsMap();
        Services.loggerService.log(`Built problem counts map with ${Object.keys(problemCountsMap).length} entries.`);

        const rootNode: FileNode = {
            name: rootName,
            absolutePath: normalizePath(rootPath),
            children: [],
            tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false,
            gitStatus: gitStatusMap.get(normalizePath(rootPath)),
            problemCounts: problemCountsMap[normalizePath(rootPath)]
        };

        rootNode.children = await this._traverseDirectory(rootUri, gitStatusMap, problemCountsMap);
        this._aggregateStats(rootNode);

        return rootNode;
    }
    
    private async _traverseDirectory(dirUri: vscode.Uri, gitStatusMap: Map<string, string>, problemCountsMap: ProblemCountsMap): Promise<FileNode[]> {
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
                        tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false,
                        gitStatus: gitStatusMap.get(childPath),
                        problemCounts: problemCountsMap[childPath]
                    };
                    this._aggregateStats(dirNode);
                    children.push(dirNode);
                } else if (type === vscode.FileType.File) {
                    const stats = await this.getFileStats(childPath);
                    const gitStatus = gitStatusMap.get(childPath);
                    if (gitStatus) {
                        Services.loggerService.log(`[Git Status] Found status '${gitStatus}' for ${childPath}`);
                    }
                    const fileNode: FileNode = {
                        name,
                        absolutePath: childPath,
                        ...stats,
                        fileCount: 1,
                        gitStatus: gitStatus,
                        problemCounts: problemCountsMap[childPath]
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

    public getVirtualPdfContent(filePath: string) {
        return this.pdfTextCache.get(filePath);
    }

    public getVirtualExcelContent(filePath: string) {
        return this.excelMarkdownCache.get(filePath);
    }

    public getVirtualWordContent(filePath: string) {
        return this.wordTextCache.get(filePath);
    }

    // --- File Operations ---

    public async handleFileContentRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`[C88 Fix] Received request for content of: ${filePath}`);
        try {
            const uri = vscode.Uri.file(filePath);
            const contentBuffer = await vscode.workspace.fs.readFile(uri);
            const content = Buffer.from(contentBuffer).toString('utf-8');
            serverIpc.sendToClient(ServerToClientChannel.SendFileContent, { path: filePath, content });
        } catch (error) {
            Services.loggerService.error(`[C88 Fix] Failed to read file content for ${filePath}: ${error}`);
            serverIpc.sendToClient(ServerToClientChannel.SendFileContent, { path: filePath, content: null });
        }
    }

    public async handleFileExistenceRequest(paths: string[], serverIpc: ServerPostMessageManager) {
        const existenceMap: { [path: string]: boolean } = {};
        const checks = paths.map(async (p) => {
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(p));
                existenceMap[p] = true;
            } catch {
                existenceMap[p] = false;
            }
        });
        await Promise.all(checks);
        serverIpc.sendToClient(ServerToClientChannel.SendFileExistence, { existenceMap });
    }

    private async _findAvailableCopyName(destinationPath: string): Promise<string> {
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(destinationPath));
        } catch (error) {
            // If stat fails, the file doesn't exist, so the original name is available.
            return destinationPath;
        }
    
        const dir = path.dirname(destinationPath);
        const ext = path.extname(destinationPath);
        const baseName = path.basename(destinationPath, ext);
    
        // First try with "-copy"
        let copyNum = 1;
        let nextPath = path.join(dir, `${baseName}-copy${ext}`);
        
        while (true) {
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(nextPath));
                // File exists, increment and try again
                copyNum++;
                nextPath = path.join(dir, `${baseName}-copy-${copyNum}${ext}`);
            } catch (error) {
                // File does not exist, we found an available name
                return nextPath;
            }
        }
    }

    public async handleCopyFileRequest(sourcePath: string, destinationDir: string) {
        try {
            const sourceName = path.basename(sourcePath);
            const initialDestinationPath = path.join(destinationDir, sourceName);
            
            const finalDestinationPath = await this._findAvailableCopyName(initialDestinationPath);

            const sourceUri = vscode.Uri.file(sourcePath);
            const destinationUri = vscode.Uri.file(finalDestinationPath);

            Services.loggerService.log(`Copying from ${sourceUri.fsPath} to ${destinationUri.fsPath}`);
            await vscode.workspace.fs.copy(sourceUri, destinationUri, { overwrite: false });
            Services.loggerService.log(`Successfully copied file.`);
        } catch (error: any) {
            const errorMessage = `Failed to copy file: ${error.message}`;
            vscode.window.showErrorMessage(errorMessage);
            Services.loggerService.error(errorMessage);
        }
    }

    public async handleCopyFileFromUri(sourceUriString: string, targetDir: string) {
        try {
            const sourceUri = vscode.Uri.parse(sourceUriString);
            const fileName = path.basename(sourceUri.fsPath);
            const targetUri = vscode.Uri.file(path.join(targetDir, fileName));

            Services.loggerService.log(`Copying file from URI: ${sourceUri.toString()} to ${targetUri.toString()}`);
            await vscode.workspace.fs.copy(sourceUri, targetUri);
            Services.loggerService.log(`Successfully copied file from URI.`);
        } catch (error: any) {
            const errorMessage = `Failed to copy file from URI: ${error.message}`;
            vscode.window.showErrorMessage(errorMessage);
            Services.loggerService.error(errorMessage);
        }
    }

    public async handleAddFileFromBuffer(targetPath: string, data: Uint8Array) {
        try {
            const uri = vscode.Uri.file(targetPath);
            await vscode.workspace.fs.writeFile(uri, data);
            Services.loggerService.log(`Successfully added file from buffer to ${targetPath}`);
        } catch (error: any) {
            const errorMessage = `Failed to add file from buffer: ${error.message}`;
            vscode.window.showErrorMessage(errorMessage);
            Services.loggerService.error(errorMessage);
        }
    }

    public async handlePdfToTextRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`[C79 CACHE FIX] Received RequestPdfToText for: ${filePath}`);
        if (this.pdfTextCache.has(filePath)) {
            const cached = this.pdfTextCache.get(filePath)!;
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: cached.tokenCount });
            Services.loggerService.log(`[C79 CACHE FIX] PDF served from cache: ${filePath}`);
            return;
        }

        try {
            Services.loggerService.log(`[PDF] Processing: ${filePath}`);
            const buffer = await fs.readFile(filePath);
            Services.loggerService.log(`[PDF] File buffer read. Size: ${buffer.length}. Parsing with pdf-parse...`);
            const data = await pdf(buffer);
            const text = data.text;
            const tokenCount = Math.ceil(text.length / 4);
            
            this.pdfTextCache.set(filePath, { text, tokenCount });
            Services.loggerService.log(`[C79 CACHE FIX] PDF Parsed and cached: ${path.basename(filePath)} (${tokenCount} tokens)`);

            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: tokenCount });
        } catch (error: any) {
            const errorMessage = `Failed to parse PDF: ${path.basename(filePath)}`;
            Services.loggerService.error(`[PDF] Error processing ${filePath}: ${error.stack || error.message}`);
            console.error(error);
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: errorMessage });
        }
    }

    private _sheetToMarkdown(sheet: XLSX.WorkSheet): string {
        const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (data.length === 0) {
            return "";
        }
    
        // Sanitize all cell data to escape pipe characters
        const sanitizedData = data.map(row => 
            row.map(cell => {
                const cellStr = cell ? String(cell) : '';
                return cellStr.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br/>');
            })
        );
    
        const header = sanitizedData[0];
        const body = sanitizedData.slice(1);
    
        const headerLine = `| ${header.join(' | ')} |`;
        const separatorLine = `| ${header.map(() => '---').join(' | ')} |`;
    
        const bodyLines = body.map(row => `| ${row.join(' | ')} |`).join('\n');
    
        return `${headerLine}\n${separatorLine}\n${bodyLines}`;
    }

    public async handleExcelToTextRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`[C79 CACHE FIX] Received RequestExcelToText for: ${filePath}`);
        if (this.excelMarkdownCache.has(filePath)) {
            const cached = this.excelMarkdownCache.get(filePath)!;
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: cached.tokenCount });
            Services.loggerService.log(`[C79 CACHE FIX] Excel served from cache: ${filePath}`);
            return;
        }

        try {
            Services.loggerService.log(`[Excel] Processing: ${filePath}`);
            const buffer = await fs.readFile(filePath);
            Services.loggerService.log(`[Excel] File buffer read. Size: ${buffer.length}. Parsing with xlsx...`);
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            
            Services.loggerService.log(`[Excel] Workbook parsed. Found sheets: ${workbook.SheetNames.join(', ')}`);
            let markdown = '';

            workbook.SheetNames.forEach(sheetName => {
                markdown += `### Sheet: ${sheetName}\n\n`;
                const worksheet = workbook.Sheets[sheetName];
                markdown += this._sheetToMarkdown(worksheet);
                markdown += '\n\n';
            });
            Services.loggerService.log(`[Excel] Markdown conversion complete.`);

            const tokenCount = Math.ceil(markdown.length / 4);
            this.excelMarkdownCache.set(filePath, { markdown, tokenCount });
            Services.loggerService.log(`[C79 CACHE FIX] Excel Parsed and cached: ${path.basename(filePath)} (${tokenCount} tokens)`);

            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: tokenCount });

        } catch (error: any) {
             const errorMessage = `Failed to parse Excel/CSV file: ${path.basename(filePath)}`;
             Services.loggerService.error(`[Excel] Error processing ${filePath}: ${error.stack || error.message}`);
             console.error(error);
             serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: errorMessage });
        }
    }

    public async handleWordToTextRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`[C79 CACHE FIX] Received RequestWordToText for: ${filePath}`);
        if (this.wordTextCache.has(filePath)) {
            const cached = this.wordTextCache.get(filePath)!;
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: cached.tokenCount });
            Services.loggerService.log(`[C79 CACHE FIX] Word served from cache: ${filePath}`);
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        if (extension === '.doc') {
            const unsupportedMessage = "UNSUPPORTED_FORMAT";
            this.wordTextCache.set(filePath, { text: unsupportedMessage, tokenCount: 0 });
            Services.loggerService.warn(`[Word] Legacy .doc format is not supported for file: ${filePath}`);
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: "Legacy .doc format not supported." });
            return;
        }

        try {
            Services.loggerService.log(`[Word] Processing: ${filePath}`);
            const buffer = await fs.readFile(filePath);
            const result = await mammoth.extractRawText({ buffer });
            const text = result.value;
            const tokenCount = Math.ceil(text.length / 4);
            
            this.wordTextCache.set(filePath, { text, tokenCount });
            Services.loggerService.log(`[C79 CACHE FIX] Word Parsed and cached: ${path.basename(filePath)} (${tokenCount} tokens)`);

            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: tokenCount });
        } catch (error: any) {
            let errorMessage = `Failed to parse Word file: ${path.basename(filePath)}`;
            if (error instanceof Error && error.message.includes("Can't find end of central directory")) {
                errorMessage = "File may be corrupted or is not a valid .docx format.";
            }
            Services.loggerService.error(`[Word] Error processing ${filePath}: ${error.stack || error.message}`);
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: errorMessage });
        }
    }

    public async handleOpenFileRequest(filePath: string) {
        try {
            const uri = vscode.Uri.file(filePath);
            await vscode.commands.executeCommand('vscode.open', uri);
        } catch (error: any) {
            const errorMessage = `Failed to open file ${filePath}: ${error.message}`;
            vscode.window.showErrorMessage(errorMessage);
            Services.loggerService.error(errorMessage);
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

    public async handleMoveFileRequest(oldPath: string, newPath: string) {
        try {
            // Bug Fix: Prevent auto-add for moved files that weren't checked
            const lastSelection = await Services.selectionService.getLastSelection();
            const isChecked = lastSelection.some(p => p.startsWith(oldPath));
            if (!isChecked) {
                this.filesToIgnoreForAutoAdd.add(newPath);
                // Clean up the ignore set after a short delay to prevent memory leaks
                setTimeout(() => this.filesToIgnoreForAutoAdd.delete(newPath), 2000);
            }

            await vscode.workspace.fs.rename(vscode.Uri.file(oldPath), vscode.Uri.file(newPath));
            await Services.selectionService.updatePathInSelections(oldPath, newPath);

            // Push to undo stack
            const action: Action = { type: 'move', payload: { fromPath: oldPath, toPath: newPath } as MoveActionPayload };
            Services.actionService.push(action);

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to move file: ${error.message}`);
            Services.loggerService.error(`Failed to move file from ${oldPath} to ${newPath}: ${error.message}`);
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
                // Note: Undo for delete is not implemented due to API limitations
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to delete: ${error.message}`);
            }
        }
    }

    public async handleBatchFileDeleteRequest(paths: string[]) {
        if (paths.length === 0) return;
        const confirmation = await vscode.window.showWarningMessage(
            `Are you sure you want to delete ${paths.length} item(s)? This will move them to the trash.`,
            { modal: true },
            'Delete'
        );
        if (confirmation === 'Delete') {
            try {
                await Promise.all(paths.map(p => vscode.workspace.fs.delete(vscode.Uri.file(p), { recursive: true, useTrash: true })));
                Services.loggerService.log(`Successfully deleted ${paths.length} items.`);
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to delete items: ${error.message}`);
                Services.loggerService.error(`Failed to delete items: ${error.message}`);
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