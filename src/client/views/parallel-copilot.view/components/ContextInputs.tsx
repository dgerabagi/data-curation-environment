// src/client/views/parallel-copilot.view/components/ContextInputs.tsx
// Updated on: C3 (Re-introduce HighlightedTextarea)
import * as React from 'react';
import { formatLargeNumber } from '@/common/utils/formatting';
import HighlightedTextarea from './HighlightedTextarea';

interface ContextInputsProps {
    cycleContext: string;
    ephemeralContext: string;
    cycleContextTokens: number;
    ephemeralContextTokens: number;
    onCycleContextChange: (value: string) => void;
    onEphemeralContextChange: (value: string) => void;
    onContextKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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
    workflowStep
}) => {
    return (
        <div className="context-inputs">
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Cycle Context</span>
                    <span>({formatLargeNumber(cycleContextTokens, 1)} tk)</span>
                </div>
                <HighlightedTextarea
                    id="cycle-context"
                    initialValue={cycleContext}
                    onChange={onCycleContextChange}
                    onKeyDown={onContextKeyDown}
                    placeholder="Cycle Context (notes for this cycle)..."
                    className={workflowStep === 'awaitingCycleContext' ? 'workflow-highlight' : ''}
                />
            </div>
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Ephemeral Context</span>
                    <span>({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span>
                </div>
                 <HighlightedTextarea
                    id="ephemeral-context"
                    initialValue={ephemeralContext}
                    onChange={onEphemeralContextChange}
                    onKeyDown={onContextKeyDown}
                    placeholder="Ephemeral Context (for this cycle's prompt only)..."
                />
            </div>
        </div>
    );
};

export default ContextInputs;