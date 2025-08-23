// src/client/components/DiffViewer.tsx
import * as React from 'react';
import { diffLines, Change } from 'diff';

interface DiffViewerProps {
    original: string;
    modified: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified }) => {
    const changes = diffLines(original, modified);

    let originalLineNum = 1;
    let modifiedLineNum = 1;

    return (
        <div className="diff-viewer-container">
            <div className="diff-content">
                <div className="line-numbers original">
                    {changes.map((part, index) => {
                        if (part.added) return null;
                        const lines = part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '');
                        return lines.map((_, lineIndex) => <span key={`${index}-${lineIndex}`}>{originalLineNum++}</span>);
                    })}
                </div>
                <div className="diff-lines">
                    {changes.map((part, index) => {
                        const lines = part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '');
                        const partClassName = part.added ? 'added' : part.removed ? 'removed' : 'common';
                        
                        return lines.map((line, lineIndex) => (
                            <div key={`${index}-${lineIndex}`} className={`line ${partClassName}`}>
                                <span className="line-prefix">{part.added ? '+' : part.removed ? '-' : ' '}</span>
                                <pre><code>{line}</code></pre>
                            </div>
                        ));
                    })}
                </div>
                 <div className="line-numbers modified">
                    {changes.map((part, index) => {
                        if (part.removed) return null;
                        const lines = part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '');
                        return lines.map((_, lineIndex) => <span key={`${index}-${lineIndex}`}>{modifiedLineNum++}</span>);
                    })}
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;