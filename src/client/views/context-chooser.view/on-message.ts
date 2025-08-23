// Updated on: C115 (Ensure file reflects correct service calls)
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { fileTreeService, fileOperationService, contentExtractionService, flattenerService, selectionService, actionService, loggerService } = Services;

    serverIpc.onClientMessage(ClientToServerChannel.RequestInitialData, () => {
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceTrustState, { isTrusted: vscode.workspace.isTrusted });
        fileTreeService.handleWorkspaceFilesRequest(serverIpc, false);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, (data) => fileTreeService.handleWorkspaceFilesRequest(serverIpc, data.force));
    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => flattenerService.flatten(data.selectedPaths));
    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFile, (data) => fileOperationService.handleNewFileRequest(data.parentDirectory));
    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFolder, (data) => fileOperationService.handleNewFolderRequest(data.parentDirectory));
    serverIpc.onClientMessage(ClientToServerChannel.RequestFileRename, (data) => fileOperationService.handleFileRenameRequest(data.oldPath, data.newName));
    serverIpc.onClientMessage(ClientToServerChannel.RequestFileDelete, (data) => fileOperationService.handleFileDeleteRequest(data.path));
    serverIpc.onClientMessage(ClientToServerChannel.RequestBatchFileDelete, (data) => fileOperationService.handleBatchFileDeleteRequest(data.paths));
    serverIpc.onClientMessage(ClientToServerChannel.RequestRevealInExplorer, (data) => fileOperationService.handleRevealInExplorerRequest(data.path));
    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyPath, (data) => fileOperationService.handleCopyPathRequest(data.path, data.relative));
    serverIpc.onClientMessage(ClientToServerChannel.RequestOpenFile, (data) => fileOperationService.handleOpenFileRequest(data.path));
    serverIpc.onClientMessage(ClientToServerChannel.RequestMoveFile, (data) => fileOperationService.handleMoveFileRequest(data.oldPath, data.newPath));
    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyFile, (data) => fileOperationService.handleCopyFileRequest(data.sourcePath, data.destinationDir));
    serverIpc.onClientMessage(ClientToServerChannel.RequestAddFileFromBuffer, (data) => fileOperationService.handleAddFileFromBuffer(data.targetPath, data.data));
    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyFileFromUri, (data) => fileOperationService.handleCopyFileFromUri(data.sourceUri, data.targetDir));
    serverIpc.onClientMessage(ClientToServerChannel.RequestPdfToText, (data) => contentExtractionService.handlePdfToTextRequest(data.path, serverIpc));
    serverIpc.onClientMessage(ClientToServerChannel.RequestExcelToText, (data) => contentExtractionService.handleExcelToTextRequest(data.path, serverIpc));
    serverIpc.onClientMessage(ClientToServerChannel.RequestWordToText, (data) => contentExtractionService.handleWordToTextRequest(data.path, serverIpc));
    serverIpc.onClientMessage(ClientToServerChannel.RequestUndo, () => actionService.undo());
    serverIpc.onClientMessage(ClientToServerChannel.RequestRedo, () => actionService.redo());
    serverIpc.onClientMessage(ClientToServerChannel.SaveCurrentSelection, (data) => selectionService.saveCurrentSelection(data.paths));

    serverIpc.onClientMessage(ClientToServerChannel.RequestLastSelection, async () => {
        const lastSelection = await selectionService.getLastSelection();
        const autoAddState = selectionService.getAutoAddState();
        serverIpc.sendToClient(ServerToClientChannel.ApplySelectionSet, { paths: lastSelection });
        serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: selectionService.getSelectionSets() });
        serverIpc.sendToClient(ServerToClientChannel.SendAutoAddState, { enabled: autoAddState });
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveAutoAddState, (data) => selectionService.saveAutoAddState(data.enabled));
    serverIpc.onClientMessage(ClientToServerChannel.VSCodeCommand, (data) => vscode.commands.executeCommand(data.command, ...(data.args || [])));

    serverIpc.onClientMessage(ClientToServerChannel.LogMessage, (data) => {
        const logMessage = `[WebView] ${data.message}`;
        if (data.level === 'warn') loggerService.warn(logMessage);
        else if (data.level === 'error') loggerService.error(logMessage);
        else loggerService.log(logMessage);
    });
}