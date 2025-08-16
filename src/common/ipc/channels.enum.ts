export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    RequestRefresh = "clientToServer.requestRefresh",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
    // C18: Re-added to fix TS errors in commands.ts for saved selection set functionality
    ApplySelectionSet = "serverToClient.applySelectionSet",
    SendSelectionSets = "serverToClient.sendSelectionSets",
}