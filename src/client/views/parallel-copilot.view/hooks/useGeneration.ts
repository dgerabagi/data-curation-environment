// src/client/views/parallel-copilot.view/hooks/useGeneration.ts
// Updated on: C115 (Use responseCount prop)
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { GenerationProgress } from '@/common/ipc/channels.type';
import { ConnectionMode } from '@/backend/services/settings.service';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';

export const useGeneration = (
    currentCycle: PcppCycle | null,
    getCurrentCycleData: () => PcppCycle | null,
    isReadyForNextCycle: boolean,
    newCycleButtonDisabledReason: string,
    setTabs: React.Dispatch<React.SetStateAction<{ [key: string]: PcppResponse }>>,
    setSaveStatus: (status: 'unsaved' | 'saving' | 'saved') => void,
    responseCount: number // Use prop
) => {
    const [connectionMode, setConnectionMode] = React.useState<ConnectionMode>('manual');
    const [generationProgress, setGenerationProgress] = React.useState<GenerationProgress[]>([]);
    const [tps, setTps] = React.useState(0);
    const [isGenerationComplete, setIsGenerationComplete] = React.useState(false);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const handleGenerateResponses = React.useCallback(() => {
        const cycleData = getCurrentCycleData();
        if (cycleData) {
            clientIpc.sendToServer(ClientToServerChannel.RequestNewCycleAndGenerate, { cycleData, count: responseCount });
        }
    }, [clientIpc, getCurrentCycleData, responseCount]);
    
    const handleStartGeneration = React.useCallback((projectScope: string, count: number) => {
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialArtifactsAndGeneration, { projectScope, responseCount: count });
    }, [clientIpc]);

    const handleRegenerateTab = React.useCallback((responseId: number) => {
        if (currentCycle === null) return;
        const tabId = responseId.toString();
        setTabs(prev => {
            const newTabs = { ...prev };
            newTabs[tabId] = { ...newTabs[tabId], content: '', parsedContent: null, status: 'generating' };
            return newTabs;
        });
        clientIpc.sendToServer(ClientToServerChannel.RequestSingleRegeneration, { cycleId: currentCycle.cycleId, tabId });
        setSaveStatus('unsaved');
        setIsGenerationComplete(false);
    }, [clientIpc, currentCycle, setTabs, setSaveStatus]);

    const handleStopGeneration = React.useCallback((cycleId: number, responseId: number) => {
        // Optimistic UI update for immediate feedback
        setGenerationProgress(prev => {
            const newProgress = [...prev];
            const index = newProgress.findIndex(p => p.responseId === responseId);
            if (index !== -1 && newProgress[index].status !== 'stopped') {
                newProgress[index] = { ...newProgress[index], status: 'stopped' };
            }
            return newProgress;
        });
        // Send message to backend to perform the actual stop
        clientIpc.sendToServer(ClientToServerChannel.RequestStopGeneration, { cycleId, responseId });
    }, [clientIpc, setGenerationProgress]);

    const isGenerateResponsesDisabled = React.useMemo(() => {
        if (currentCycle?.cycleId === 0) return true;
        return !isReadyForNextCycle;
    }, [currentCycle, isReadyForNextCycle]);

    return {
        connectionMode,
        setConnectionMode,
        generationProgress,
        setGenerationProgress,
        tps,
        setTps,
        isGenerationComplete,
        setIsGenerationComplete,
        handleGenerateResponses,
        handleStartGeneration,
        handleRegenerateTab,
        handleStopGeneration,
        isGenerateResponsesDisabled,
        newCycleButtonDisabledReason,
    };
};