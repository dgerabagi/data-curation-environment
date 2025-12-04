// src/client/views/parallel-copilot.view/hooks/useWorkflow.ts
// Updated on: C134 (Reorder workflow: Select Files -> Baseline)
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
    tabCount: number
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
                setWorkflowStep('awaitingGeneratePrompt');
            }
            return;
        }
        
        if (workflowStep === 'awaitingGeneratePrompt') {
            // Handled by isReadyForNextCycle check above
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
                // C134: Reordered workflow. After selecting files, prompt to Baseline.
                setWorkflowStep('awaitingBaseline');
            }
            return;
        }
        if (workflowStep === 'awaitingResponseSelect') {
            if (selectedResponseId) {
                // C134: Reordered workflow. After selecting response, prompt to select files.
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
    }, [workflowStep, selectedFilesForReplacement, selectedResponseId, isSortedByTokens, isParsedMode, tabs, cycleContext, cycleTitle, tabCount, isReadyForNextCycle]);

    return {
        workflowStep,
        setWorkflowStep,
    };
};