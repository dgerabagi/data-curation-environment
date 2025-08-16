import * as vscode from "vscode";
import { commands } from "./commands";
import { Services } from "../services/services";

export function registerCommands(context: vscode.ExtensionContext) {
    Services.loggerService.log(`Registering ${commands.length} commands.`);
    commands.forEach(({ commandId, callback }) => {
        let disposable = vscode.commands.registerCommand(commandId, callback);
        context.subscriptions.push(disposable);
    });
}