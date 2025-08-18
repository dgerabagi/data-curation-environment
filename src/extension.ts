import * as vscode from "vscode";
import { registerViews, serverIPCs } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";
import { VIEW_TYPES } from "./common/view-types";
import { ServerToClientChannel } from "./common/ipc/channels.enum";
import { API as GitAPI, GitExtension } from "./backend/types/git";

let globalContext: vscode.ExtensionContext | null = null;

export async function activate(context: vscode.ExtensionContext) {
    // For debugging the activation process itself
    console.log('DCE Extension: Activating...');
    Services.loggerService.log('Congratulations, your extension "Data Curation Environment" is now active!');

    globalContext = context;

    let gitApi: GitAPI | undefined;
    try {
        const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');
        if (gitExtension) {
            await gitExtension.activate(); // Ensure the extension is active
            gitApi = gitExtension.exports.getAPI(1);
            Services.loggerService.log('Git API successfully retrieved.');
        } else {
            Services.loggerService.warn('vscode.git extension not found.');
        }
    } catch (error) {
        Services.loggerService.error(`Failed to get Git API: ${error}`);
        console.error('DCE Extension: Failed to get Git API.', error);
    }

    try {
        Services.initialize(gitApi);
    } catch (error) {
        console.error('DCE Extension: CRITICAL - Error initializing services.', error);
        Services.loggerService.error(`CRITICAL - Error initializing services: ${error}`);
        vscode.window.showErrorMessage("Data Curation Environment failed to initialize services. Check the debug console.");
        return;
    }
    
    try {
        registerCommands(context);
    } catch (error) {
        console.error('DCE Extension: CRITICAL - Error registering commands.', error);
        Services.loggerService.error(`CRITICAL - Error registering commands: ${error}`);
        vscode.window.showErrorMessage("Data Curation Environment failed to register commands. Check the debug console.");
    }

    try {
        registerViews(context);
    } catch (error) {
        console.error('DCE Extension: CRITICAL - Error registering views.', error);
        Services.loggerService.error(`CRITICAL - Error registering views: ${error}`);
         vscode.window.showErrorMessage("Data Curation Environment failed to register views. Check the debug console.");
    }
    
    // Feature: Active File Sync
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor && editor.document.uri.scheme === 'file') { // Ensure it's a file URI
                const filePath = editor.document.uri.fsPath.replace(/\\/g, '/'); // Normalize path immediately
                const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                if (serverIpc) {
                    Services.loggerService.log(`Active editor changed: ${filePath}. Notifying view.`);
                    serverIpc.sendToClient(ServerToClientChannel.SetActiveFile, { path: filePath });
                }
            }
        })
    );
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {
    Services.loggerService.log('DCE Extension: Deactivating.');
    console.log('DCE Extension: Deactivating.');
}