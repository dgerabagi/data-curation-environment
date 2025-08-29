// src/client/views/parallel-copilot.view/components/CycleNavigator.tsx
// Updated on: C170 (Migrate logic from view.tsx)
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
    onImportHistory
}) => {
    return (
        <div className="cycle-navigator">
            <span>Cycle:</span>
            <button onClick={(e) => onCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 0}>
                <VscChevronLeft />
            </button>
            <input 
                type="number" 
                value={currentCycle} 
                onChange={e => onCycleChange(null, parseInt(e.target.value, 10) || 0)} 
                className="cycle-input" 
            />
            <button onClick={(e) => onCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}>
                <VscChevronRight />
            </button>
            <button onClick={onNewCycle} title="New Cycle" disabled={isNewCycleButtonDisabled}>
                <VscAdd />
            </button>
            <input 
                type="text" 
                className="cycle-title-input" 
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