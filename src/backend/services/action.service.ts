import * as vscode from 'vscode';
import { Services } from './services';

export type ActionType = 'move' | 'delete';

export interface Action {
    type: ActionType;
    payload: any;
}

export interface MoveActionPayload {
    fromPath: string;
    toPath: string;
}

export class ActionService {
    private undoStack: Action[] = [];
    private redoStack: Action[] = [];

    public push(action: Action) {
        this.undoStack.push(action);
        // Any new action clears the redo stack
        this.redoStack = [];
        Services.loggerService.log(`Pushed action to undo stack: ${action.type}. Stack size: ${this.undoStack.length}`);
    }

    public async undo() {
        const action = this.undoStack.pop();
        if (!action) {
            Services.loggerService.log("Undo stack empty.");
            return;
        }

        Services.loggerService.log(`Undoing action: ${action.type}`);
        await this.performReverseAction(action);
        this.redoStack.push(action);
    }

    public async redo() {
        const action = this.redoStack.pop();
        if (!action) {
            Services.loggerService.log("Redo stack empty.");
            return;
        }

        Services.loggerService.log(`Redoing action: ${action.type}`);
        await this.performOriginalAction(action);
        this.undoStack.push(action);
    }

    private async performReverseAction(action: Action) {
        switch (action.type) {
            case 'move':
                const { fromPath, toPath } = action.payload as MoveActionPayload;
                await vscode.workspace.fs.rename(vscode.Uri.file(toPath), vscode.Uri.file(fromPath));
                break;
            // 'delete' undo is complex with trash; for now, we focus on 'move'.
            // A full implementation would require restoring from trash, which VS Code API doesn't expose directly.
        }
    }

    private async performOriginalAction(action: Action) {
        switch (action.type) {
            case 'move':
                const { fromPath, toPath } = action.payload as MoveActionPayload;
                 await vscode.workspace.fs.rename(vscode.Uri.file(fromPath), vscode.Uri.file(toPath));
                break;
            case 'delete':
                await vscode.workspace.fs.delete(vscode.Uri.file(action.payload.path), { recursive: true, useTrash: true });
                break;
        }
    }
}