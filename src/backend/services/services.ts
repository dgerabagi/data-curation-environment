import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";
import { SelectionService } from "./selection.service";
import { LoggerService } from "./logger.service";
import { ActionService } from "./action.service";
import { API as GitAPI } from "../types/git";

// A simple container for services
class ServiceContainer {
    public fsService!: FSService;
    public flattenerService = new FlattenerService();
    public selectionService = new SelectionService();
    public loggerService = LoggerService.getInstance();
    public actionService = new ActionService();
    
    public initialize(gitApi?: GitAPI) {
        this.loggerService.log("Services initializing...");
        this.fsService = new FSService(gitApi);
        this.fsService.initializeWatcher();
        this.loggerService.log("Services initialized successfully.");
    }
}

export const Services = new ServiceContainer();