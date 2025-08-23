import "reflect-metadata";
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

class ServiceContainer {
    public fileTreeService!: FileTreeService;
    public fileOperationService = new FileOperationService();
    public contentExtractionService = new ContentExtractionService();
    public highlightingService = new HighlightingService();
    
    public flattenerService = new FlattenerService();
    public selectionService = new SelectionService();
    public loggerService = LoggerService.getInstance();
    public actionService = new ActionService();
    public historyService = new HistoryService();
    public promptService = new PromptService();
    
    public initialize(gitApi?: GitAPI) {
        this.loggerService.log("Services initializing...");
        this.fileTreeService = new FileTreeService(gitApi);
        this.fileTreeService.initializeWatcher();
        this.loggerService.log("Services initialized successfully.");
    }
}

export const Services = new ServiceContainer();