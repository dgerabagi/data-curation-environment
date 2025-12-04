// src/client/views/parallel-copilot.view/hooks/useWorkflow.ts
// Updated on: C131 (Improve sort step logic)
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
        if (workflowStep === 'readyForNewCycle') return;
        if (workflowStep === 'awaitingGeneratePrompt') {
            if (isReadyForNextCycle) setWorkflowStep('awaitingGeneratePrompt');
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
            // This is handled by IPC message FilesWritten
            return;
        }
        if (workflowStep === 'awaitingBaseline') {
            // Logic handled by IPC hook (SendGitStatus / NotifyGitOperationResult)
            return;
        }
        if (workflowStep === 'awaitingFileSelect') {
            if (selectedFilesForReplacement.size > 0) {
                setWorkflowStep('awaitingAccept');
            }
            return;
        }
        if (workflowStep === 'awaitingResponseSelect') {
            if (selectedResponseId) {
                setWorkflowStep('awaitingBaseline');
            }
            return;
        }
        if (workflowStep === 'awaitingSort') {
            // C131: If user selects a response, assume they skipped sort and move to baseline
            if (selectedResponseId) {
                setWorkflowStep('awaitingBaseline');
                return;
            }
            if (isSortedByTokens) {
                setWorkflowStep('awaitingResponseSelect');
            }
            return;
        }
        if (workflowStep === 'awaitingParse') {
            if (isParsedMode) {
                // C131: Default to awaitingSort, but if already sorted or selected, logic above handles it
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