// src/client/views/parallel-copilot.view/components/ContextInputs.tsx
// Updated on: C3 (Replace textarea with Monaco Editor)
import * as React from 'react';
import { formatLargeNumber } from '@/common/utils/formatting';
import Editor from '@monaco-editor/react';

interface ContextInputsProps {
    cycleContext: string;
    ephemeralContext: string;
    cycleContextTokens: number;
    ephemeralContextTokens: number;
    onCycleContextChange: (value: string | undefined) => void;
    onEphemeralContextChange: (value: string | undefined) => void;
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
    const editorOptions = {
        minimap: { enabled: true },
        wordWrap: 'on' as const,
        lineNumbers: 'on' as const,
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true,
    };

    return (
        <div className="context-inputs">
            <div className={`context-input-wrapper ${workflowStep === 'awaitingCycleContext' ? 'workflow-highlight' : ''}`}>
                <div className="context-label">
                    <span>Cycle Context</span>
                    <span>({formatLargeNumber(cycleContextTokens, 1)} tk)</span>
                </div>
                <div className="editor-container">
                    <Editor
                        height="150px"
                        language="markdown"
                        value={cycleContext}
                        onChange={onCycleContextChange}
                        theme="vs-dark"
                        options={editorOptions}
                    />
                </div>
            </div>
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Ephemeral Context</span>
                    <span>({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span>
                </div>
                 <div className="editor-container">
                    <Editor
                        height="150px"
                        language="markdown"
                        value={ephemeralContext}
                        onChange={onEphemeralContextChange}
                        theme="vs-dark"
                        options={editorOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContextInputs;