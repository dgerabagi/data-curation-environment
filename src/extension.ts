import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    // For debugging the activation process itself
    console.log('DCE Extension: Activating...');

    globalContext = context;

    try {
        Services.initialize();
        console.log('DCE Extension: Services initialized.');
    } catch (error) {
        console.error('DCE Extension: Error initializing services.', error);
        vscode.window.showErrorMessage("Data Curation Environment failed to initialize services.");
        return;
    }
    
    try {
        registerCommands(context);
        console.log('DCE Extension: Commands registered.');
    } catch (error) {
        console.error('DCE Extension: Error registering commands.', error);
    }

    try {
        registerViews(context);
        console.log('DCE Extension: Views registered.');
    } catch (error) {
        console.error('DCE Extension: Error registering views.', error);
    }
    
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {
    console.log('DCE Extension: Deactivating.');
}