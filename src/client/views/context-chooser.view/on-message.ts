// Updated on: C166 (Add RequestOpenFolder handler)
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";
import * as vscode from 'vscode';

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { 
        fileTreeService, 
        flattenerService, 
        selectionService, 
        loggerService, 
        actionService,
        contentExtractionService,
        fileOperationService
    } = Services;

    loggerService.log("Context Chooser view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestInitialData, () => {
        loggerService.log("[on-message] Received RequestInitialData. Forwarding to services.");
        fileTreeService.handleWorkspaceFilesRequest(serverIpc);
        serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: selectionService.getSelectionSets() });
        serverIpc.sendToClient(ServerToClientChannel.SendAutoAddState, { enabled: selectionService.getAutoAddState() });
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, (data) => {
        loggerService.log(`[C161 DEBUG] IPC received RequestWorkspaceFiles. force=${data.force}`);
        fileTreeService.handleWorkspaceFilesRequest(serverIpc, data.force);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        flattenerService.flatten(data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.LogMessage, (data) => {
        loggerService[data.level](`[WebView] ${data.message}`);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.SaveCurrentSelection, (data) => {
        selectionService.saveCurrentSelection(data.paths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestLastSelection, async () => {
        const paths = await selectionService.getLastSelection();
        serverIpc.sendToClient(ServerToClientChannel.ApplySelectionSet, { paths });
    });

    serverIpc.onClientMessage(ClientToServerChannel.VSCodeCommand, (data) => {
        vscode.commands.executeCommand(data.command, ...(data.args || []));
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveAutoAddState, (data) => {
        selectionService.saveAutoAddState(data.enabled);
    });

    // File Operations
    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFile, (data) => fileOperationService.handleNewFileRequest(data.parentDirectory));
    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFolder, (data) => fileOperationService.handleNewFolderRequest(data.parentDirectory));
    serverIpc.onClientMessage(ClientToServerChannel.RequestFileRename, (data) => fileOperationService.handleFileRenameRequest(data.oldPath, data.newName));
    serverIpc.onClientMessage(ClientToServerChannel.RequestFileDelete, (data) => fileOperationService.handleFileDeleteRequest(data.path));
    serverIpc.onClientMessage(ClientToServerChannel.RequestBatchFileDelete, (data) => fileOperationService.handleBatchFileDeleteRequest(data.paths));
    serverIpc.onClientMessage(ClientToServerChannel.RequestRevealInExplorer, (data) => fileOperationService.handleRevealInExplorerRequest(data.path));
    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyPath, (data) => fileOperationService.handleCopyPathRequest(data.path, data.relative));
    serverIpc.onClientMessage(ClientToServerChannel.RequestOpenFile, (data) => fileOperationService.handleOpenFileRequest(data.path));
    serverIpc.onClientMessage(ClientToServerChannel.RequestOpenFolder, () => fileOperationService.handleOpenFolderRequest());
    serverIpc.onClientMessage(ClientToServerChannel.RequestMoveFile, (data) => fileOperationService.handleMoveFileRequest(data.oldPath, data.newPath));
    serverIpc.onClientMessage(ClientToServerChannel.RequestUndo, () => actionService.undo());
    serverIpc.onClientMessage(ClientToServerChannel.RequestRedo, () => actionService.redo());
    serverIpc.onClientMessage(ClientToServerChannel.RequestAddFileFromBuffer, (data) => fileOperationService.handleAddFileFromBuffer(data.targetPath, data.data));
    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyFile, (data) => fileOperationService.handleCopyFileRequest(data.sourcePath, data.destinationDir));
    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyFileFromUri, (data) => fileOperationService.handleCopyFileFromUri(data.sourceUri, data.targetDir));
    
    // Content Extraction
    serverIpc.onClientMessage(ClientToServerChannel.RequestPdfToText, (data) => contentExtractionService.handlePdfToTextRequest(data.path, serverIpc));
    serverIpc.onClientMessage(ClientToServerChannel.RequestExcelToText, (data) => contentExtractionService.handleExcelToTextRequest(data.path, serverIpc));
    serverIpc.onClientMessage(ClientToServerChannel.RequestWordToText, (data) => contentExtractionService.handleWordToTextRequest(data.path, serverIpc));
}