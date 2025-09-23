// Updated on: C49 (Add handler for new onboarding channel)
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { loggerService, promptService, fileOperationService, highlightingService, historyService, gitService, actionService, llmService, settingsService } = Services;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestCreatePromptFile, (data) => {
        promptService.generatePromptFile(data.cycleTitle, data.currentCycle);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestBatchGeneration, async (data) => {
        loggerService.log(`Received RequestBatchGeneration for ${data.count} responses from cycle ${data.cycleData.cycleId}.`);
        const prompt = await promptService.generatePromptString(data.cycleData);
        const responses = await llmService.generateBatch(prompt, data.count, data.cycleData);
        const { newCycleId, newMaxCycle } = await historyService.createNewCycleWithResponses(responses, data.cycleData.tabCount || 4);
        serverIpc.sendToClient(ServerToClientChannel.SendBatchGenerationComplete, { newCycleId, newMaxCycle });
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestInitialArtifactsAndGeneration, (data) => {
        promptService.generateInitialArtifactsAndResponses(data.projectScope, data.responseCount, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestSettings, async () => {
        const settings = await settingsService.getSettings();
        serverIpc.sendToClient(ServerToClientChannel.SendSettings, { settings });
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.SaveSettings, (data) => {
        settingsService.saveSettings(data.settings);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileExistence, (data) => {
        fileOperationService.handleFileExistenceRequest(data.paths, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestSyntaxHighlight, (data) => {
        highlightingService.handleSyntaxHighlightRequest(data.code, data.lang, data.id, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestHighlightContext, (data) => {
        highlightingService.handleHighlightContextRequest(data.context, data.id, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestInitialCycleData, async () => {
        loggerService.log("[PCPP on-message] Received RequestInitialCycleData from client.");
        const historyFile = await historyService.getFullHistory();
        const initialCycle = await historyService.getInitialCycle();
        serverIpc.sendToClient(ServerToClientChannel.SendInitialCycleData, { cycleData: initialCycle, projectScope: historyFile.projectScope });
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCycleData, async (data) => {
        const historyFile = await historyService.getFullHistory();
        const cycleData = await historyService.getCycleData(data.cycleId);
        serverIpc.sendToClient(ServerToClientChannel.SendCycleData, { cycleData, projectScope: historyFile.projectScope });
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveCycleData, (data) => {
        historyService.saveCycleData(data.cycleData);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestFileContent, (data) => {
        fileOperationService.handleFileContentRequest(data.path, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestDeleteCycle, async (data) => {
        const newMaxCycle = await historyService.deleteCycle(data.cycleId);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestResetHistory, () => {
        historyService.resetHistory();
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestBatchFileWrite, async (data: { files: { path: string, content: string }[] }) => {
        const writtenPaths = await fileOperationService.handleBatchFileWrite(data.files);
        if (writtenPaths.length > 0) {
            serverIpc.sendToClient(ServerToClientChannel.FilesWritten, { paths: writtenPaths });
        }
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestLogState, (data) => {
        promptService.generateStateLog(data.currentState, data.costState, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileComparison, (data) => {
        fileOperationService.handleFileComparisonRequest(data.filePath, data.modifiedContent, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyTextToClipboard, (data) => {
        fileOperationService.handleCopyTextToClipboardRequest(data.text);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestExportHistory, () => {
        historyService.handleExportHistory();
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestImportHistory, () => {
        historyService.handleImportHistory();
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestOpenFolder, () => {
        fileOperationService.handleOpenFolderRequest();
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestPromptCostBreakdown, (data) => {
        promptService.handlePromptCostBreakdownRequest(data.cycleData, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestGitBaseline, async (data) => {
        await gitService.handleGitBaselineRequest(data.commitMessage, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestGitRestore, async (data) => {
        await gitService.handleGitRestoreRequest(data.filesToDelete, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestGitStatus, () => {
        gitService.handleGitStatusRequest(serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestShowInformationMessage, (data) => {
        fileOperationService.handleShowInformationMessageRequest(data.message);
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveLastViewedCycle, (data) => {
        historyService.saveLastViewedCycleId(data.cycleId);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestUndo, () => actionService.undo());
    serverIpc.onClientMessage(ClientToServerChannel.RequestRedo, () => actionService.redo());
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestNativeDiff, (data) => {
        fileOperationService.handleNativeDiffRequest(data.originalPath, data.modifiedContent, data.title);
    });
}