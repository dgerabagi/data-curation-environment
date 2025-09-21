// src/backend/services/settings.service.ts
// New file in C37
import * as vscode from 'vscode';
import { getContext } from '@/extension';
import { Services } from './services';

const CONNECTION_MODE_KEY = 'dce.connectionMode';
const API_URL_KEY = 'dce.apiUrl';
// API_KEY would be stored in SecretStorage

export type ConnectionMode = 'manual' | 'demo' | 'url' | 'key';

export interface DceSettings {
    connectionMode: ConnectionMode;
    apiUrl?: string;
}

export class SettingsService {
    
    private get context(): vscode.ExtensionContext {
        return getContext();
    }

    public async getSettings(): Promise<DceSettings> {
        const config = vscode.workspace.getConfiguration();
        const connectionMode = config.get<ConnectionMode>(CONNECTION_MODE_KEY, 'manual');
        const apiUrl = config.get<string>(API_URL_KEY);
        
        return { connectionMode, apiUrl };
    }

    public async saveSettings(settings: DceSettings): Promise<void> {
        const config = vscode.workspace.getConfiguration();
        try {
            await config.update(CONNECTION_MODE_KEY, settings.connectionMode, vscode.ConfigurationTarget.Workspace);
            await config.update(API_URL_KEY, settings.apiUrl, vscode.ConfigurationTarget.Workspace);
            Services.loggerService.log(`Settings saved: Mode=${settings.connectionMode}, URL=${settings.apiUrl}`);
            vscode.window.showInformationMessage("DCE settings saved.");
        } catch (error: any) {
            Services.loggerService.error(`Failed to save settings: ${error.message}`);
            vscode.window.showErrorMessage("Failed to save DCE settings.");
        }
    }
}