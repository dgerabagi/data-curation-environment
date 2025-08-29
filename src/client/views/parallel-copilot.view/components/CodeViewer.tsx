// src/client/views/parallel-copilot.view/components/CodeViewer.tsx
// New file in C169
import * as React from 'react';

const CodeViewer: React.FC<{ htmlContent: string | undefined | null }> = ({ htmlContent }) => {
    if (htmlContent === undefined || htmlContent === null) {
        return <div style={{ padding: '8px' }}>Select a file to view its content.</div>;
    }
    if (htmlContent.startsWith('// Error:')) {
         return <div style={{ padding: '8px', color: 'var(--vscode-errorForeground)' }}>{htmlContent}</div>;
    }

    const codeContentMatch = /<pre><code>([\s\S]*)<\/code><\/pre>/s.exec(htmlContent || '');
    const code = codeContentMatch?. ?? (htmlContent || '');

    const lines = code.split('\n');
    if (lines.length > 1 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    return (
        <div className="code-viewer-wrapper">
            <div className="file-content-viewer">
                <div className="line-numbers">
                    {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
                </div>
                <div className="code-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    );
};

export default CodeViewer;