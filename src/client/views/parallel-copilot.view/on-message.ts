// Updated on: C1 (Remove HighlightContext handler)
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { loggerService, promptService, fileOperationService, highlightingService, historyService, gitService } = Services;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestCreatePromptFile, (data) => {
        promptService.generatePromptFile(data.cycleTitle, data.currentCycle);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCreateCycle0Prompt, (data) => {
        promptService.generateCycle0Prompt(data.projectScope, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileExistence, (data) => {
        fileOperationService.handleFileExistenceRequest(data.paths, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestSyntaxHighlight, (data) => {
        highlightingService.handleSyntaxHighlightRequest(data.code, data.lang, data.id, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestLatestCycleData, async () => {
        const historyFile = await historyService.getFullHistory();
        const latestCycle = await historyService.getLatestCycle();
        serverIpc.sendToClient(ServerToClientChannel.SendLatestCycleData, { cycleData: latestCycle, projectScope: historyFile.projectScope });
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
        // C180: This response is now handled on the frontend via ForceRefresh
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestResetHistory, () => {
        historyService.resetHistory();
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestBatchFileWrite, async (data) => {
        const writtenPaths = await fileOperationService.handleBatchFileWrite(data.files);
        if (writtenPaths.length > 0) {
            serverIpc.sendToClient(ServerToClientChannel.FilesWritten, { paths: writtenPaths });
        }
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestLogState, (data) => {
        promptService.generateStateLog(data.currentState);
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

    serverIpc.onClientMessage(ClientToServerChannel.RequestGitRestore, async () => {
        await gitService.handleGitRestoreRequest(serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestGitStatus, () => {
        gitService.handleGitStatusRequest(serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestShowInformationMessage, (data) => {
        fileOperationService.handleShowInformationMessageRequest(data.message);
    });
}