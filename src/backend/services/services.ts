import "reflect-metadata";
import * as vscode from 'vscode';
import { FlattenerService } from "./flattener.service";
import { SelectionService } from "./selection.service";
import { LoggerService } from "./logger.service";
import { ActionService } from "./action.service";
import { HistoryService } from "./history.service";
import { PromptService } from "./prompt.service";
import { API as GitAPI } from "../types/git";
import { FileTreeService } from "./file-tree.service";
import { FileOperationService } from "./file-operation.service";
import { ContentExtractionService } from "./content-extraction.service";
import { HighlightingService } from "./highlighting.service";
import { GitService } from "./git.service";
import { ResponseContentProvider } from "../providers/ResponseContentProvider";

class ServiceContainer {
    public fileTreeService!: FileTreeService;
    public fileOperationService = new FileOperationService();
    public contentExtractionService = new ContentExtractionService();
    public highlightingService = new HighlightingService();
    
    public flattenerService = new FlattenerService();
    public selectionService = new SelectionService();
    public loggerService = LoggerService.getInstance();
    public actionService = new ActionService();
    public historyService!: HistoryService;
    public promptService!: PromptService;
    public gitService = new GitService();
    public context!: vscode.ExtensionContext;
    public responseContentProvider = new ResponseContentProvider();
    
    public initialize(context: vscode.ExtensionContext, gitApi?: GitAPI) {
        this.context = context;
        this.loggerService.log("Services initializing...");
        this.promptService = new PromptService(context.extensionUri);
        this.historyService = new HistoryService();
        this.fileTreeService = new FileTreeService(gitApi);
        this.fileTreeService.initializeWatcher();
        this.loggerService.log("Services initialized successfully.");
    }
}

export const Services = new ServiceContainer();