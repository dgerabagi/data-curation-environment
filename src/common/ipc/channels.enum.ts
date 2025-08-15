export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    OpenFolderDialog = "clientToServer.openFolderDialog",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
}