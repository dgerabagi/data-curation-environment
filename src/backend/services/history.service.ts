// src/backend/services/history.service.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { Services } from './services';

// Basic structure for history data
interface CycleResponse {
    responseId: string;
    model: string;
    content: string;
}

interface Cycle {
    cycleId: string;
    timestamp: string;
    prompt: string;
    responses: CycleResponse[];
}

interface HistoryFile {
    version: number;
    cycles: Cycle[];
}

export class HistoryService {
    private historyFilePath: string | undefined;

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.historyFilePath = path.join(workspaceFolders[0].uri.fsPath, '.vscode', 'dce_history.json');
        }
    }

    private async _readHistoryFile(): Promise<HistoryFile> {
        if (!this.historyFilePath) return { version: 1, cycles: [] };
        try {
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(this.historyFilePath));
            return JSON.parse(Buffer.from(content).toString('utf-8'));
        } catch (error) {
            Services.loggerService.warn("dce_history.json not found or is invalid. A new one will be created.");
            return { version: 1, cycles: [] };
        }
    }

    private async _writeHistoryFile(data: HistoryFile): Promise<void> {
        if (!this.historyFilePath) return;
        const dir = path.dirname(this.historyFilePath);
        try {
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(dir));
            const content = Buffer.from(JSON.stringify(data, null, 2), 'utf-8');
            await vscode.workspace.fs.writeFile(vscode.Uri.file(this.historyFilePath), content);
        } catch (error) {
            Services.loggerService.error(`Failed to write to dce_history.json: ${error}`);
        }
    }

    public async getCycleHistory() {
        Services.loggerService.log("HistoryService: getCycleHistory called.");
        const history = await this._readHistoryFile();
        return history.cycles.map(c => c.cycleId).sort(); // Return sorted list of cycle IDs
    }
}