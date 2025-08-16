import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";
import { SelectionService } from "./selection.service";
import { LoggerService } from "./logger.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    public selectionService = new SelectionService();
    public loggerService = LoggerService.getInstance();
    
    public initialize() {
        this.loggerService.log("Services initializing...");
        // C20: Correctly call the watcher initialization method.
        this.fsService.initializeWatcher();
        this.loggerService.log("Services initialized successfully.");
    }
}

export const Services = new ServiceContainer();