// src/client/views/parallel-copilot.view/components/WorkflowToolbar.tsx
// New in C19
import * as React from 'react';
import { VscWand, VscListOrdered, VscListUnordered, VscSourceControl, VscDiscard, VscSave, VscCheckAll } from 'react-icons/vsc';

interface WorkflowToolbarProps {
    isParsedMode: boolean;
    onParseToggle: () => void;
    isSortedByTokens: boolean;
    onSortToggle: () => void;
    onSelectResponse: () => void;
    selectedResponseId: string | null;
    activeTab: number;
    onBaseline: () => void;
    onRestore: () => void;
    onAcceptSelected: () => void;
    selectedFilesForReplacementCount: number;
    workflowStep: string | null;
}

const WorkflowToolbar: React.FC<WorkflowToolbarProps> = (props) => {
    return (
        <div className="workflow-toolbar">
            <button 
                onClick={props.onParseToggle} 
                className={`${props.isParsedMode ? 'active' : ''} ${props.workflowStep === 'awaitingParse' ? 'workflow-highlight' : ''}`}
            >
                <VscWand /> {props.isParsedMode ? 'Un-Parse All' : 'Parse All'}
            </button>
            <button
                onClick={props.onSortToggle}
                className={`${props.isSortedByTokens ? 'active' : ''} ${props.workflowStep === 'awaitingSort' ? 'workflow-highlight' : ''}`}
                title="Sort responses by token count"
                disabled={!props.isParsedMode}
            >
                {props.isSortedByTokens ? <VscListOrdered /> : <VscListUnordered />} Sort
            </button>
            <button 
                className={`styled-button ${props.selectedResponseId === props.activeTab.toString() ? 'toggled' : ''} ${props.workflowStep === 'awaitingResponseSelect' ? 'workflow-highlight' : ''}`} 
                onClick={props.onSelectResponse}
                disabled={!props.isParsedMode}
            >
                {props.selectedResponseId === props.activeTab.toString() ? 'Response Selected' : 'Select This Response'}
            </button>
            <button 
                onClick={props.onBaseline} 
                title="Baseline (Commit)"
                className={`git-button ${props.workflowStep === 'awaitingBaseline' ? 'workflow-highlight' : ''}`}
                disabled={!props.isParsedMode}
            >
                <VscSourceControl /> Baseline
            </button>
            <button 
                onClick={props.onRestore} 
                title="Restore Baseline" 
                className="git-button"
                disabled={!props.isParsedMode}
            >
                <VscDiscard /> Restore
            </button>
            <button 
                className={`styled-button ${props.workflowStep === 'awaitingAccept' ? 'workflow-highlight' : ''}`} 
                onClick={props.onAcceptSelected} 
                disabled={props.selectedFilesForReplacementCount === 0 || !props.isParsedMode}
            >
                <VscSave/> Accept Selected
            </button>
        </div>
    );
};

export default WorkflowToolbar;