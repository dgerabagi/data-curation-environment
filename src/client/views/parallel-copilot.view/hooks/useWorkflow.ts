// src/client/views/parallel-copilot.view/hooks/useWorkflow.ts
// Updated on: C138 (Add hasGeneratedPrompt check)
import * as React from 'react';
import { PcppResponse } from '@/common/types/pcpp.types';

export const useWorkflow = (
    initialWorkflowStep: string | null,
    isReadyForNextCycle: boolean,
    cycleTitle: string,
    cycleContext: string,
    selectedFilesForReplacement: Set<string>,
    selectedResponseId: string | null,
    isSortedByTokens: boolean,
    isParsedMode: boolean,
    tabs: { [key: string]: PcppResponse },
    tabCount: number,
    hasGeneratedPrompt: boolean,
    cycleId: number
) => {
    const [workflowStep, setWorkflowStep] = React.useState<string | null>(initialWorkflowStep);

    React.useEffect(() => {
        if (initialWorkflowStep) {
            setWorkflowStep(initialWorkflowStep);
        } else if (cycleId > 0) {
             const firstTabContent = tabs['1']?.content;
             if (!firstTabContent) {
                 setWorkflowStep('awaitingResponsePaste_1');
             } else {
                 setWorkflowStep('awaitingParse');
             }
        } else if (cycleId === 0) {
            setWorkflowStep('awaitingProjectScope');
        }
    }, [cycleId, initialWorkflowStep]);

    React.useEffect(() => {
        if (workflowStep === null) return;
        
        // C138: If the prompt is generated and all data is present, jump to the final step.
        // This overrides any "fallback" logic that might be triggered by a stale state.
        if (isReadyForNextCycle) {
            setWorkflowStep('readyForNewCycle');
            return;
        }

        if (workflowStep === 'readyForNewCycle') {
            if (!isReadyForNextCycle) {
                setWorkflowStep('awaitingGeneratePrompt');
            }
            return;
        }
        
        if (workflowStep === 'awaitingGeneratePrompt') {
            return;
        }

        if (workflowStep === 'awaitingCycleTitle') {
            if (cycleTitle.trim() && cycleTitle.trim() !== 'New Cycle') {
                setWorkflowStep('awaitingGeneratePrompt');
            }
            return;
        }
        if (workflowStep === 'awaitingCycleContext') {
            if (cycleContext.trim()) {
                setWorkflowStep('awaitingCycleTitle');
            }
            return;
        }
        if (workflowStep === 'awaitingAccept') {
            return;
        }
        if (workflowStep === 'awaitingBaseline') {
            return;
        }
        if (workflowStep === 'awaitingFileSelect') {
            if (selectedFilesForReplacement.size > 0) {
                setWorkflowStep('awaitingBaseline');
            }
            return;
        }
        if (workflowStep === 'awaitingResponseSelect') {
            if (selectedResponseId) {
                setWorkflowStep('awaitingFileSelect');
            }
            return;
        }
        if (workflowStep === 'awaitingSort') {
            if (selectedResponseId) {
                setWorkflowStep('awaitingFileSelect');
                return;
            }
            if (isSortedByTokens) {
                setWorkflowStep('awaitingResponseSelect');
            }
            return;
        }
        if (workflowStep === 'awaitingParse') {
            if (isParsedMode) {
                setWorkflowStep(isSortedByTokens ? 'awaitingResponseSelect' : 'awaitingSort');
            }
            return;
        }
        const waitingForPaste = workflowStep?.startsWith('awaitingResponsePaste');
        if (waitingForPaste) {
            for (let i = 1; i <= tabCount; i++) {
                if (!tabs[i.toString()]?.content?.trim()) {
                    setWorkflowStep(`awaitingResponsePaste_${i}`);
                    return;
                }
            }
            setWorkflowStep('awaitingParse');
        }
    }, [workflowStep, selectedFilesForReplacement, selectedResponseId, isSortedByTokens, isParsedMode, tabs, cycleContext, cycleTitle, tabCount, isReadyForNextCycle, hasGeneratedPrompt]);

    return {
        workflowStep,
        setWorkflowStep,
    };
};