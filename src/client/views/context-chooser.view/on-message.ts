import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;
    const loggerService = Services.loggerService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
        fsService.handleWorkspaceFilesRequest(serverIpc)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        flattenerService.flatten(data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestRefresh, () => {
        fsService.handleWorkspaceFilesRequest(serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.LogMessage, (data) => {
        const { level, message } = data;
        const logMessage = `[WebView] ${message}`;
        switch (level) {
            case 'warn':
                loggerService.warn(logMessage);
                break;
            case 'error':
                loggerService.error(logMessage);
                break;
            case 'info':
            default:
                loggerService.log(logMessage);
                break;
        }
    });
}