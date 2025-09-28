// src/common/ipc/channels.enum.ts
// Updated on: C77 (Add NotifySingleResponseComplete channel)
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
    RequestOpenFolder = "clientToServer.requestOpenFolder", 
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
    RequestShowInformationMessage = "clientToServer.requestShowInformationMessage",
    RequestReadmeContent = "clientToServer.requestReadmeContent",
    RequestChangelogContent = "clientToServer.requestChangelogContent",
    RequestNativeDiff = "clientToServer.requestNativeDiff",

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
    RequestBatchGeneration = "clientToServer.requestBatchGeneration", // Legacy, to be phased out
    RequestNewCycleAndGenerate = "clientToServer.requestNewCycleAndGenerate", // New
    RequestInitialArtifactsAndGeneration = "clientToServer.requestInitialArtifactsAndGeneration",
    RequestRegenerateResponses = "clientToServer.requestRegenerateResponses",
    RequestFileExistence = "clientToServer.requestFileExistence",
    RequestSyntaxHighlight = "clientToServer.requestSyntaxHighlight",
    RequestHighlightContext = "clientToServer.requestHighlightContext", 
    RequestInitialCycleData = "clientToServer.requestInitialCycleData",
    RequestCycleData = "clientToServer.requestCycleData",
    SaveCycleData = "clientToServer.saveCycleData",
    RequestDeleteCycle = "clientToServer.requestDeleteCycle",
    RequestResetHistory = "clientToServer.requestResetHistory",
    RequestLogState = "clientToServer.requestLogState",
    RequestFileComparison = "clientToServer.requestFileComparison",
    RequestExportHistory = "clientToServer.requestExportHistory",
    RequestImportHistory = "clientToServer.requestImportHistory",
    RequestPromptCostEstimation = "clientToServer.requestPromptCostEstimation",
    RequestPromptCostBreakdown = "clientToServer.requestPromptCostBreakdown",
    RequestGitBaseline = "clientToServer.requestGitBaseline",
    RequestGitRestore = "clientToServer.requestGitRestore",
    RequestGitStatus = "clientToServer.requestGitStatus",
    SaveLastViewedCycle = "clientToServer.saveLastViewedCycle",
    RequestSettings = "clientToServer.requestSettings",
    SaveSettings = "clientToServer.saveSettings",
    RequestStopGeneration = "clientToServer.requestStopGeneration",
    RequestSingleRegeneration = "clientToServer.requestSingleRegeneration",
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
    UpdateDecorations = "serverToClient.updateDecorations", 
    UpdateNodeStats = "serverToClient.updateNodeStats",
    SendFileContent = "serverToClient.sendFileContent",
    SendReadmeContent = "serverToClient.sendReadmeContent",
    SendChangelogContent = "serverToClient.sendChangelogContent",
    AutoAddNewFile = "serverToClient.autoAddNewFile",
    
    // Phase 2: PCPP
    SendFileExistence = "serverToClient.sendFileExistence",
    SendSyntaxHighlight = "serverToClient.sendSyntaxHighlight",
    SendHighlightContext = "serverToClient.sendHighlightContext", 
    SendInitialCycleData = "serverToClient.sendInitialCycleData",
    SendCycleData = "serverToClient.sendCycleData",
    FilesWritten = "serverToClient.filesWritten",
    SendFileComparison = "serverToClient.sendFileComparison", 
    SendPromptCostEstimation = "serverToClient.sendPromptCostEstimation",
    SendPromptCostBreakdown = "serverToClient.sendPromptCostBreakdown",
    NotifyGitOperationResult = "serverToClient.notifyGitOperationResult",
    SendGitStatus = "serverToClient.sendGitStatus",
    NotifySaveComplete = "serverToClient.notifySaveComplete",
    SendSettings = "serverToClient.sendSettings",
    SendBatchGenerationResult = "serverToClient.sendBatchGenerationResult",
    SendBatchGenerationComplete = "serverToClient.sendBatchGenerationComplete",
    UpdateGenerationProgress = "serverToClient.updateGenerationProgress",
    StartGenerationUI = "serverToClient.startGenerationUI",
    NotifySingleResponseComplete = "serverToClient.notifySingleResponseComplete", // New
}