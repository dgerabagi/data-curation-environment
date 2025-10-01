// src/client/views/parallel-copilot.view/hooks/usePcppIpc.ts
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ServerToClientChannel, ClientToServerChannel } from '@/common/ipc/channels.enum';
import { PcppCycle } from '@/common/types/pcpp.types';

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
    setConnectionMode: React.Dispatch<React.SetStateAction<any>>,
    setGenerationProgress: React.Dispatch<React.SetStateAction<any[]>>,
    setTps: React.Dispatch<React.SetStateAction<number>>,
    setTabs: React.Dispatch<React.SetStateAction<any>>,
    setIsGenerationComplete: React.Dispatch<React.SetStateAction<boolean>>,
    setMaxCycle: React.Dispatch<React.SetStateAction<number>>,
    handleCycleChange: (e: React.MouseEvent | null, newCycleId: number) => void,
    currentCycleId: number | null
) => {
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        // This effect runs only once on mount to fetch initial data.
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestSettings, {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientIpc]);

    React.useEffect(() => {
        // This effect registers all the message listeners.
        // It will re-register them if any of the handler functions change.
        // The handlers are now stabilized with useCallback, so this should run infrequently.
        
        clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData, ({ cycleData, projectScope }) => {
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
            // C94 Fix: Handle cycle 0 unconditionally to prevent race condition on initial load.
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

    }, [
        clientIpc, loadCycleData, setHighlightedCodeBlocks, setFileExistenceMap, 
        setComparisonMetrics, setTotalPromptTokens, setEstimatedPromptCost, 
        setCostBreakdown, setWorkflowStep, setSaveStatus, setConnectionMode, 
        currentCycleId, setMaxCycle
    ]);
};