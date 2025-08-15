export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    OpenFolderDialog = "clientToServer.openFolderDialog",

    // Selection Sets
    RequestSelectionSets = "clientToServer.requestSelectionSets",
    LoadSelectionSet = "clientToServer.loadSelectionSet",
    RequestSaveSelectionSet = "clientToServer.requestSaveSelectionSet",
    RequestDeleteSelectionSet = "clientToServer.requestDeleteSelectionSet",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",

    // Selection Sets
    SendSelectionSets = "serverToClient.sendSelectionSets",
    ApplySelectionSet = "serverToClient.applySelectionSet",
}