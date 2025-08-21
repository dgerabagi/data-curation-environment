import * as vscode from "vscode";
import { registerViews, serverIPCs } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";
import { VIEW_TYPES } from "./common/view-types";
import { ServerToClientChannel } from "./common/ipc/channels.enum";
import { API as GitAPI, GitExtension } from "./backend/types/git";
import { getNonce, getViewHtml } from "./common/utils/view-html";
import { onMessage as onParallelCopilotMessage } from "./client/views/parallel-copilot.view/on-message";
import { ServerPostMessageManager } from "./common/ipc/server-ipc";

let globalContext: vscode.ExtensionContext | null = null;
let parallelCopilotPanel: vscode.WebviewPanel | undefined;

function createOrShowParallelCopilotPanel(context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

    // If we already have a panel, show it.
    if (parallelCopilotPanel) {
        parallelCopilotPanel.reveal(column);
        return;
    }

    // Otherwise, create a new panel.
    parallelCopilotPanel = vscode.window.createWebviewPanel(
        VIEW_TYPES.PANEL.PARALLEL_COPILOT, // Identifies the type of the webview. Used internally
        'DCE Parallel Co-Pilot', // Title of the panel displayed to the user
        column || vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
            enableScripts: true,
            localResourceRoots: [context.extensionUri],
        }
    );
    
    const scriptUri = parallelCopilotPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "parallelCopilotView.js")).toString();
    const nonce = getNonce();
    parallelCopilotPanel.webview.html = getViewHtml({ webview: parallelCopilotPanel.webview, nonce, scriptUri });
    
    const serverIpc = ServerPostMessageManager.getInstance(
        parallelCopilotPanel.webview.onDidReceiveMessage,
        (data: any) => parallelCopilotPanel?.webview.postMessage(data)
    );

    serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT] = serverIpc;
    onParallelCopilotMessage(serverIpc);


    // Reset when the panel is closed
    parallelCopilotPanel.onDidDispose(
        () => {
            parallelCopilotPanel = undefined;
        },
        null,
        context.subscriptions
    );
}


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
        // Register the command to show the panel
        context.subscriptions.push(vscode.commands.registerCommand('dce.showParallelCopilot', () => {
            createOrShowParallelCopilotPanel(context);
        }));
        Services.loggerService.log('[extension.activate] Commands registered successfully.');
    } catch (error: any) {
        Services.loggerService.error(`[extension.activate] CRITICAL - Error registering commands: ${error.message}`);
    }

    try {
        Services.loggerService.log('[extension.activate] Registering views...');
        registerViews(context);
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