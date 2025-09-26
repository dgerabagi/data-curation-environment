// src/backend/services/history.service.ts
// Updated on: C74 (Return newMaxCycle from placeholder creation)
import * as vscode from 'vscode';
import * as path from 'path';
import { Services } from './services';
import { PcppCycle, PcppHistoryFile, PcppResponse } from '@/common/types/pcpp.types';
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
            this.workspaceRoot = workspaceFolders[0].uri.fsPath;
            this.historyFilePath = path.join(this.workspaceRoot, '.vscode', 'dce_history.json');
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

        // --- DATA LOSS PREVENTION (C66) ---
        if (!data || !Array.isArray(data.cycles) || (data.cycles.length === 0 && data.projectScope === undefined)) {
            const errorMessage = `[CRITICAL] Aborting write to dce_history.json: Data is invalid or empty.`;
            Services.loggerService.error(errorMessage);
            try {
                if (this.workspaceRoot) {
                    const logFilePath = path.join(this.workspaceRoot, 'log-state-logs.md');
                    const logContent = `## DATA LOSS PREVENTION TRIGGERED ##\n\n**Timestamp:** ${new Date().toISOString()}\n\n**Reason:** Attempted to write an invalid or empty history object to dce_history.json. The write operation was aborted.\n\n**Problematic State Object:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n`;
                    await fs.writeFile(logFilePath, logContent, 'utf-8');
                    Services.loggerService.log(`[CRITICAL] The invalid state object has been logged to log-state-logs.md`);
                }
            } catch (logError) {
                Services.loggerService.error(`[CRITICAL] Failed to write data loss log: ${logError}`);
            }
            return; // Abort the write
        }
        // --- END DATA LOSS PREVENTION ---

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

    public async saveLastViewedCycleId(id: number | null): Promise<void> {
        await this.context.workspaceState.update(LAST_VIEWED_CYCLE_ID_KEY, id);
    }

    public getLastViewedCycleId(): number | undefined {
        return this.context.workspaceState.get<number>(LAST_VIEWED_CYCLE_ID_KEY);
    }

    public async getInitialCycle(): Promise<PcppCycle> {
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
            cycleId: isFreshEnvironment ? 0 : 1, 
            timestamp: new Date().toISOString(), 
            title: 'New Cycle', 
            cycleContext: '', 
            ephemeralContext: '', 
            responses: { "1": { content: "" } }, 
            isParsedMode: false, 
            leftPaneWidth: 33, 
            selectedResponseId: null, 
            selectedFilesForReplacement: [], 
            tabCount: 4, 
            activeTab: 1,
            isSortedByTokens: false, 
            pathOverrides: {},
            activeWorkflowStep: null,
            status: 'complete',
            isEphemeralContextCollapsed: true, // Default to collapsed
        };

        if (isFreshEnvironment) {
             return defaultCycle;
        }

        if (history.cycles.length === 0) {
            const newHistory = { ...history, cycles: [defaultCycle] };
            await this._writeHistoryFile(newHistory);
            return defaultCycle;
        }

        const lastViewedId = this.getLastViewedCycleId();
        const cycleMap = new Map(history.cycles.map(c => [c.cycleId, c]));

        if (lastViewedId !== undefined && cycleMap.has(lastViewedId)) {
            return cycleMap.get(lastViewedId)!;
        }
        
        const latestCycle = history.cycles.reduce((latest, current) => current.cycleId > latest.cycleId ? current : latest);
        return latestCycle;
    }

    public async getCycleData(cycleId: number): Promise<PcppCycle | null> {
        if (cycleId === 0) {
            const history = await this._readHistoryFile();
            return {
                cycleId: 0, timestamp: new Date().toISOString(), title: 'Project Setup', cycleContext: history.projectScope || '', ephemeralContext: '', responses: {}, isParsedMode: false, tabCount: 4, isSortedByTokens: false, pathOverrides: {}, status: 'complete'
            };
        }

        const history = await this._readHistoryFile();
        return history.cycles.find(c => c.cycleId === cycleId) || null;
    }

    public async saveProjectScope(scope: string): Promise<void> {
        const history = await this._readHistoryFile();
        history.projectScope = scope;
        await this._writeHistoryFile(history);
    }

    public async saveCycleData(cycleData: PcppCycle): Promise<void> {
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];

        if (cycleData.cycleId === 0) {
            await this.saveProjectScope(cycleData.cycleContext);
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.NotifySaveComplete, { cycleId: 0 });
            }
            return;
        }

        const history = await this._readHistoryFile();
        const cycleIndex = history.cycles.findIndex(c => c.cycleId === cycleData.cycleId);

        if (cycleIndex > -1) {
            history.cycles[cycleIndex] = cycleData;
        } else {
            history.cycles.push(cycleData);
        }
        
        history.cycles.sort((a, b) => a.cycleId - b.cycleId);

        await this._writeHistoryFile(history);

        if (serverIpc) {
            serverIpc.sendToClient(ServerToClientChannel.NotifySaveComplete, { cycleId: cycleData.cycleId });
        }
    }

    public async createNewCyclePlaceholder(tabCount: number): Promise<{ newCycleId: number; newMaxCycle: number; }> {
        const history = await this._readHistoryFile();
        const newCycleId = (history.cycles.reduce((max, c) => Math.max(max, c.cycleId), 0)) + 1;

        const newResponses: { [tabId: string]: PcppResponse } = {};
        for(let i = 0; i < tabCount; i++) {
            newResponses[(i+1).toString()] = { content: '' };
        }

        const newCycle: PcppCycle = {
            cycleId: newCycleId,
            timestamp: new Date().toISOString(),
            title: `Cycle ${newCycleId} - Generating...`,
            cycleContext: '',
            ephemeralContext: '',
            responses: newResponses,
            tabCount: tabCount,
            isParsedMode: true,
            status: 'generating', // Set status to generating
            isEphemeralContextCollapsed: true,
        };

        history.cycles.push(newCycle);
        await this._writeHistoryFile(history);
        Services.loggerService.log(`Created new placeholder cycle ${newCycleId}.`);
        
        return { newCycleId, newMaxCycle: newCycleId };
    }

    public async updateCycleWithResponses(cycleId: number, responses: string[]): Promise<void> {
        const history = await this._readHistoryFile();
        const cycleIndex = history.cycles.findIndex(c => c.cycleId === cycleId);

        if (cycleIndex > -1) {
            const cycle = history.cycles[cycleIndex];
            cycle.status = 'complete';
            cycle.title = `Cycle ${cycleId}`; // Reset title
            Object.keys(cycle.responses).forEach((tabId, index) => {
                if (responses[index]) {
                    cycle.responses[tabId].content = responses[index];
                }
            });
            await this._writeHistoryFile(history);
            Services.loggerService.log(`Updated cycle ${cycleId} with ${responses.length} responses.`);
        } else {
            Services.loggerService.error(`Could not find placeholder cycle ${cycleId} to update with responses.`);
        }
    }

    public async updateSingleResponseInCycle(cycleId: number, tabId: string, newContent: string): Promise<void> {
        const history = await this._readHistoryFile();
        const cycle = history.cycles.find(c => c.cycleId === cycleId);
        if (cycle) {
            if (cycle.responses[tabId]) {
                cycle.responses[tabId].content = newContent;
            } else {
                cycle.responses[tabId] = { content: newContent };
            }
            await this._writeHistoryFile(history);
            Services.loggerService.log(`Updated response for tab ${tabId} in cycle ${cycleId}.`);
        } else {
            Services.loggerService.error(`Could not find cycle ${cycleId} to update response.`);
        }
    }

    public async deleteCycle(cycleId: number): Promise<number> {
        const confirmation = await vscode.window.showWarningMessage(
            `Are you sure you want to delete Cycle ${cycleId}? This action cannot be undone.`,
            { modal: true },
            "Delete"
        );

        if (confirmation !== "Delete") {
            const history = await this._readHistoryFile();
            return history.cycles.reduce((max, c) => Math.max(max, c.cycleId), 0);
        }
        
        let history = await this._readHistoryFile();
        if (history.cycles.length <= 1) {
            vscode.window.showWarningMessage("Cannot delete the last cycle.");
            return 1;
        }

        history.cycles = history.cycles.filter(c => c.cycleId !== cycleId);
        await this._writeHistoryFile(history);
        
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
            return;
        }

        if (this.historyFilePath) {
            try {
                await vscode.workspace.fs.delete(vscode.Uri.file(this.historyFilePath));
                await this.saveLastViewedCycleId(null); // Clear the last viewed ID
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
        }
    }

    public async handleImportHistory() {
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
                const content = await fs.readFile(openUris[0].fsPath, 'utf-8');
                const historyData = JSON.parse(content);
                if (historyData.version && Array.isArray(historyData.cycles)) {
                    await this._writeHistoryFile(historyData);
                    await this.saveLastViewedCycleId(null);
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
        }
    }
}