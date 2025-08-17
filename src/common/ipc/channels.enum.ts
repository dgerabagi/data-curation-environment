export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    RequestRefresh = "clientToServer.requestRefresh",
    LogMessage = "clientToServer.logMessage", // For logging from webview

    // File Operations
    RequestNewFile = "clientToServer.requestNewFile",
    RequestNewFolder = "clientToServer.requestNewFolder",
    RequestFileRename = "clientToServer.requestFileRename",
    RequestFileDelete = "clientToServer.requestFileDelete",
    RequestRevealInExplorer = "clientToServer.requestRevealInExplorer",
    RequestCopyPath = "clientToServer.requestCopyPath",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
    ApplySelectionSet = "serverToClient.applySelectionSet",
    SendSelectionSets = "serverToClient.sendSelectionSets",
    ForceRefresh = "serverToClient.forceRefresh", // Backend tells frontend to refresh
}