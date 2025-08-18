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

    // --- Path Manipulation for File Moves ---
    public async updatePathInSelections(oldPath: string, newPath: string): Promise<void> {
        Services.loggerService.log(`Updating path in selections: ${oldPath} -> ${newPath}`);

        // Update last active selection
        const lastSelection = this.getLastSelection();
        const updatedLastSelection = this.updatePathsInList(lastSelection, oldPath, newPath);
        await this.saveCurrentSelection(updatedLastSelection);

        // Update all named selection sets
        const allSets = this.getSelectionSets();
        let setsUpdated = false;
        for (const setName in allSets) {
            const updatedSet = this.updatePathsInList(allSets[setName], oldPath, newPath);
            if (updatedSet.length !== allSets[setName].length || updatedSet.some((p, i) => p !== allSets[setName][i])) {
                allSets[setName] = updatedSet;
                setsUpdated = true;
            }
        }
        if (setsUpdated) {
            await this.context.workspaceState.update(SELECTION_SETS_KEY, allSets);
            Services.loggerService.log(`Updated paths in named selection sets.`);
        }
    }

    private updatePathsInList(paths: string[], oldPath: string, newPath: string): string[] {
        return paths.map(p => {
            if (p === oldPath) {
                return newPath; // Exact match
            }
            if (p.startsWith(oldPath + '/')) {
                // Descendant path
                return newPath + p.substring(oldPath.length);
            }
            return p;
        });
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