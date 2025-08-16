export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    RequestRefresh = "clientToServer.requestRefresh",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
}