import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;
    const loggerService = Services.loggerService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, (data) =>
        fsService.handleWorkspaceFilesRequest(serverIpc, data.force)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        flattenerService.flatten(data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFile, (data) => {
        fsService.handleNewFileRequest(data.parentDirectory);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFolder, (data) => {
        fsService.handleNewFolderRequest(data.parentDirectory);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileRename, (data) => {
        fsService.handleFileRenameRequest(data.oldPath, data.newName);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileDelete, (data) => {
        fsService.handleFileDeleteRequest(data.path);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestRevealInExplorer, (data) => {
        fsService.handleRevealInExplorerRequest(data.path);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyPath, (data) => {
        fsService.handleCopyPathRequest(data.path, data.relative);
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