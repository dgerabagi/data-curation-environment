import * as vscode from "vscode";
import { registerViews, serverIPCs } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";
import { VIEW_TYPES } from "./common/view-types";
import { ServerToClientChannel } from "./common/ipc/channels.enum";
import { API as GitAPI, GitExtension } from "./backend/types/git";

let globalContext: vscode.ExtensionContext | null = null;

export async function activate(context: vscode.ExtensionContext) {
    // Use console.log for the very first message in case the logger service itself fails.
    console.log('DCE Extension: Activating...'); 
    
    // Once logger is available, use it.
    Services.loggerService.log('Congratulations, your extension "Data Curation Environment" is now active!');

    globalContext = context;

    let gitApi: GitAPI | undefined;
    try {
        const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');
        if (gitExtension) {
            await gitExtension.activate();
            gitApi = gitExtension.exports.getAPI(1);
            Services.loggerService.log('[extension.activate] Git API successfully retrieved.');
        } else {
            Services.loggerService.warn('[extension.activate] vscode.git extension not found.');
        }
    } catch (error) {
        Services.loggerService.error(`[extension.activate] Failed to get Git API: ${error}`);
    }

    try {
        Services.loggerService.log('[extension.activate] Initializing services...');
        Services.initialize(gitApi);
        Services.loggerService.log('[extension.activate] Services initialized successfully.');
    } catch (error: any) {
        Services.loggerService.error(`[extension.activate] CRITICAL - Error initializing services: ${error.message}`);
        vscode.window.showErrorMessage("Data Curation Environment failed to initialize services. Check the debug console and logs.");
        return;
    }
    
    try {
        Services.loggerService.log('[extension.activate] Registering commands...');
        registerCommands(context);
        Services.loggerService.log('[extension.activate] Commands registered successfully.');
    } catch (error: any) {
        Services.loggerService.error(`[extension.activate] CRITICAL - Error registering commands: ${error.message}`);
    }

    try {
        Services.loggerService.log('[extension.activate] Registering views...');
        registerViews(context); // This now sends the trust state
        Services.loggerService.log('[extension.activate] Views registered successfully.');
    } catch (error: any) {
        Services.loggerService.error(`[extension.activate] CRITICAL - Error registering views: ${error.message}`);
    }
    
    const updateActiveFile = () => {
        let fileUri: vscode.Uri | undefined;
        
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && activeEditor.document.uri.scheme === 'file') {
            fileUri = activeEditor.document.uri;
        } else {
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
                Services.loggerService.log(`[extension.activate] Active file changed: ${filePath}. Notifying view.`);
                serverIpc.sendToClient(ServerToClientChannel.SetActiveFile, { path: filePath });
            }
        }
    };

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateActiveFile),
        vscode.window.tabGroups.onDidChangeTabs(updateActiveFile),
        // Add a listener for when workspace trust changes
        vscode.workspace.onDidGrantWorkspaceTrust(() => {
            Services.loggerService.log("Workspace trust granted. Notifying webview.");
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceTrustState, { isTrusted: true });
            }
        })
    );

    setTimeout(updateActiveFile, 500);
    Services.loggerService.log('[extension.activate] Activation complete.');
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