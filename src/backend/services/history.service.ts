import * as vscode from 'vscode';
import * as path from 'path';
import { Services } from './services';
import { PcppCycle, PcppHistoryFile } from '@/common/types/pcpp.types';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';

export class HistoryService {
    private historyFilePath: string | undefined;
    private workspaceRoot: string | undefined;

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.workspaceRoot = workspaceFolders[0].uri.fsPath;
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

    public async getLatestCycle(): Promise<PcppCycle> {
        Services.loggerService.log("HistoryService: getLatestCycle called.");
        const history = await this._readHistoryFile();
        let isFreshEnvironment = history.cycles.length === 0;

        if (this.workspaceRoot) {
            // C155 Fix: Check for a generic A0 file, not one with "DCE" in the name.
            const a0Path = path.join(this.workspaceRoot, 'src/Artifacts', 'A0. Master Artifact List.md');
            const a0Exists = await Services.fileOperationService.fileExists(a0Path);
            if (!a0Exists) {
                isFreshEnvironment = true;
            }
        }
        
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
            isSortedByLength: false,
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
        
        const latestCycle = history.cycles.reduce((latest, current) => current.cycleId > latest.cycleId ? current : latest);
        Services.loggerService.log(`Latest cycle found: ${latestCycle.cycleId}`);
        return latestCycle;
    }

    public async getCycleData(cycleId: number): Promise<PcppCycle | null> {
        Services.loggerService.log(`HistoryService: getting data for cycle ${cycleId}.`);
        
        if (cycleId === 0) {
            Services.loggerService.log("Returning special case for Cycle 0.");
            return {
                cycleId: 0,
                timestamp: new Date().toISOString(),
                title: 'Project Setup',
                cycleContext: '',
                ephemeralContext: '',
                responses: {},
                isParsedMode: false,
                tabCount: 4,
                isSortedByLength: false,
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
        if (cycleData.cycleId === 0) return;

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
        
        if (history.cycles.length <= 1) {
            Services.loggerService.warn("Cannot delete the last remaining cycle.");
            vscode.window.showWarningMessage("Cannot delete the last cycle.");
            return;
        }

        history.cycles = history.cycles.filter(c => c.cycleId !== cycleId);
        await this._writeHistoryFile(history);
        Services.loggerService.log(`Cycle ${cycleId} deleted successfully.`);
        
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (serverIpc) {
            serverIpc.sendToClient(ServerToClientChannel.ForceRefresh, { reason: 'history' });
        }
    }

    public async resetHistory(): Promise<void> {
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
}