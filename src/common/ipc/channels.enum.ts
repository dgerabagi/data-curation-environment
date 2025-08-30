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
    RequestOpenFolder = "clientToServer.requestOpenFolder", // New in C166
    RequestFileContent = "clientToServer.requestFileContent",
    RequestMoveFile = "clientToServer.requestMoveFile",
    RequestCopyFile = "clientToServer.requestCopyFile",
    RequestUndo = "clientToServer.requestUndo",
    RequestRedo = "clientToServer.requestRedo",
    RequestAddFileFromBuffer = "clientToServer.requestAddFileFromBuffer",
    RequestCopyFileFromUri = "clientToServer.requestCopyFileFromUri",
    RequestBatchFileWrite = "clientToServer.requestBatchFileWrite",
    RequestCreateFile = "clientToServer.requestCreateFile",
    RequestCopyTextToClipboard = "clientToServer.requestCopyTextToClipboard",

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
    RequestCreateCycle0Prompt = "clientToServer.requestCreateCycle0Prompt",
    RequestFileExistence = "clientToServer.requestFileExistence",
    RequestSyntaxHighlight = "clientToServer.requestSyntaxHighlight",
    RequestLatestCycleData = "clientToServer.requestLatestCycleData",
    RequestCycleData = "clientToServer.requestCycleData",
    SaveCycleData = "clientToServer.saveCycleData",
    RequestDeleteCycle = "clientToServer.requestDeleteCycle",
    RequestResetHistory = "clientToServer.requestResetHistory",
    RequestLogState = "clientToServer.requestLogState",
    RequestFileComparison = "clientToServer.requestFileComparison",
    RequestExportHistory = "clientToServer.requestExportHistory",
    RequestImportHistory = "clientToServer.requestImportHistory",
    RequestHighlightContext = "clientToServer.requestHighlightContext",
    RequestPromptCostEstimation = "clientToServer.requestPromptCostEstimation",
    RequestPromptCostBreakdown = "clientToServer.requestPromptCostBreakdown",
    RequestGitBaseline = "clientToServer.requestGitBaseline",
    RequestGitRestore = "clientToServer.requestGitRestore",
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
    SendHighlightContext = "serverToClient.sendHighlightContext",
    SendLatestCycleData = "serverToClient.sendLatestCycleData",
    SendCycleData = "serverToClient.sendCycleData",
    FilesWritten = "serverToClient.filesWritten",
    SendFileComparison = "serverToClient.sendFileComparison", 
    SendPromptCostEstimation = "serverToClient.sendPromptCostEstimation",
    SendPromptCostBreakdown = "serverToClient.sendPromptCostBreakdown",
    NotifyGitOperationResult = "serverToClient.notifyGitOperationResult",
}