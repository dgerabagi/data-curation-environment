// src/backend/services/history.service.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { Services } from './services';
import { PcppCycle, PcppHistoryFile } from '@/common/types/pcpp.types';

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

    public async getFullHistory(): Promise<PcppCycle[]> {
        const history = await this._readHistoryFile();
        return history.cycles;
    }

    public async getLatestCycle(): Promise<PcppCycle> {
        Services.loggerService.log("HistoryService: getLatestCycle called.");
        const history = await this._readHistoryFile();
        if (history.cycles.length === 0) {
            Services.loggerService.log("No history found, creating default cycle 1.");
            const defaultCycle: PcppCycle = {
                cycleId: 1,
                timestamp: new Date().toISOString(),
                title: 'New Cycle',
                cycleContext: '',
                ephemeralContext: '',
                responses: { "1": { content: "" } },
                isParsedMode: false,
                leftPaneWidth: 33,
            };
            await this.saveCycleData(defaultCycle);
            return defaultCycle;
        }
        
        const latestCycle = history.cycles.reduce((latest, current) => current.cycleId > latest.cycleId ? current : latest);
        Services.loggerService.log(`Latest cycle found: ${latestCycle.cycleId}`);
        return latestCycle;
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
            history.cycles[cycleIndex] = cycleData;
        } else {
            history.cycles.push(cycleData);
        }
        
        history.cycles.sort((a, b) => a.cycleId - b.cycleId);

        await this._writeHistoryFile(history);
    }

    public async deleteCycle(cycleId: number): Promise<void> {
        Services.loggerService.log(`HistoryService: Deleting cycle ${cycleId}.`);
        const history = await this._readHistoryFile();
        const updatedCycles = history.cycles.filter(c => c.cycleId !== cycleId);

        if (updatedCycles.length === 0) {
            await this.resetHistory();
            return;
        }

        history.cycles = updatedCycles;
        await this._writeHistoryFile(history);
        Services.loggerService.log(`Cycle ${cycleId} deleted.`);
    }

    public async resetHistory(): Promise<void> {
        Services.loggerService.log(`HistoryService: Resetting all cycle history.`);
        const defaultHistory: PcppHistoryFile = {
            version: 1,
            cycles: [] // getLatestCycle will auto-create cycle 1
        };
        await this._writeHistoryFile(defaultHistory);
        Services.loggerService.log(`Cycle history has been reset.`);
    }
}