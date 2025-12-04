// src/client/views/parallel-copilot.view/hooks/useWorkflow.ts
// Updated on: C135 (Add hasGeneratedPrompt to logic)
import * as React from 'react';

export const useWorkflow = (
    initialWorkflowStep: string | null,
    isReadyForNextCycle: boolean,
    cycleTitle: string,
    cycleContext: string,
    selectedFilesForReplacement: Set<string>,
    selectedResponseId: string | null,
    isSortedByTokens: boolean,
    isParsedMode: boolean,
    tabs: any,
    tabCount: number,
    hasGeneratedPrompt: boolean
) => {
    const [workflowStep, setWorkflowStep] = React.useState<string | null>(initialWorkflowStep);

    React.useEffect(() => {
        if (workflowStep === null) return;
        
        if (isReadyForNextCycle) {
            setWorkflowStep('readyForNewCycle');
            return;
        }

        if (workflowStep === 'readyForNewCycle') {
            if (!isReadyForNextCycle) {
                // If no longer ready, go back to prompt generation step
                setWorkflowStep('awaitingGeneratePrompt');
            }
            return;
        }
        
        // C135: Highlight prompt generation if title/context are ready but prompt hasn't been generated yet
        if (workflowStep === 'awaitingGeneratePrompt') {
            if (hasGeneratedPrompt) {
                // Wait for isReadyForNextCycle to kick in (requires selected response)
            }
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