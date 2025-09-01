// src/client/views/parallel-copilot.view/components/ContextInputs.tsx
// Updated on: C182 (Set showLineNumbers to false)
import * as React from 'react';
import NumberedTextarea from './NumberedTextarea';
import { formatLargeNumber } from '@/common/utils/formatting';

interface ContextInputsProps {
    cycleContext: string;
    ephemeralContext: string;
    cycleContextTokens: number;
    ephemeralContextTokens: number;
    onCycleContextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onEphemeralContextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onContextKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    cycleContextHeight: number;
    onCycleContextHeightChange: (height: number) => void;
    ephemeralContextHeight: number;
    onEphemeralContextHeightChange: (height: number) => void;
    currentCycle: number;
    workflowStep: string | null;
}

const ContextInputs: React.FC<ContextInputsProps> = ({
    cycleContext,
    ephemeralContext,
    cycleContextTokens,
    ephemeralContextTokens,
    onCycleContextChange,
    onEphemeralContextChange,
    onContextKeyDown,
    cycleContextHeight,
    onCycleContextHeightChange,
    ephemeralContextHeight,
    onEphemeralContextHeightChange,
    currentCycle,
    workflowStep
}) => {
    return (
        <div className="context-inputs">
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Cycle Context</span>
                    <span>({formatLargeNumber(cycleContextTokens, 1)} tk)</span>
                </div>
                <NumberedTextarea
                    value={cycleContext}
                    onChange={onCycleContextChange}
                    placeholder="Cycle Context (notes for this cycle)..."
                    onKeyDown={onContextKeyDown}
                    height={cycleContextHeight}
                    onHeightChange={onCycleContextHeightChange}
                    id={`cycle-context-${currentCycle}`}
                    className={workflowStep === 'awaitingCycleContext' ? 'workflow-highlight' : ''}
                    showLineNumbers={false}
                />
            </div>
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Ephemeral Context</span>
                    <span>({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span>
                </div>
                <NumberedTextarea
                    value={ephemeralContext}
                    onChange={onEphemeralContextChange}
                    placeholder="Ephemeral Context (for this cycle's prompt only)..."
                    onKeyDown={onContextKeyDown}
                    height={ephemeralContextHeight}
                    onHeightChange={onEphemeralContextHeightChange}
                    id={`ephemeral-context-${currentCycle}`}
                    showLineNumbers={false}
                />
            </div>
        </div>
    );
};

export default ContextInputs;