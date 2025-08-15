import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";
import { VIEW_TYPES } from "@/common/view-types";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;
    const selectionService = Services.selectionService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
        fsService.handleWorkspaceFilesRequest(serverIpc)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        console.log("Flattening context for paths:", data.selectedPaths);
        flattenerService.flatten(data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.OpenFolderDialog, () => {
        vscode.commands.executeCommand('workbench.action.files.openFolder');
    });

    // --- Selection Sets Handlers ---

    serverIpc.onClientMessage(ClientToServerChannel.RequestSelectionSets, () => {
        const sets = selectionService.getSelectionSets();
        serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets });
    });

    serverIpc.onClientMessage(ClientToServerChannel.LoadSelectionSet, (data) => {
        vscode.commands.executeCommand('dce.loadSelectionSet', data.name);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestSaveSelectionSet, (data) => {
        vscode.commands.executeCommand('dce.saveSelectionSet', data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestDeleteSelectionSet, () => {
        vscode.commands.executeCommand('dce.deleteSelectionSet');
    });
}