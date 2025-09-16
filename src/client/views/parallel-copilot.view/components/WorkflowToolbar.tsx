// src/client/views/parallel-copilot.view/components/WorkflowToolbar.tsx
// New file in C19
import * as React from 'react';
import { VscWand, VscListOrdered, VscListUnordered, VscCheck, VscSourceControl, VscDiscard, VscCheckAll } from 'react-icons/vsc';

interface WorkflowToolbarProps {
    isParsedMode: boolean;
    onParseToggle: () => void;
    selectedResponseId: string | null;
    activeTab: number;
    onSelectResponse: () => void;
    onBaseline: () => void;
    onRestore: () => void;
    onAcceptSelected: () => void;
    selectedFilesForReplacementCount: number;
    workflowStep: string | null;
}

const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
    isParsedMode,
    onParseToggle,
    selectedResponseId,
    activeTab,
    onSelectResponse,
    onBaseline,
    onRestore,
    onAcceptSelected,
    selectedFilesForReplacementCount,
    workflowStep
}) => {
    if (!isParsedMode) {
        return (
            <div className="workflow-toolbar">
                <button
                    onClick={onParseToggle}
                    className={workflowStep === 'awaitingParse' ? 'workflow-highlight' : ''}
                    title={isParsedMode ? "Return to raw text view" : "Parse all responses into structured view"}
                >
                    <VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}
                </button>
            </div>
        );
    }

    return (
        <div className="workflow-toolbar">
            <button
                onClick={onParseToggle}
                className={workflowStep === 'awaitingParse' ? 'workflow-highlight' : ''}
                title={isParsedMode ? "Return to raw text view" : "Parse all responses into structured view"}
            >
                <VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}
            </button>
            <button
                onClick={onSelectResponse}
                className={`styled-button ${selectedResponseId === activeTab.toString() ? 'toggled' : ''} ${workflowStep === 'awaitingResponseSelect' ? 'workflow-highlight' : ''}`}
                title="Select this response as the basis for the next cycle"
            >
                <VscCheck /> {selectedResponseId === activeTab.toString() ? 'Response Selected' : 'Select This Response'}
            </button>
            <button
                onClick={onBaseline}
                className={`git-button ${workflowStep === 'awaitingBaseline' ? 'workflow-highlight' : ''}`}
                title="Create a git commit with all current changes as a safe restore point"
            >
                <VscSourceControl /> Baseline (Commit)
            </button>
            <button
                onClick={onRestore}
                className="git-button"
                title="Restore all files in the workspace to the last baseline commit"
            >
                <VscDiscard /> Restore Baseline
            </button>
            <button
                onClick={onAcceptSelected}
                className={`styled-button ${workflowStep === 'awaitingAccept' ? 'workflow-highlight' : ''}`}
                disabled={selectedFilesForReplacementCount === 0}
                title="Accept checked files from this response into your workspace"
            >
                <VscCheckAll /> Accept Selected ({selectedFilesForReplacementCount})
            </button>
        </div>
    );
};

export default WorkflowToolbar;