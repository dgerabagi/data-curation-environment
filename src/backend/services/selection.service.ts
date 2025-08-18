import * as vscode from 'vscode';
import { getContext } from '@/extension';
import { Services } from './services';

const SELECTION_SETS_KEY = 'dce.selectionSets';
const LAST_SELECTION_KEY = 'dce.lastSelection';
const AUTO_ADD_STATE_KEY = 'dce.autoAddState';


export interface SelectionSet {
    [name: string]: string[];
}

export class SelectionService {
    
    private get context(): vscode.ExtensionContext {
        return getContext();
    }

    // --- Named Selection Sets ---

    public getSelectionSets(): SelectionSet {
        return this.context.workspaceState.get<SelectionSet>(SELECTION_SETS_KEY, {});
    }

    public async saveSelectionSet(name: string, paths: string[]): Promise<void> {
        if (!name) {
            vscode.window.showErrorMessage("Selection set name cannot be empty.");
            return;
        }
        const sets = this.getSelectionSets();
        sets[name] = paths;
        await this.context.workspaceState.update(SELECTION_SETS_KEY, sets);
        Services.loggerService.log(`Selection set '${name}' saved with ${paths.length} paths.`);
        vscode.window.showInformationMessage(`Selection set '${name}' saved.`);
    }

    public async deleteSelectionSet(name: string): Promise<void> {
        const sets = this.getSelectionSets();
        if (sets[name]) {
            delete sets[name];
            await this.context.workspaceState.update(SELECTION_SETS_KEY, sets);
            Services.loggerService.log(`Selection set '${name}' deleted.`);
            vscode.window.showInformationMessage(`Selection set '${name}' deleted.`);
        }
    }

    // --- Persistent Current Selection ---

    public getLastSelection(): string[] {
        return this.context.workspaceState.get<string[]>(LAST_SELECTION_KEY, []);
    }

    public async saveCurrentSelection(paths: string[]): Promise<void> {
        await this.context.workspaceState.update(LAST_SELECTION_KEY, paths);
        Services.loggerService.log(`Persisted current selection of ${paths.length} items.`);
    }

    // --- Auto-Add New Files State ---

    public getAutoAddState(): boolean {
        return this.context.workspaceState.get<boolean>(AUTO_ADD_STATE_KEY, false);
    }

    public async saveAutoAddState(enabled: boolean): Promise<void> {
        await this.context.workspaceState.update(AUTO_ADD_STATE_KEY, enabled);
        Services.loggerService.log(`Auto-add new files state saved: ${enabled}.`);
    }
}