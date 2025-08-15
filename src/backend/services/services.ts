import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";
import { SelectionService } from "./selection.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    public selectionService = new SelectionService();
    
    public initialize() {
        // This can be used for service initialization logic in the future
    }
}

export const Services = new ServiceContainer();