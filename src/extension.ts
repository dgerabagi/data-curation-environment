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
    const column = vscode.window.activeTextEditor?.viewColumn;

    if (parallelCopilotPanel) {
        parallelCopilotPanel.reveal(column);
        return;
    }

    parallelCopilotPanel = vscode.window.createWebviewPanel(
        VIEW_TYPES.PANEL.PARALLEL_COPILOT,
        'DCE Parallel Co-Pilot',
        column || vscode.ViewColumn.One,
        {
            enableScripts: true,
            localResourceRoots: [context.extensionUri],
        }
    );
    
    const scriptUri = parallelCopilotPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "parallelCopilotView.js"));
    const styleUri = parallelCopilotPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "parallelCopilotView.css"));
    const starryNightStyleUri = parallelCopilotPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "starry-night.css"));
    const nonce = getNonce();
    
    parallelCopilotPanel.webview.html = getViewHtml({
        webview: parallelCopilotPanel.webview,
        nonce,
        scriptUri: scriptUri.toString(),
        styleUris: [styleUri, starryNightStyleUri],
    });
    
    const serverIpc = ServerPostMessageManager.getInstance(
        parallelCopilotPanel.webview.onDidReceiveMessage,
        (data: any) => parallelCopilotPanel?.webview.postMessage(data)
    );

    serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT] = serverIpc;
    onParallelCopilotMessage(serverIpc);

    parallelCopilotPanel.onDidDispose(() => {
        parallelCopilotPanel = undefined;
    }, null, context.subscriptions);
}

export async function activate(context: vscode.ExtensionContext) {
    Services.loggerService.log('Congratulations, your extension "Data Curation Environment" is now active!');
    globalContext = context;

    let gitApi: GitAPI | undefined;
    try {
        const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');
        if (gitExtension) {
            await gitExtension.activate();
            gitApi = gitExtension.exports.getAPI(1);
        }
    } catch (error) {
        Services.loggerService.error(`Failed to get Git API: ${error}`);
    }

    try {
        Services.initialize(context, gitApi); // Pass the full context
        registerCommands(context);
        context.subscriptions.push(vscode.commands.registerCommand('dce.showParallelCopilot', () => {
            createOrShowParallelCopilotPanel(context);
        }));
        registerViews(context);

        // Auto-open PCPP on first load
        const isFresh = (await Services.historyService.getLatestCycle()).cycleId === 0;
        if (isFresh && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            Services.loggerService.log("Fresh environment, automatically opening Parallel Co-Pilot Panel.");
            vscode.commands.executeCommand('dce.showParallelCopilot');
        }

    } catch (error: any) {
        Services.loggerService.error(`CRITICAL - Error during activation: ${error.message}`);
        vscode.window.showErrorMessage("Data Curation Environment failed to activate.");
        return;
    }
    
    const updateActiveFile = () => {
        let fileUri: vscode.Uri | undefined;
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor?.document.uri.scheme === 'file') {
            fileUri = activeEditor.document.uri;
        } else {
            const tabInput = vscode.window.tabGroups.activeTabGroup.activeTab?.input as { uri?: vscode.Uri };
            if (tabInput?.uri?.scheme === 'file') fileUri = tabInput.uri;
        }

        if (fileUri) {
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                serverIpc.sendToClient(ServerToClientChannel.SetActiveFile, { path: fileUri.fsPath.replace(/\\/g, '/') });
            }
        }
    };

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateActiveFile),
        vscode.window.tabGroups.onDidChangeTabs(updateActiveFile),
        vscode.workspace.onDidGrantWorkspaceTrust(() => {
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceTrustState, { isTrusted: true });
        })
    );

    setTimeout(updateActiveFile, 500);
}

export function getContext() {
    if (!globalContext) throw new Error("Extension context not available.");
    return globalContext;
}

export function deactivate() {}