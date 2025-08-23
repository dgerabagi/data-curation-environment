export enum ClientToServerChannel {
    RequestInitialData = "clientToServer.requestInitialData",
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    LogMessage = "clientToServer.logMessage",

    // File Operations
    RequestNewFile = "clientToServer.requestNewFile",
    RequestNewFolder = "clientToServer.requestNewFolder",
    RequestFileRename = "clientToServer.requestFileRename",
    RequestFileDelete = "clientToServer.requestFileDelete",
    RequestBatchFileDelete = "clientToServer.requestBatchFileDelete",
    RequestRevealInExplorer = "clientToServer.requestRevealInExplorer",
    RequestCopyPath = "clientToServer.requestCopyPath",
    RequestOpenFile = "clientToServer.requestOpenFile",
    RequestMoveFile = "clientToServer.requestMoveFile",
    RequestCopyFile = "clientToServer.requestCopyFile",
    RequestUndo = "clientToServer.requestUndo",
    RequestRedo = "clientToServer.requestRedo",
    RequestAddFileFromBuffer = "clientToServer.requestAddFileFromBuffer",
    RequestCopyFileFromUri = "clientToServer.requestCopyFileFromUri",
    RequestFileContent = "clientToServer.requestFileContent",

    // Special File Handling
    RequestPdfToText = "clientToServer.requestPdfToText",
    RequestExcelToText = "clientToServer.requestExcelToText",
    RequestWordToText = "clientToServer.requestWordToText",

    // Selection Persistence
    SaveCurrentSelection = "clientToServer.saveCurrentSelection",
    RequestLastSelection = "clientToServer.requestLastSelection",
    SaveAutoAddState = "clientToServer.saveAutoAddState",

    // VS Code Command Proxy
    VSCodeCommand = "clientToServer.vscodeCommand",

    // Phase 2: PCPP
    RequestCreatePromptFile = "clientToServer.requestCreatePromptFile",
    RequestFileExistence = "clientToServer.requestFileExistence",
    RequestSyntaxHighlight = "clientToServer.requestSyntaxHighlight",
    RequestLatestCycleData = "clientToServer.requestLatestCycleData",
    RequestCycleData = "clientToServer.requestCycleData",
    SaveCycleData = "clientToServer.saveCycleData",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
    SendWorkspaceTrustState = "serverToClient.sendWorkspaceTrustState",
    ApplySelectionSet = "serverToClient.applySelectionSet",
    SendSelectionSets = "serverToClient.sendSelectionSets",
    ForceRefresh = "serverToClient.forceRefresh",
    SetActiveFile = "serverToClient.setActiveFile",
    FocusFile = "serverToClient.focusFile",
    SendAutoAddState = "serverToClient.sendAutoAddState",
    UpdateProblemCounts = "serverToClient.updateProblemCounts",
    UpdateNodeStats = "serverToClient.updateNodeStats",
    SendFileContent = "serverToClient.sendFileContent",
    
    // Phase 2: PCPP
    SendFileExistence = "serverToClient.sendFileExistence",
    SendSyntaxHighlight = "serverToClient.sendSyntaxHighlight",
    SendLatestCycleData = "serverToClient.sendLatestCycleData",
    SendCycleData = "serverToClient.sendCycleData",
}