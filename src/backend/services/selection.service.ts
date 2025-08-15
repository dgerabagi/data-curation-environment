import * as vscode from 'vscode';
import { getContext } from '@/extension';

const SELECTION_SETS_KEY = 'dce.selectionSets';

export interface SelectionSet {
    [name: string]: string[];
}

export class SelectionService {
    
    private get context(): vscode.ExtensionContext {
        return getContext();
    }

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
        vscode.window.showInformationMessage(`Selection set '${name}' saved.`);
    }

    public async deleteSelectionSet(name: string): Promise<void> {
        const sets = this.getSelectionSets();
        if (sets[name]) {
            delete sets[name];
            await this.context.workspaceState.update(SELECTION_SETS_KEY, sets);
            vscode.window.showInformationMessage(`Selection set '${name}' deleted.`);
        }
    }
}