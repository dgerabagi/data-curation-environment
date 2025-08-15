import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
    globalContext = context;

    Services.initialize();
    registerCommands(context);
    registerViews(context);
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {}