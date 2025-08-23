// src/client/components/DiffViewer.tsx
import * as React from 'react';
import { diffLines, Change } from 'diff';

interface DiffViewerProps {
    original: string;
    modified: string;
}

interface DiffLine {
    type: 'added' | 'removed' | 'common' | 'placeholder';
    content?: string;
}

interface PairedLine {
    left: DiffLine & { lineNum?: number };
    right: DiffLine & { lineNum?: number };
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified }) => {
    
    const pairedLines = React.useMemo(() => {
        const changes = diffLines(original, modified);
        const result: PairedLine[] = [];
        let leftLineNum = 1;
        let rightLineNum = 1;

        let i = 0;
        while (i < changes.length) {
            const current = changes[i];
            const next = changes[i + 1];

            if (current.removed && next && next.added) {
                const leftLines = current.value.split('\n').slice(0, -1);
                const rightLines = next.value.split('\n').slice(0, -1);
                const maxLen = Math.max(leftLines.length, rightLines.length);

                for (let j = 0; j < maxLen; j++) {
                    result.push({
                        left: { type: 'removed', content: leftLines[j], lineNum: leftLines[j] !== undefined ? leftLineNum++ : undefined },
                        right: { type: 'added', content: rightLines[j], lineNum: rightLines[j] !== undefined ? rightLineNum++ : undefined }
                    });
                }
                i += 2;
            } else if (current.removed) {
                const lines = current.value.split('\n').slice(0, -1);
                lines.forEach(line => {
                    result.push({
                        left: { type: 'removed', content: line, lineNum: leftLineNum++ },
                        right: { type: 'placeholder' }
                    });
                });
                i++;
            } else if (current.added) {
                const lines = current.value.split('\n').slice(0, -1);
                lines.forEach(line => {
                    result.push({
                        left: { type: 'placeholder' },
                        right: { type: 'added', content: line, lineNum: rightLineNum++ }
                    });
                });
                i++;
            } else { // common
                const lines = current.value.split('\n').slice(0, -1);
                lines.forEach(line => {
                    result.push({
                        left: { type: 'common', content: line, lineNum: leftLineNum++ },
                        right: { type: 'common', content: line, lineNum: rightLineNum++ }
                    });
                });
                i++;
            }
        }
        return result;
    }, [original, modified]);

    return (
        <div className="diff-viewer-container">
            <div className="diff-pane">
                <div className="line-numbers">
                    {pairedLines.map((line, i) => <span key={`L${i}`}>{line.left.lineNum || ' '}</span>)}
                </div>
                <div className="diff-lines">
                    {pairedLines.map((line, i) => (
                        <div key={`L${i}`} className={`line ${line.left.type}`}>
                            <pre><code>{line.left.content || ' '}</code></pre>
                        </div>
                    ))}
                </div>
            </div>
            <div className="diff-pane">
                <div className="line-numbers">
                    {pairedLines.map((line, i) => <span key={`R${i}`}>{line.right.lineNum || ' '}</span>)}
                </div>
                <div className="diff-lines">
                    {pairedLines.map((line, i) => (
                        <div key={`R${i}`} className={`line ${line.right.type}`}>
                            <pre><code>{line.right.content || ' '}</code></pre>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;