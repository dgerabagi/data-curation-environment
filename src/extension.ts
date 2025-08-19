import * as vscode from "vscode";
import { registerViews, serverIPCs } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";
import { VIEW_TYPES } from "./common/view-types";
import { ServerToClientChannel } from "./common/ipc/channels.enum";
import { API as GitAPI, GitExtension } from "./backend/types/git";

let globalContext: vscode.ExtensionContext | null = null;

export async function activate(context: vscode.ExtensionContext) {
    console.log('DCE Extension: Activating...');
    Services.loggerService.log('Congratulations, your extension "Data Curation Environment" is now active!');

    globalContext = context;

    let gitApi: GitAPI | undefined;
    try {
        const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');
        if (gitExtension) {
            await gitExtension.activate();
            gitApi = gitExtension.exports.getAPI(1);
            Services.loggerService.log('Git API successfully retrieved.');
        } else {
            Services.loggerService.warn('vscode.git extension not found.');
        }
    } catch (error) {
        Services.loggerService.error(`Failed to get Git API: ${error}`);
    }

    try {
        Services.initialize(gitApi);
    } catch (error: any) {
        Services.loggerService.error(`CRITICAL - Error initializing services: ${error.message}`);
        vscode.window.showErrorMessage("Data Curation Environment failed to initialize services. Check the debug console.");
        return;
    }
    
    try {
        registerCommands(context);
    } catch (error: any) {
        Services.loggerService.error(`CRITICAL - Error registering commands: ${error.message}`);
    }

    try {
        registerViews(context);
    } catch (error: any) {
        Services.loggerService.error(`CRITICAL - Error registering views: ${error.message}`);
    }
    
    // C48: Refactored Active File Sync to support binary files
    const updateActiveFile = () => {
        let fileUri: vscode.Uri | undefined;
        
        // Prioritize the active text editor, as it's most reliable for text files
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && activeEditor.document.uri.scheme === 'file') {
            fileUri = activeEditor.document.uri;
        } else {
            // Fallback for non-text editors (e.g., image viewer)
            const activeTab = vscode.window.tabGroups.activeTabGroup.activeTab;
            const tabInput = activeTab?.input as { uri?: vscode.Uri };
            if (tabInput?.uri && tabInput.uri.scheme === 'file') {
                fileUri = tabInput.uri;
            }
        }

        if (fileUri) {
            const filePath = fileUri.fsPath.replace(/\\/g, '/');
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                Services.loggerService.log(`Active file changed: ${filePath}. Notifying view.`);
                serverIpc.sendToClient(ServerToClientChannel.SetActiveFile, { path: filePath });
            }
        }
    };

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateActiveFile),
        vscode.window.tabGroups.onDidChangeTabs(updateActiveFile)
    );

    // Initial sync on activation
    setTimeout(updateActiveFile, 500);
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {
    Services.loggerService.log('DCE Extension: Deactivating.');
}