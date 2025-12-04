// src/client/views/parallel-copilot.view/hooks/usePcppIpc.ts
// Updated on: C131 (Add cost handler and workflow advance on file write)
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ServerToClientChannel, ClientToServerChannel } from '@/common/ipc/channels.enum';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import { logger } from '@/client/utils/logger';
import { useCycleManagement } from './useCycleManagement';
import { useTabManagement } from './useTabManagement';
import { useFileManagement } from './useFileManagement';
import { useGeneration } from './useGeneration';
import { GenerationProgress } from '@/common/ipc/channels.type';

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
            // C131: Advance workflow step when files are accepted
            setWorkflowStep(prev => prev === 'awaitingAccept' ? 'awaitingCycleContext' : prev);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendFileComparison, (metrics) => {
            const key = `${metrics.tabId}:::${metrics.filePath}`;
            fileManagement.setComparisonMetrics(prev => new Map(prev).set(key, metrics));
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendPromptCostEstimation, ({ totalTokens, estimatedCost, breakdown }) => {
            // C131: Update cost state
            cycleManagement.setTotalTokens(totalTokens);
            cycleManagement.setEstimatedCost(estimatedCost);
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
            cycleManagement.loadCycleData(newCycleData);
            tabManagement.resetAndLoadTabs(newCycleData.responses);

            const initialProgress: GenerationProgress[] = Object.keys(newCycleData.responses).map(key => {
                const responseId = parseInt(key, 10);
                return {
                    responseId,
                    status: 'pending',
                    promptTokens: 0,
                    thinkingTokens: 0,
                    currentTokens: 0,
                    totalTokens: 16384,
                    startTime: Date.now()
                };
            });
            generationManagement.setGenerationProgress(initialProgress);
            
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

        clientIpc.onServerMessage(ServerToClientChannel.UpdateSingleGenerationProgress, ({ progress, content }) => {
            generationManagement.setGenerationProgress(prev => {
                const newProgress = [...prev];
                const index = newProgress.findIndex(p => p.responseId === progress.responseId);
                if (index !== -1) {
                    newProgress[index] = progress;
                } else {
                    newProgress.push(progress);
                    newProgress.sort((a, b) => a.responseId - b.responseId);
                }

                let totalTokens = 0;
                let earliestStartTime = Infinity;
                
                newProgress.forEach(p => {
                    if (p.status !== 'complete' && p.status !== 'error' && p.status !== 'stopped') {
                        if (p.startTime < earliestStartTime) {
                            earliestStartTime = p.startTime;
                        }
                    }
                    totalTokens += p.thinkingTokens + p.currentTokens;
                });

                if (earliestStartTime !== Infinity) {
                    const elapsedSeconds = (Date.now() - earliestStartTime) / 1000;
                    if (elapsedSeconds > 0) {
                        const currentTps = Math.round(totalTokens / elapsedSeconds);
                        generationManagement.setTps(currentTps);
                    }
                }

                return newProgress;
            });

            tabManagement.setTabs(prev => {
                const newTabs = { ...prev };
                const tabId = progress.responseId.toString();
                const existingTab = newTabs[tabId] || { content: '', status: 'pending' };
                newTabs[tabId] = {
                    ...existingTab,
                    content: content,
                    status: progress.status,
                };
                return newTabs;
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