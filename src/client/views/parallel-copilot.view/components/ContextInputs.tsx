// src/client/views/parallel-copilot.view/components/ContextInputs.tsx
// Updated on: C183 (Fix implementation to use prism-react-renderer)
import * as React from 'react';
import { formatLargeNumber } from '@/common/utils/formatting';
import Editor from 'react-simple-code-editor';
import { Highlight, themes } from 'prism-react-renderer';

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
    const highlightWrapper = (code: string) => (
        <Highlight
            theme={themes.vsDark}
            code={code}
            language="markdown"
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{...style, margin: 0, padding: 0, backgroundColor: 'transparent' }}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );

    return (
        <div className="context-inputs">
            <div className={`context-input-wrapper ${workflowStep === 'awaitingCycleContext' ? 'workflow-highlight' : ''}`}>
                <div className="context-label">
                    <span>Cycle Context</span>
                    <span>({formatLargeNumber(cycleContextTokens, 1)} tk)</span>
                </div>
                <div className="editor-container simple-editor">
                    <Editor
                        value={cycleContext}
                        onValueChange={onCycleContextChange}
                        highlight={highlightWrapper}
                        padding={10}
                        style={{
                            fontFamily: 'var(--vscode-editor-font-family)',
                            fontSize: 'var(--vscode-editor-font-size)',
                            lineHeight: '1.5',
                        }}
                    />
                </div>
            </div>
            <div className="context-input-wrapper">
                <div className="context-label">
                    <span>Ephemeral Context</span>
                    <span>({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span>
                </div>
                 <div className="editor-container simple-editor">
                    <Editor
                        value={ephemeralContext}
                        onValueChange={onEphemeralContextChange}
                        highlight={highlightWrapper}
                        padding={10}
                        style={{
                            fontFamily: 'var(--vscode-editor-font-family)',
                            fontSize: 'var(--vscode-editor-font-size)',
                            lineHeight: '1.5',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContextInputs;