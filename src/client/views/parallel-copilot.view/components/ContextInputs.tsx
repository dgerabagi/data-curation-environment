// src/client/views/parallel-copilot.view/components/ContextInputs.tsx
import * as React from 'react';
import { formatLargeNumber } from '@/common/utils/formatting';
import { VscChevronDown } from 'react-icons/vsc';

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; className?: string; extraHeaderContent?: React.ReactNode; }> = ({ title, children, isCollapsed, onToggle, className, extraHeaderContent }) => (
    <div className={`collapsible-section-inner context-collapsible ${className || ''}`}>
        <div className={`collapsible-header-inner`} onClick={onToggle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} /><span>{title}</span></div>
            {extraHeaderContent}
        </div>
        {!isCollapsed && <div className="collapsible-content-inner">{children}</div>}
    </div>
);

interface ContextInputsProps {
    cycleContext: string;
    ephemeralContext: string;
    onCycleContextChange: (value: string) => void;
    onEphemeralContextChange: (value: string) => void;
    workflowStep: string | null;
    isEphemeralContextCollapsed: boolean;
    onToggleEphemeralContext: () => void;
}

const ContextInputs: React.FC<ContextInputsProps> = ({
    cycleContext,
    ephemeralContext,
    onCycleContextChange,
    onEphemeralContextChange,
    workflowStep,
    isEphemeralContextCollapsed,
    onToggleEphemeralContext
}) => {
    const cycleContextTokens = React.useMemo(() => Math.ceil(cycleContext.length / 4), [cycleContext]);
    const ephemeralContextTokens = React.useMemo(() => Math.ceil(ephemeralContext.length / 4), [ephemeralContext]);

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
            
            <CollapsibleSection 
                title="Ephemeral Context" 
                isCollapsed={isEphemeralContextCollapsed} 
                onToggle={onToggleEphemeralContext}
                extraHeaderContent={<span className="context-token-count">({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span>}
            >
                <textarea
                    className="response-textarea"
                    value={ephemeralContext}
                    onChange={(e) => onEphemeralContextChange(e.target.value)}
                    spellCheck={false}
                />
            </CollapsibleSection>
        </div>
    );
};

export default ContextInputs;