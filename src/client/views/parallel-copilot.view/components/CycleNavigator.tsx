// src/client/views/parallel-copilot.view/components/CycleNavigator.tsx
// Updated on: C132 (Verify workflow highlight for + button)
import * as React from 'react';
import { VscChevronLeft, VscChevronRight, VscAdd, VscTrash, VscSync, VscCloudUpload, VscCloudDownload } from 'react-icons/vsc';

interface CycleNavigatorProps {
    currentCycle: number;
    maxCycle: number;
    cycleTitle: string;
    isNewCycleButtonDisabled: boolean;
    onCycleChange: (e: React.MouseEvent | null, newCycle: number) => void;
    onNewCycle: (e: React.MouseEvent) => void;
    onTitleChange: (newTitle: string) => void;
    onDeleteCycle: () => void;
    onResetHistory: () => void;
    onExportHistory: () => void;
    onImportHistory: () => void;
    workflowStep: string | null;
    disabledReason: string;
    saveStatus: 'saved' | 'saving' | 'unsaved';
}

const CycleNavigator: React.FC<CycleNavigatorProps> = ({
    currentCycle,
    maxCycle,
    cycleTitle,
    isNewCycleButtonDisabled,
    onCycleChange,
    onNewCycle,
    onTitleChange,
    onDeleteCycle,
    onResetHistory,
    onExportHistory,
    onImportHistory,
    workflowStep,
    disabledReason,
    saveStatus
}) => {
    const isNavDisabled = saveStatus !== 'saved';

    return (
        <div className="cycle-navigator">
            <span>Cycle:</span>
            <button onClick={(e) => onCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 0 || isNavDisabled} title={isNavDisabled ? "Unsaved changes..." : "Previous Cycle"}>
                <VscChevronLeft />
            </button>
            <input 
                type="number" 
                value={currentCycle} 
                onChange={e => onCycleChange(null, parseInt(e.target.value, 10) || 0)} 
                className="cycle-input" 
                disabled={isNavDisabled}
            />
            <button 
                onClick={(e) => onCycleChange(e, currentCycle + 1)} 
                disabled={currentCycle >= maxCycle || isNavDisabled}
                title={currentCycle >= maxCycle ? "You are on the latest cycle" : isNavDisabled ? "Unsaved changes..." : "Next Cycle"}
            >
                <VscChevronRight />
            </button>
            <button 
                onClick={onNewCycle} 
                title={isNewCycleButtonDisabled ? `Cannot start new cycle:\n${disabledReason}` : isNavDisabled ? "Unsaved changes..." : "New Cycle"}
                disabled={isNewCycleButtonDisabled || isNavDisabled}
                className={workflowStep === 'readyForNewCycle' ? 'workflow-highlight' : ''}
            >
                <VscAdd />
            </button>
            <input 
                type="text" 
                className={`cycle-title-input ${workflowStep === 'awaitingCycleTitle' ? 'workflow-highlight' : ''}`}
                placeholder="Cycle Title..." 
                value={cycleTitle} 
                onChange={e => onTitleChange(e.target.value)} 
            />
            <button onClick={onDeleteCycle} title="Delete Current Cycle"><VscTrash /></button>
            <button onClick={onResetHistory} title="Reset All History"><VscSync /></button>
            <button onClick={onExportHistory} title="Save Cycle History..."><VscCloudUpload /></button>
            <button onClick={onImportHistory} title="Load Cycle History..."><VscCloudDownload /></button>
        </div>
    );
};

export default CycleNavigator;