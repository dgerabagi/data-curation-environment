// src/backend/services/history.service.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { Services } from './services';

export interface PcppResponse {
    content: string;
    // Add other response metadata like ratings, comments in the future
}

export interface PcppCycle {
    cycleId: number;
    timestamp: string;
    title: string;
    cycleContext: string;
    ephemeralContext: string;
    responses: { [tabId: number]: PcppResponse };
}

export interface PcppHistoryFile {
    version: number;
    cycles: PcppCycle[];
}

export class HistoryService {
    private historyFilePath: string | undefined;

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.historyFilePath = path.join(workspaceFolders[0].uri.fsPath, '.vscode', 'dce_history.json');
        }
    }

    private async _readHistoryFile(): Promise<PcppHistoryFile> {
        if (!this.historyFilePath) return { version: 1, cycles: [] };
        try {
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(this.historyFilePath));
            return JSON.parse(Buffer.from(content).toString('utf-8'));
        } catch (error) {
            Services.loggerService.warn("dce_history.json not found or is invalid. A new one will be created.");
            return { version: 1, cycles: [] };
        }
    }

    private async _writeHistoryFile(data: PcppHistoryFile): Promise<void> {
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

    public async getCycleHistoryList(): Promise<number[]> {
        Services.loggerService.log("HistoryService: getCycleHistoryList called.");
        const history = await this._readHistoryFile();
        return history.cycles.map(c => c.cycleId).sort((a, b) => a - b);
    }

    public async getCycleData(cycleId: number): Promise<PcppCycle | null> {
        Services.loggerService.log(`HistoryService: getting data for cycle ${cycleId}.`);
        const history = await this._readHistoryFile();
        return history.cycles.find(c => c.cycleId === cycleId) || null;
    }

    public async saveCycleData(cycleData: PcppCycle): Promise<void> {
        Services.loggerService.log(`HistoryService: saving data for cycle ${cycleData.cycleId}.`);
        const history = await this._readHistoryFile();
        const cycleIndex = history.cycles.findIndex(c => c.cycleId === cycleData.cycleId);

        if (cycleIndex > -1) {
            // Update existing cycle
            history.cycles[cycleIndex] = cycleData;
        } else {
            // Add new cycle
            history.cycles.push(cycleData);
        }
        
        // Sort cycles by ID to maintain order
        history.cycles.sort((a, b) => a.cycleId - b.cycleId);

        await this._writeHistoryFile(history);
    }
}