import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;

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
}