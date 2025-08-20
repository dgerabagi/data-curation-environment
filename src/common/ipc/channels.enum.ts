export enum ClientToServerChannel {
    RequestInitialData = "clientToServer.requestInitialData", // New
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
    RequestMoveFile = "clientToServer.requestMoveFile",
    RequestCopyFile = "clientToServer.requestCopyFile", // New
    RequestUndo = "clientToServer.requestUndo",
    RequestRedo = "clientToServer.requestRedo",
    RequestAddFileFromBuffer = "clientToServer.requestAddFileFromBuffer", // For OS drag-drop
    RequestCopyFileFromUri = "clientToServer.requestCopyFileFromUri", // For VS Code explorer drag-drop

    // Special File Handling
    RequestPdfToText = "clientToServer.requestPdfToText",
    RequestExcelToText = "clientToServer.requestExcelToText",

    // Selection Persistence
    SaveCurrentSelection = "clientToServer.saveCurrentSelection",
    RequestLastSelection = "clientToServer.requestLastSelection",
    SaveAutoAddState = "clientToServer.saveAutoAddState",

    // VS Code Command Proxy
    VSCodeCommand = "clientToServer.vscodeCommand",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
    SendWorkspaceTrustState = "serverToClient.sendWorkspaceTrustState", // New
    ApplySelectionSet = "serverToClient.applySelectionSet",
    SendSelectionSets = "serverToClient.sendSelectionSets",
    ForceRefresh = "serverToClient.forceRefresh", // Backend tells frontend to refresh
    SetActiveFile = "serverToClient.setActiveFile", // For active file sync
    FocusFile = "serverToClient.focusFile", // For auto-revealing a specific file
    SendAutoAddState = "serverToClient.sendAutoAddState",
    UpdateProblemCounts = "serverToClient.updateProblemCounts",
    UpdateNodeStats = "serverToClient.updateNodeStats", // For updating PDF token counts
}