// src/common/ipc/channels.type.ts
// Updated on: C133 (Update RequestCreatePromptFile payload)
import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { PcppCycle, PcppResponse } from "@/common/types/pcpp.types";
import { DceSettings } from "@/backend/services/settings.service";

export type SelectionSet = { [name: string]: string[] };
export type ProblemCountsMap = { [path: string]: { error: number; warning: number; } };
export type GitStatusMap = { [path: string]: string };
export type BatchWriteFile = { path: string; content: string };

export interface ComparisonMetrics {
    originalTokens: number;
    modifiedTokens: number;
    similarity: number;
}

export interface GenerationProgress {
    responseId: number;
    currentTokens: number;
    totalTokens: number;
    promptTokens: number;
    thinkingTokens: number;
    status: 'pending' | 'thinking' | 'generating' | 'complete' | 'error' | 'stopped';
    startTime: number;
    thinkingStartTime?: number;
    generationStartTime?: number;
}


export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestInitialData ? {} :
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? { force?: boolean } :
    T extends ClientToServerChannel.LogMessage ? { level: 'info' | 'warn' | 'error', message: string } :
    T extends ClientToServerChannel.RequestNewFile ? { parentDirectory: string } :
    T extends ClientToServerChannel.RequestNewFolder ? { parentDirectory: string } :
    T extends ClientToServerChannel.RequestFileRename ? { oldPath: string, newName: string } :
    T extends ClientToServerChannel.RequestFileDelete ? { path: string } :
    T extends ClientToServerChannel.RequestBatchFileDelete ? { paths: string[] } :
    T extends ClientToServerChannel.RequestRevealInExplorer ? { path: string } :
    T extends ClientToServerChannel.RequestCopyPath ? { path: string, relative: boolean } :
    T extends ClientToServerChannel.RequestOpenFile ? { path: string } :
    T extends ClientToServerChannel.RequestOpenFolder ? {} :
    T extends ClientToServerChannel.RequestFileContent ? { path: string } :
    T extends ClientToServerChannel.RequestMoveFile ? { oldPath: string, newPath: string } :
    T extends ClientToServerChannel.RequestCopyFile ? { sourcePath: string, destinationDir: string } :
    T extends ClientToServerChannel.RequestUndo ? {} :
    T extends ClientToServerChannel.RequestRedo ? {} :
    T extends ClientToServerChannel.RequestAddFileFromBuffer ? { targetPath: string, data: Uint8Array } :
    T extends ClientToServerChannel.RequestCopyFileFromUri ? { sourceUri: string, targetDir: string } :
    T extends ClientToServerChannel.RequestBatchFileWrite ? { files: BatchWriteFile[] } :
    T extends ClientToServerChannel.RequestCreateFile ? { filePath: string } :
    T extends ClientToServerChannel.RequestCopyTextToClipboard ? { text: string } :
    T extends ClientToServerChannel.RequestShowInformationMessage ? { message: string } :
    T extends ClientToServerChannel.RequestReadmeContent ? {} :
    T extends ClientToServerChannel.RequestChangelogContent ? {} :
    T extends ClientToServerChannel.RequestNativeDiff ? { originalPath: string; modifiedContent: string; title: string; } :
    T extends ClientToServerChannel.RequestPdfToText ? { path: string } :
    T extends ClientToServerChannel.RequestExcelToText ? { path: string } :
    T extends ClientToServerChannel.RequestWordToText ? { path: string } :
    T extends ClientToServerChannel.SaveCurrentSelection ? { paths: string[] } :
    T extends ClientToServerChannel.RequestLastSelection ? {} :
    T extends ClientToServerChannel.SaveAutoAddState ? { enabled: boolean } :
    T extends ClientToServerChannel.VSCodeCommand ? { command: string, args?: any[] } :
    T extends ClientToServerChannel.RequestCreatePromptFile ? { cycleData: PcppCycle } :
    T extends ClientToServerChannel.RequestBatchGeneration ? { cycleData: PcppCycle, count: number } :
    T extends ClientToServerChannel.RequestNewCycleAndGenerate ? { cycleData: PcppCycle, count: number } :
    T extends ClientToServerChannel.RequestInitialArtifactsAndGeneration ? { projectScope: string, responseCount: number } :
    T extends ClientToServerChannel.RequestRegenerateResponses ? { cycleData: PcppCycle, tabsToRegenerate: number[] } :
    T extends ClientToServerChannel.RequestFileExistence ? { paths: string[] } :
    T extends ClientToServerChannel.RequestSyntaxHighlight ? { code: string; lang: string, id: string } :
    T extends ClientToServerChannel.RequestHighlightContext ? { context: string; id: string } :
    T extends ClientToServerChannel.RequestInitialCycleData ? {} :
    T extends ClientToServerChannel.RequestCycleData ? { cycleId: number } :
    T extends ClientToServerChannel.SaveCycleData ? { cycleData: PcppCycle } :
    T extends ClientToServerChannel.RequestDeleteCycle ? { cycleId: number; } :
    T extends ClientToServerChannel.RequestResetHistory ? {} :
    T extends ClientToServerChannel.RequestLogState ? { currentState: PcppCycle, costState: { totalPromptTokens: number, estimatedPromptCost: number, costBreakdown: any } } :
    T extends ClientToServerChannel.RequestFileComparison ? { filePath: string; modifiedContent: string; tabId: string } :
    T extends ClientToServerChannel.RequestExportHistory ? {} :
    T extends ClientToServerChannel.RequestImportHistory ? {} :
    T extends ClientToServerChannel.RequestPromptCostEstimation ? { cycleData: PcppCycle } :
    T extends ClientToServerChannel.RequestPromptCostBreakdown ? { cycleData: PcppCycle } :
    T extends ClientToServerChannel.RequestGitBaseline ? { commitMessage: string } :
    T extends ClientToServerChannel.RequestGitRestore ? { filesToDelete: string[] } :
    T extends ClientToServerChannel.RequestGitStatus ? {} :
    T extends ClientToServerChannel.SaveLastViewedCycle ? { cycleId: number | null } :
    T extends ClientToServerChannel.RequestSettings ? {} :
    T extends ClientToServerChannel.SaveSettings ? { settings: DceSettings } :
    T extends ClientToServerChannel.RequestStopGeneration ? { cycleId: number; responseId: number; } :
    T extends ClientToServerChannel.RequestSingleRegeneration ? { cycleId: number, tabId: string } :
    T extends ClientToServerChannel.RequestMarkdownPreview ? { filePath: string } :
    
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    T extends ServerToClientChannel.SendWorkspaceTrustState ? { isTrusted: boolean } :
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    T extends ServerToClientChannel.ForceRefresh ? { reason?: 'fileOp' | 'manual' | 'history' } :
    T extends ServerToClientChannel.SetActiveFile ? { path: string } :
    T extends ServerToClientChannel.FocusFile ? { path: string } :
    T extends ServerToClientChannel.SendAutoAddState ? { enabled: boolean } :
    T extends ServerToClientChannel.UpdateProblemCounts ? { problemMap: ProblemCountsMap } :
    T extends ServerToClientChannel.UpdateDecorations ? { problemMap: ProblemCountsMap, gitStatusMap: GitStatusMap } :
    T extends ServerToClientChannel.UpdateNodeStats ? { path: string, tokenCount: number, error?: string } :
    T extends ServerToClientChannel.SendFileContent ? { path: string, content: string | null } :
    T extends ServerToClientChannel.SendReadmeContent ? { content: string } :
    T extends ServerToClientChannel.SendChangelogContent ? { content: string } :
    T extends ServerToClientChannel.AutoAddNewFile ? { path: string } :
    T extends ServerToClientChannel.SendFileExistence ? { existenceMap: { [path: string]: boolean } } :
    T extends ServerToClientChannel.SendSyntaxHighlight ? { highlightedHtml: string, id: string } :
    T extends ServerToClientChannel.SendHighlightContext ? { highlightedHtml: string, id: string } :
    T extends ServerToClientChannel.SendInitialCycleData ? { cycleData: PcppCycle; projectScope?: string; } :
    T extends ServerToClientChannel.SendCycleData ? { cycleData: PcppCycle | null, projectScope?: string; } :
    T extends ServerToClientChannel.FilesWritten ? { paths: string[] } :
    T extends ServerToClientChannel.SendFileComparison ? { filePath: string; tabId: string } & ComparisonMetrics :
    T extends ServerToClientChannel.SendPromptCostEstimation ? { totalTokens: number; estimatedCost: number; breakdown: { [key: string]: number } } :
    T extends ServerToClientChannel.NotifyGitOperationResult ? { success: boolean; message: string; } :
    T extends ServerToClientChannel.SendGitStatus ? { isClean: boolean } :
    T extends ServerToClientChannel.NotifySaveComplete ? { cycleId: number } :
    T extends ServerToClientChannel.SendSettings ? { settings: DceSettings } :
    T extends ServerToClientChannel.SendBatchGenerationResult ? { responses: string[], newCycleId: number } :
    T extends ServerToClientChannel.SendBatchGenerationComplete ? { newCycleId: number; newMaxCycle: number; } :
    T extends ServerToClientChannel.UpdateGenerationProgress ? { progress: GenerationProgress[], tps: number, chunks: { [responseId: number]: string } } :
    T extends ServerToClientChannel.UpdateSingleGenerationProgress ? { progress: GenerationProgress; content: string; } :
    T extends ServerToClientChannel.StartGenerationUI ? { newCycleId: number, newMaxCycle: number } : // DEPRECATED
    T extends ServerToClientChannel.NavigateToNewGeneratingCycle ? { newCycleData: PcppCycle, newMaxCycle: number } :
    T extends ServerToClientChannel.NotifySingleResponseComplete ? { responseId: number; content: string; } :
    never;