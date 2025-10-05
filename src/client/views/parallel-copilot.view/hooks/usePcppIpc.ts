// src/client/views/parallel-copilot.view/hooks/usePcppIpc.ts
// Updated on: C102 (Refactor to use management objects and fix UI refresh)
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ServerToClientChannel, ClientToServerChannel } from '@/common/ipc/channels.enum';
import { PcppCycle } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import { logger } from '@/client/utils/logger';
import { useCycleManagement } from './useCycleManagement';
import { useTabManagement } from './useTabManagement';
import { useFileManagement } from './useFileManagement';
import { useGeneration } from './useGeneration';

type CycleManagementHook = ReturnType<typeof useCycleManagement>;
type TabManagementHook = ReturnType<typeof useTabManagement>;
type FileManagementHook = ReturnType<typeof useFileManagement>;
type GenerationManagementHook = ReturnType<typeof useGeneration>;

export const usePcppIpc = (
    cycleManagement: CycleManagementHook,
    tabManagement: TabManagementHook,
    fileManagement: FileManagementHook,
    generationManagement: GenerationManagementHook,
    setWorkflowStep: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestSettings, {});
    }, [clientIpc]);

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData, ({ cycleData, projectScope }: { cycleData: PcppCycle, projectScope: string }) => {
            cycleManagement.loadCycleData(cycleData, projectScope);
            cycleManagement.setMaxCycle(cycleData.cycleId);
            if (cycleData.cycleId === 0) setWorkflowStep('awaitingProjectScope');
            else if (cycleData.cycleId === 1 && !cycleData.cycleContext) setWorkflowStep('awaitingResponsePaste_1');
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData, projectScope }) => {
            if (cycleData) cycleManagement.loadCycleData(cycleData, projectScope);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => {
            fileManagement.setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml));
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            fileManagement.setFileExistenceMap(new Map(Object.entries(existenceMap)));
        });

        clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => {
            if (reason === 'history') clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
        });

        clientIpc.onServerMessage(ServerToClientChannel.FilesWritten, ({ paths }) => {
            fileManagement.setFileExistenceMap(prevMap => {
                const newMap = new Map(prevMap);
                paths.forEach(p => newMap.set(p, true));
                return newMap;
            });
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendFileComparison, (metrics) => {
            fileManagement.setComparisonMetrics(prev => new Map(prev).set(metrics.filePath, metrics));
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendPromptCostEstimation, ({ totalTokens, estimatedCost, breakdown }) => {
            // Placeholder for cost state update
        });

        clientIpc.onServerMessage(ServerToClientChannel.NotifyGitOperationResult, (result) => {
            if (result.success) {
                setWorkflowStep(prevStep => {
                    if (prevStep === 'awaitingBaseline') {
                        clientIpc.sendToServer(ClientToServerChannel.RequestShowInformationMessage, { message: result.message });
                        return 'awaitingFileSelect';
                    }
                    return prevStep;
                });
            }
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.SendGitStatus, ({ isClean }) => {
            setWorkflowStep(prev => (isClean && prev === 'awaitingBaseline') ? 'awaitingFileSelect' : prev);
        });

        clientIpc.onServerMessage(ServerToClientChannel.NotifySaveComplete, ({ cycleId }) => {
            if (cycleId === 0) {
                cycleManagement.setSaveStatus('saved');
            }
            else if (cycleId === cycleManagement.currentCycle?.cycleId) {
                cycleManagement.setSaveStatus('saved');
            }
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendSettings, ({ settings }) => {
            generationManagement.setConnectionMode(settings.connectionMode);
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.NavigateToNewGeneratingCycle, ({ newCycleData, newMaxCycle }) => {
            logger.log(`[IPC] Received NavigateToNewGeneratingCycle for C${newCycleData.cycleId}. Updating state atomically.`);
            cycleManagement.setMaxCycle(newMaxCycle);
            // Call both setters to ensure state is updated together
            cycleManagement.loadCycleData(newCycleData);
            tabManagement.resetAndLoadTabs(newCycleData.responses);
            clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: newCycleData.cycleId });
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateGenerationProgress, ({ progress, tps, chunks }) => {
            generationManagement.setGenerationProgress(progress);
            generationManagement.setTps(tps);
            tabManagement.setTabs(prevTabs => {
                const newTabs = { ...prevTabs };
                Object.entries(chunks).forEach(([responseId, chunk]) => {
                    const tabIndex = parseInt(responseId, 10);
                    const existingTab = newTabs[tabIndex] || { content: '', status: 'generating' };
                    newTabs[tabIndex] = { ...existingTab, content: chunk };
                });
                return newTabs;
            });
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateSingleGenerationProgress, ({ progress }) => {
            generationManagement.setGenerationProgress(prev => {
                const newProgress = [...prev];
                const index = newProgress.findIndex(p => p.responseId === progress.responseId);
                if (index !== -1) {
                    newProgress[index] = progress;
                }
                return newProgress;
            });
        });

        clientIpc.onServerMessage(ServerToClientChannel.NotifySingleResponseComplete, ({ responseId, content }) => {
            tabManagement.setTabs(prev => {
                const newTabs = { ...prev };
                const tabId = responseId.toString();
                const tab = newTabs[tabId];
                if (tab) {
                    tab.content = content;
                    tab.parsedContent = parseResponse(content);
                    tab.status = 'complete';
                }
                return newTabs;
            });
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendBatchGenerationComplete, ({ newCycleId, newMaxCycle }) => {
            generationManagement.setIsGenerationComplete(true);
        });

    }, [
        clientIpc, 
        cycleManagement, 
        tabManagement, 
        fileManagement, 
        generationManagement, 
        setWorkflowStep
    ]);
};