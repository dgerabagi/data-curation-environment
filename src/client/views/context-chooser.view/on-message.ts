import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;
    const loggerService = Services.loggerService;
    const selectionService = Services.selectionService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, (data) => {
        loggerService.log(`Received RequestWorkspaceFiles from client (force=${data.force}).`);
        fsService.handleWorkspaceFilesRequest(serverIpc, data.force);
    });

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

    serverIpc.onClientMessage(ClientToServerChannel.RequestOpenFile, (data) => {
        fsService.handleOpenFileRequest(data.path);
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveCurrentSelection, (data) => {
        selectionService.saveCurrentSelection(data.paths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestLastSelection, () => {
        loggerService.log('Received RequestLastSelection from client.');
        const lastSelection = selectionService.getLastSelection();
        const autoAddState = selectionService.getAutoAddState();
        loggerService.log(`Found ${lastSelection.length} paths in last selection to restore.`);
        serverIpc.sendToClient(ServerToClientChannel.ApplySelectionSet, { paths: lastSelection });
        
        const sets = selectionService.getSelectionSets();
        serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets });
        serverIpc.sendToClient(ServerToClientChannel.SendAutoAddState, { enabled: autoAddState });
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveAutoAddState, (data) => {
        selectionService.saveAutoAddState(data.enabled);
    });

    serverIpc.onClientMessage(ClientToServerChannel.VSCodeCommand, (data) => {
        const { command, args = [] } = data;
        vscode.commands.executeCommand(command, ...args);
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