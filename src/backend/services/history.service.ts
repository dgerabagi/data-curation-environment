// src/backend/services/history.service.ts
// Updated on: C136 (Initialize hasGeneratedPrompt)
import * as vscode from 'vscode';
import * as path from 'path';
import { Services } from './services';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { promises as fs } from 'fs';
import { getContext } from '@/extension';

const LAST_VIEWED_CYCLE_ID_KEY = 'dce.lastViewedCycleId';

export class HistoryService {
    private workspaceRoot: string | undefined;

    private get context(): vscode.ExtensionContext {
        return getContext();
    }

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.workspaceRoot = workspaceFolders[0].uri.fsPath;
        }
    }

    public async getFullHistory(): Promise<any> {
        const projectScope = Services.databaseService.getGlobalValue<string>('project_scope');
        const cycles = Services.databaseService.getAllCycles();
        return { version: 1, projectScope, cycles };
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

        let isFreshEnvironment = true;
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(path.join(this.workspaceRoot, 'src/Artifacts/DCE_README.md')));
            isFreshEnvironment = false;
        } catch (e) { isFreshEnvironment = true; }
        
        const settings = await Services.settingsService.getSettings();

        const defaultCycle: PcppCycle = {
            cycleId: isFreshEnvironment ? 0 : 1, 
            timestamp: new Date().toISOString(), 
            title: 'New Cycle', 
            cycleContext: '', 
            ephemeralContext: '', 
            responses: { "1": { content: "", status: 'complete' } }, 
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
            isEphemeralContextCollapsed: true,
            isCycleCollapsed: false,
            connectionMode: settings.connectionMode,
            hasGeneratedPrompt: false, // C136: Initialize to false
        };

        if (isFreshEnvironment) {
             return defaultCycle;
        }

        const cycles = Services.databaseService.getAllCycles();

        if (cycles.length === 0) {
            Services.databaseService.saveCycle(defaultCycle);
            return defaultCycle;
        }

        const lastViewedId = this.getLastViewedCycleId();
        const cycleMap = new Map(cycles.map(c => [c.cycleId, c]));

        if (lastViewedId !== undefined && cycleMap.has(lastViewedId)) {
            return cycleMap.get(lastViewedId)!;
        }
        
        const latestCycle = cycles.reduce((latest, current) => current.cycleId > latest.cycleId ? current : latest);
        return latestCycle;
    }

    public async getCycleData(cycleId: number): Promise<PcppCycle | null> {
        if (cycleId === 0) {
            const projectScope = Services.databaseService.getGlobalValue<string>('project_scope');
            const settings = await Services.settingsService.getSettings();
            return {
                cycleId: 0, timestamp: new Date().toISOString(), title: 'Project Setup', cycleContext: projectScope || '', ephemeralContext: '', responses: {}, isParsedMode: false, tabCount: 4, isSortedByTokens: false, pathOverrides: {}, status: 'complete', connectionMode: settings.connectionMode, isCycleCollapsed: false,
                selectedFilesForReplacement: [], hasGeneratedPrompt: true
            };
        }
        return Services.databaseService.getCycle(cycleId);
    }

    public async saveProjectScope(scope: string): Promise<void> {
        Services.databaseService.setGlobalValue('project_scope', scope);
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (serverIpc) {
            serverIpc.sendToClient(ServerToClientChannel.NotifySaveComplete, { cycleId: 0 });
        }
    }

    public async saveCycleData(cycleData: PcppCycle): Promise<void> {
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];

        if (cycleData.cycleId === 0) {
            await this.saveProjectScope(cycleData.cycleContext);
        } else {
            Services.databaseService.saveCycle(cycleData);
        }

        if (serverIpc) {
            serverIpc.sendToClient(ServerToClientChannel.NotifySaveComplete, { cycleId: cycleData.cycleId });
        }
    }

    public async createNewCyclePlaceholder(tabCount: number): Promise<{ newCycle: PcppCycle; newMaxCycle: number; }> {
        const cycles = Services.databaseService.getAllCycles();
        const newCycleId = (cycles.reduce((max, c) => Math.max(max, c.cycleId), 0)) + 1;

        const newResponses: { [tabId: string]: PcppResponse } = {};
        for(let i = 0; i < tabCount; i++) {
            newResponses[(i+1).toString()] = { content: '', status: 'generating' };
        }
        
        const settings = await Services.settingsService.getSettings();

        const newCycle: PcppCycle = {
            cycleId: newCycleId,
            timestamp: new Date().toISOString(),
            title: 'New Cycle',
            cycleContext: '',
            ephemeralContext: '',
            responses: newResponses,
            tabCount: tabCount,
            isParsedMode: true,
            status: 'generating',
            isEphemeralContextCollapsed: true,
            isCycleCollapsed: false,
            connectionMode: settings.connectionMode,
            selectedFilesForReplacement: [],
            hasGeneratedPrompt: false // C136: New cycle hasn't generated prompt yet
        };

        Services.databaseService.saveCycle(newCycle);
        Services.loggerService.log(`Created new placeholder cycle ${newCycleId}.`);
        
        return { newCycle, newMaxCycle: newCycleId };
    }
    
    // ... rest of the file (finalizeCycleStatus, updateCycleWithResponses, etc.) remains unchanged ...
    public async finalizeCycleStatus(cycleId: number): Promise<void> {
        const cycle = Services.databaseService.getCycle(cycleId);
        if (cycle) {
            cycle.status = 'complete';
            Services.databaseService.saveCycle(cycle);
            Services.loggerService.log(`[History] Cycle ${cycleId} status set to 'complete'.`);
        }
    }

    public async updateCycleWithResponses(cycleId: number, responses: PcppResponse[]): Promise<void> {
        const cycle = Services.databaseService.getCycle(cycleId);
        if (cycle) {
            Object.keys(cycle.responses).forEach((tabId, index) => {
                if (responses[index]) {
                    cycle.responses[tabId] = responses[index];
                }
            });
            Services.databaseService.saveCycle(cycle);
            Services.loggerService.log(`Updated cycle ${cycleId} with ${responses.length} responses.`);
        }
    }

    public async updateSingleResponseInCycle(cycleId: number, tabId: string, newResponse: PcppResponse | null): Promise<void> {
        const cycle = Services.databaseService.getCycle(cycleId);
        if (cycle) {
            if (newResponse !== null) {
                cycle.responses[tabId] = newResponse;
            } else {
                cycle.responses[tabId] = { content: '', status: 'generating' };
            }
            Services.databaseService.saveCycle(cycle);
        }
    }

    public async deleteCycle(cycleId: number): Promise<number> {
        const confirmation = await vscode.window.showWarningMessage(
            `Are you sure you want to delete Cycle ${cycleId}? This action cannot be undone.`,
            { modal: true },
            "Delete"
        );

        if (confirmation !== "Delete") {
            const cycles = Services.databaseService.getAllCycles();
            return cycles.reduce((max, c) => Math.max(max, c.cycleId), 0);
        }
        
        const cycles = Services.databaseService.getAllCycles();
        if (cycles.length <= 1) {
            vscode.window.showWarningMessage("Cannot delete the last cycle.");
            return 1;
        }

        Services.databaseService.deleteCycle(cycleId);
        
        const updatedCycles = Services.databaseService.getAllCycles();
        const newMaxCycle = updatedCycles.reduce((max, c) => Math.max(max, c.cycleId), 0);

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

        Services.databaseService.reset();
        await this.saveLastViewedCycleId(null);
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (serverIpc) {
            serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'history' });
        }
    }

    public async handleExportHistory() {
        if (!this.workspaceRoot) {
            vscode.window.showErrorMessage("No workspace open.");
            return;
        }
        try {
            const historyContent = await this.getFullHistory();
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
        if (!this.workspaceRoot) {
            vscode.window.showErrorMessage("No workspace open.");
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
                    // Wipe DB and load from JSON
                    Services.databaseService.reset();
                    
                    if (historyData.projectScope) {
                        Services.databaseService.setGlobalValue('project_scope', historyData.projectScope);
                    }
                    
                    for (const cycle of historyData.cycles) {
                        Services.databaseService.saveCycle(cycle);
                    }

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