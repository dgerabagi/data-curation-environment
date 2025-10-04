// src/client/views/parallel-copilot.view/hooks/usePcppIpc.ts
// Updated on: C98 (Fix TabState to PcppResponse refactor)
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ServerToClientChannel, ClientToServerChannel } from '@/common/ipc/channels.enum';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import { GenerationProgress } from '@/common/ipc/channels.type';
import { ConnectionMode } from '@/backend/services/settings.service';
import { parseResponse } from '@/client/utils/response-parser';
import { logger } from '@/client/utils/logger';

export const usePcppIpc = (
    loadCycleData: (cycleData: PcppCycle, scope?: string) => void,
    setHighlightedCodeBlocks: React.Dispatch<React.SetStateAction<Map<string, string>>>,
    setFileExistenceMap: React.Dispatch<React.SetStateAction<Map<string, boolean>>>,
    setComparisonMetrics: React.Dispatch<React.SetStateAction<Map<string, any>>>,
    setTotalPromptTokens: React.Dispatch<React.SetStateAction<number>>,
    setEstimatedPromptCost: React.Dispatch<React.SetStateAction<number>>,
    setCostBreakdown: React.Dispatch<React.SetStateAction<any>>,
    setWorkflowStep: React.Dispatch<React.SetStateAction<string | null>>,
    setSaveStatus: React.Dispatch<React.SetStateAction<"saved" | "saving" | "unsaved">>,
    setConnectionMode: React.Dispatch<React.SetStateAction<ConnectionMode>>,
    setGenerationProgress: React.Dispatch<React.SetStateAction<GenerationProgress[]>>,
    setTps: React.Dispatch<React.SetStateAction<number>>,
    setTabs: React.Dispatch<React.SetStateAction<{ [key: string]: PcppResponse }>>,
    setIsGenerationComplete: React.Dispatch<React.SetStateAction<boolean>>,
    setMaxCycle: React.Dispatch<React.SetStateAction<number>>,
    currentCycleId: number | null
) => {
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestSettings, {});
    }, [clientIpc]);

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData, ({ cycleData, projectScope }: { cycleData: PcppCycle, projectScope: string }) => {
            loadCycleData(cycleData, projectScope);
            setMaxCycle(cycleData.cycleId);
            if (cycleData.cycleId === 0) setWorkflowStep('awaitingProjectScope');
            else if (cycleData.cycleId === 1 && !cycleData.cycleContext) setWorkflowStep('awaitingResponsePaste_1');
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData, projectScope }) => {
            if (cycleData) loadCycleData(cycleData, projectScope);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => {
            setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml));
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            setFileExistenceMap(new Map(Object.entries(existenceMap)));
        });

        clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => {
            if (reason === 'history') clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
        });

        clientIpc.onServerMessage(ServerToClientChannel.FilesWritten, ({ paths }) => {
            setFileExistenceMap(prevMap => {
                const newMap = new Map(prevMap);
                paths.forEach(p => newMap.set(p, true));
                return newMap;
            });
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendFileComparison, (metrics) => {
            setComparisonMetrics(prev => new Map(prev).set(metrics.filePath, metrics));
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendPromptCostEstimation, ({ totalTokens, estimatedCost, breakdown }) => {
            setTotalPromptTokens(totalTokens);
            setEstimatedPromptCost(estimatedCost);
            setCostBreakdown(breakdown);
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
                setSaveStatus('saved');
            }
            else if (cycleId === currentCycleId) {
                setSaveStatus('saved');
            }
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendSettings, ({ settings }) => {
            setConnectionMode(settings.connectionMode);
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.NavigateToNewGeneratingCycle, ({ newCycleData, newMaxCycle }) => {
            logger.log(`[NavigateToNewGeneratingCycle] Received: newCycleId=${newCycleData.cycleId}`);
            setMaxCycle(newMaxCycle);
            loadCycleData(newCycleData);
            clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: newCycleData.cycleId });
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateGenerationProgress, ({ progress, tps, chunks }) => {
            setGenerationProgress(progress);
            setTps(tps);
            setTabs(prevTabs => {
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
            setGenerationProgress(prev => {
                const newProgress = [...prev];
                const index = newProgress.findIndex(p => p.responseId === progress.responseId);
                if (index !== -1) {
                    newProgress[index] = progress;
                }
                return newProgress;
            });
        });

        clientIpc.onServerMessage(ServerToClientChannel.NotifySingleResponseComplete, ({ responseId, content }) => {
            setTabs(prev => {
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
            setIsGenerationComplete(true);
            // The navigation is now handled by NavigateToNewGeneratingCycle, this just finalizes state.
        });

    }, [
        clientIpc, loadCycleData, setHighlightedCodeBlocks, setFileExistenceMap, 
        setComparisonMetrics, setTotalPromptTokens, setEstimatedPromptCost, 
        setCostBreakdown, setWorkflowStep, setSaveStatus, setConnectionMode, 
        currentCycleId, setMaxCycle, setGenerationProgress, setTps, setTabs, setIsGenerationComplete
    ]);
};