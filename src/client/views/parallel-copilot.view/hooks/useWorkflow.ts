// src/client/views/parallel-copilot.view/hooks/useWorkflow.ts
// Updated on: C136 (Add cycleId dependency and auto-reset logic)
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
    cycleId: number // C136: Add cycleId to props
) => {
    const [workflowStep, setWorkflowStep] = React.useState<string | null>(initialWorkflowStep);

    // C136: Reset workflow step when cycle changes
    React.useEffect(() => {
        // If we are loading a cycle with a saved workflow step, honor it.
        // Otherwise, if it's a new or unstarted cycle (workflowStep is null/undefined),
        // we attempt to auto-initialize the starting step.
        if (initialWorkflowStep) {
            setWorkflowStep(initialWorkflowStep);
        } else if (cycleId > 0) {
             // For any cycle > 0 without a saved step, assume we are starting fresh.
             // If tabs are empty, we are likely waiting for paste.
             const firstTabContent = tabs['1']?.content;
             if (!firstTabContent) {
                 setWorkflowStep('awaitingResponsePaste_1');
             } else {
                 // If content exists but no step saved, maybe we are parsing?
                 setWorkflowStep('awaitingParse');
             }
        } else if (cycleId === 0) {
            setWorkflowStep('awaitingProjectScope');
        }
    }, [cycleId, initialWorkflowStep]); // Only run when cycle ID or initial step changes (on load)

    React.useEffect(() => {
        if (workflowStep === null) return;
        
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
            // Wait for isReadyForNextCycle to kick in
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