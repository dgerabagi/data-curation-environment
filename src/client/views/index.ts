import { viewConfig as contextChooserViewConfig } from "./context-chooser.view";
import { viewConfig as parallelCopilotViewConfig } from "./parallel-copilot.view"; // New
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [contextChooserViewConfig, parallelCopilotViewConfig]; // New
export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
    views.forEach((viewConfig) => {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(viewConfig.type, {
                resolveWebviewView: (webviewView) => {
                    webviewView.webview.options = {
                        enableScripts: true,
                        localResourceRoots: [context.extensionUri],
                    };
                    const nonce = getNonce();
                    webviewView.webview.html = getViewHtml({
                        webview: webviewView.webview,
                        nonce,
                        scriptUri: webviewView.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", viewConfig.entry)).toString(),
                    });
                    const serverIpc = ServerPostMessageManager.getInstance(
                        webviewView.webview.onDidReceiveMessage,
                        (data: any) => webviewView.webview.postMessage(data)
                    );
                    serverIPCs[viewConfig.type] = serverIpc;
                    viewConfig.handleMessage(serverIpc);
                },
            })
        );
    });
}