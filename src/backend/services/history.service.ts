// src/backend/services/history.service.ts
// Updated on: C186 (Implement last-viewed cycle persistence)
import * as vscode from 'vscode';
import * as path from 'path';
import { Services } from './services';
import { PcppCycle, PcppHistoryFile } from '@/common/types/pcpp.types';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { promises as fs } from 'fs';
import { getContext } from '@/extension';

const LAST_VIEWED_CYCLE_ID_KEY = 'dce.lastViewedCycleId';

export class HistoryService {
    private historyFilePath: string | undefined;
    private workspaceRoot: string | undefined;

    private get context(): vscode.ExtensionContext {
        return getContext();
    }

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.workspaceRoot = workspaceFolders.uri.fsPath;
            this.historyFilePath = path.join(this.workspaceRoot, '.vscode', 'dce_history.json');
        } else {
            Services.loggerService.warn("HistoryService: No workspace folder found. History will not be saved.");
        }
    }

    private async _readHistoryFile(): Promise<PcppHistoryFile> {
        if (!this.historyFilePath) return { version: 1, cycles: [] };
        try {
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(this.historyFilePath));
            return JSON.parse(Buffer.from(content).toString('utf-8'));
        } catch (error) {
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

    public async getFullHistory(): Promise<PcppHistoryFile> {
        return await this._readHistoryFile();
    }

    public async saveLastViewedCycleId(id: number): Promise<void> {
        await this.context.workspaceState.update(LAST_VIEWED_CYCLE_ID_KEY, id);
        Services.loggerService.log(`Saved last viewed cycle ID: ${id}`);
    }

    public getLastViewedCycleId(): number | undefined {
        return this.context.workspaceState.get<number>(LAST_VIEWED_CYCLE_ID_KEY);
    }

    public async getInitialCycle(): Promise<PcppCycle> {
        Services.loggerService.log("HistoryService: getInitialCycle called.");

        if (!this.workspaceRoot) {
            return { cycleId: -1, timestamp: '', title: '', cycleContext: '', ephemeralContext: '', responses: {} };
        }

        const history = await this._readHistoryFile();
        let isFreshEnvironment = true;
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(path.join(this.workspaceRoot, 'src/Artifacts/DCE_README.md')));
            isFreshEnvironment = false;
        } catch (e) { isFreshEnvironment = true; }
        
        const defaultCycle: PcppCycle = {
            cycleId: isFreshEnvironment ? 0 : 1, timestamp: new Date().toISOString(), title: 'New Cycle', cycleContext: '', ephemeralContext: '', responses: { "1": { content: "" } }, isParsedMode: false, leftPaneWidth: 33, selectedResponseId: null, selectedFilesForReplacement: [], tabCount: 4, isSortedByTokens: false, cycleContextHeight: 100, ephemeralContextHeight: 100,
        };

        if (isFreshEnvironment) {
             Services.loggerService.log("Fresh environment detected. Returning Cycle 0.");
             return defaultCycle;
        }

        if (history.cycles.length === 0) {
            Services.loggerService.log("No history found, creating default cycle 1.");
            await this.saveCycleData(defaultCycle);
            return defaultCycle;
        }

        const lastViewedId = this.getLastViewedCycleId();
        const lastViewedCycle = history.cycles.find(c => c.cycleId === lastViewedId);
        if (lastViewedCycle) {
            Services.loggerService.log(`Found last viewed cycle: ${lastViewedId}`);
            return lastViewedCycle;
        }
        
        const latestCycle = history.cycles.reduce((latest, current) => current.cycleId > latest.cycleId ? current : latest);
        Services.loggerService.log(`No last-viewed cycle found. Falling back to latest cycle: ${latestCycle.cycleId}`);
        return latestCycle;
    }

    public async getCycleData(cycleId: number): Promise<PcppCycle | null> {
        Services.loggerService.log(`HistoryService: getting data for cycle ${cycleId}.`);
        
        if (cycleId === 0) {
            Services.loggerService.log("Returning special case for Cycle 0.");
            const history = await this._readHistoryFile();
            return {
                cycleId: 0, timestamp: new Date().toISOString(), title: 'Project Setup', cycleContext: history.projectScope || '', ephemeralContext: '', responses: {}, isParsedMode: false, tabCount: 4, isSortedByTokens: false,
            };
        }

        const history = await this._readHistoryFile();
        return history.cycles.find(c => c.cycleId === cycleId) || null;
    }

    public async saveProjectScope(scope: string): Promise<void> {
        const history = await this._readHistoryFile();
        history.projectScope = scope;
        await this._writeHistoryFile(history);
        Services.loggerService.log("Project scope saved.");
    }

    public async saveCycleData(cycleData: PcppCycle): Promise<void> {
        if (cycleData.cycleId === 0) {
            await this.saveProjectScope(cycleData.cycleContext);
            return;
        }

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

    public async deleteCycle(cycleId: number): Promise<number> {
        Services.loggerService.log(`HistoryService: Deleting cycle ${cycleId}.`);
        
        const confirmation = await vscode.window.showWarningMessage(
            `Are you sure you want to delete Cycle ${cycleId}? This action cannot be undone.`,
            { modal: true },
            "Delete"
        );

        if (confirmation !== "Delete") {
            Services.loggerService.log("Cycle deletion cancelled by user.");
            const history = await this._readHistoryFile();
            return history.cycles.reduce((max, c) => Math.max(max, c.cycleId), 0);
        }
        
        let history = await this._readHistoryFile();
        if (history.cycles.length <= 1) {
            Services.loggerService.warn("Cannot delete the last remaining cycle.");
            vscode.window.showWarningMessage("Cannot delete the last cycle.");
            return 1;
        }

        history.cycles = history.cycles.filter(c => c.cycleId !== cycleId);
        await this._writeHistoryFile(history);
        Services.loggerService.log(`Cycle ${cycleId} deleted successfully.`);
        
        const updatedHistory = await this._readHistoryFile();
        const newMaxCycle = updatedHistory.cycles.reduce((max, c) => Math.max(max, c.cycleId), 0);

        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (serverIpc) {
            serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'history' });
        }
        return newMaxCycle;
    }

    public async resetHistory(): Promise<void> {
        const confirmation = await vscode.window.showWarningMessage(
            "Are you sure you want to delete ALL cycle history? This action cannot be undone.",
            { modal: true },
            "Delete All"
        );

        if (confirmation !== "Delete All") {
            Services.loggerService.log("History reset cancelled by user.");
            return;
        }

        Services.loggerService.log(`HistoryService: Resetting all cycle history.`);
        if (this.historyFilePath) {
            try {
                await vscode.workspace.fs.delete(vscode.Uri.file(this.historyFilePath));
                Services.loggerService.log("dce_history.json deleted successfully.");
                 const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
                if (serverIpc) {
                    serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'history' });
                }
            } catch (error) {
                Services.loggerService.error(`Failed to delete dce_history.json: ${error}`);
            }
        }
    }

    public async handleExportHistory() {
        Services.loggerService.log("Exporting cycle history.");
        if (!this.historyFilePath || !this.workspaceRoot) {
            vscode.window.showErrorMessage("History file path not found.");
            return;
        }
        try {
            const historyContent = await this._readHistoryFile();
            const saveUri = await vscode.window.showSaveDialog({
                defaultUri: vscode.Uri.file(path.join(this.workspaceRoot, 'dce_history_export.json')),
                filters: { 'JSON': ['json'] }
            });
            if (saveUri) {
                await fs.writeFile(saveUri.fsPath, JSON.stringify(historyContent, null, 2), 'utf-8');
                vscode.window.showInformationMessage("Cycle history exported successfully.");
            }
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to export history: ${error.message}`);
            Services.loggerService.error(`Failed to export history: ${error.message}`);
        }
    }

    public async handleImportHistory() {
        Services.loggerService.log("Importing cycle history.");
        if (!this.historyFilePath) {
            vscode.window.showErrorMessage("History file path not found.");
            return;
        }
        try {
            const openUris = await vscode.window.showOpenDialog({
                canSelectMany: false,
                filters: { 'JSON': ['json'] }
            });
            if (openUris && openUris.length > 0) {
                const content = await fs.readFile(openUris.fsPath, 'utf-8');
                const historyData = JSON.parse(content);
                if (historyData.version && Array.isArray(historyData.cycles)) {
                    await this._writeHistoryFile(historyData);
                    vscode.window.showInformationMessage("Cycle history imported successfully. Reloading...");
                    const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
                    if (serverIpc) {
                        serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'history' });
                    }
                } else {
                    throw new Error("Invalid history file format.");
                }
            }
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to import history: ${error.message}`);
            Services.loggerService.error(`Failed to import history: ${error.message}`);
        }
    }
}