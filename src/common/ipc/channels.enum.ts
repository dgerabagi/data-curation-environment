export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    LogMessage = "clientToServer.logMessage", // For logging from webview

    // File Operations
    RequestNewFile = "clientToServer.requestNewFile",
    RequestNewFolder = "clientToServer.requestNewFolder",
    RequestFileRename = "clientToServer.requestFileRename",
    RequestFileDelete = "clientToServer.requestFileDelete",
    RequestRevealInExplorer = "clientToServer.requestRevealInExplorer",
    RequestCopyPath = "clientToServer.requestCopyPath",
    RequestOpenFile = "clientToServer.requestOpenFile",
    RequestMoveFile = "clientToServer.requestMoveFile", // New for Drag and Drop

    // Selection Persistence
    SaveCurrentSelection = "clientToServer.saveCurrentSelection",
    RequestLastSelection = "clientToServer.requestLastSelection",
    SaveAutoAddState = "clientToServer.saveAutoAddState",

    // VS Code Command Proxy
    VSCodeCommand = "clientToServer.vscodeCommand",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
    ApplySelectionSet = "serverToClient.applySelectionSet",
    SendSelectionSets = "serverToClient.sendSelectionSets",
    ForceRefresh = "serverToClient.forceRefresh", // Backend tells frontend to refresh
    SetActiveFile = "serverToClient.setActiveFile", // For active file sync
    FocusFile = "serverToClient.focusFile", // For auto-revealing a specific file
    SendAutoAddState = "serverToClient.sendAutoAddState",
    UpdateProblemCounts = "serverToClient.updateProblemCounts", // New for dynamic updates
}