// src/client/views/parallel-copilot.view/components/ContextInputs.tsx
// Updated on: C1 (Replace NumberedTextarea with standard textarea)
import * as React from 'react';
import { formatLargeNumber } from '@/common/utils/formatting';

interface ContextInputsProps {
    cycleContext: string;
    ephemeralContext: string;
    cycleContextTokens: number;
    ephemeralContextTokens: number;
    onCycleContextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onEphemeralContextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    workflowStep: string | null;
}

const ContextInputs: React.FC<ContextInputsProps> = ({
    cycleContext,
    ephemeralContext,
    cycleContextTokens,
    ephemeralContextTokens,
    onCycleContextChange,
    onEphemeralContextChange,
    workflowStep
}) => {
    return (
        <div className="context-inputs">
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Cycle Context</span>
                    <span>({formatLargeNumber(cycleContextTokens, 1)} tk)</span>
                </div>
                <textarea
                    className={`context-textarea ${workflowStep === 'awaitingCycleContext' ? 'workflow-highlight' : ''}`}
                    value={cycleContext}
                    onChange={onCycleContextChange}
                    placeholder="Cycle Context (notes for this cycle)..."
                    spellCheck={false}
                />
            </div>
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Ephemeral Context</span>
                    <span>({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span>
                </div>
                <textarea
                    className="context-textarea"
                    value={ephemeralContext}
                    onChange={onEphemeralContextChange}
                    placeholder="Ephemeral Context (for this cycle's prompt only)..."
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

export default ContextInputs;