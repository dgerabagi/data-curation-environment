// src/client/views/parallel-copilot.view/components/ContextInputs.tsx
// Updated on: C2 (Add onBlur handlers)
import * as React from 'react';
import { formatLargeNumber } from '@/common/utils/formatting';

interface ContextInputsProps {
    cycleContext: string;
    ephemeralContext: string;
    cycleContextTokens: number;
    ephemeralContextTokens: number;
    onCycleContextChange: (value: string) => void;
    onEphemeralContextChange: (value: string) => void;
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
            <div className={`context-input-wrapper ${workflowStep === 'awaitingCycleContext' ? 'workflow-highlight' : ''}`}>
                <div className="context-label">
                    <span>Cycle Context</span>
                    <span>({formatLargeNumber(cycleContextTokens, 1)} tk)</span>
                </div>
                <textarea
                    className="response-textarea"
                    value={cycleContext}
                    onChange={(e) => onCycleContextChange(e.target.value)}
                    spellCheck={false}
                />
            </div>
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Ephemeral Context</span>
                    <span>({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span>
                </div>
                <textarea
                    className="response-textarea"
                    value={ephemeralContext}
                    onChange={(e) => onEphemeralContextChange(e.target.value)}
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

export default ContextInputs;