// src/client/components/DiffViewer.tsx
import * as React from 'react';
import { diffArrays, Change } from 'diff';
import { VscArrowUp, VscArrowDown } from 'react-icons/vsc';

interface DiffLine {
    type: 'added' | 'removed' | 'common' | 'placeholder';
    content?: string;
}

interface PairedLine {
    left: DiffLine & { lineNum?: number };
    right: DiffLine & { lineNum?: number };
    isDiff: boolean;
}

const DiffViewer: React.FC<{ original: string; modified: string; }> = ({ original, modified }) => {
    const [selectedDiffIndex, setSelectedDiffIndex] = React.useState<number>(0);
    const diffContainerRef = React.useRef<HTMLDivElement>(null);
    const diffLineRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());

    const { pairedLines, diffBlocks } = React.useMemo(() => {
        const originalLines = original.split('\n');
        const modifiedLines = modified.split('\n');
        const changes = diffArrays(originalLines, modifiedLines);
        
        const result: PairedLine[] = [];
        const diffBlockIndices: number[] = [];
        let leftLineNum = 1;
        let rightLineNum = 1;

        changes.forEach(change => {
            if (change.added) {
                diffBlockIndices.push(result.length);
                change.value.forEach(line => {
                    result.push({
                        left: { type: 'placeholder' },
                        right: { type: 'added', content: line, lineNum: rightLineNum++ },
                        isDiff: true,
                    });
                });
            } else if (change.removed) {
                if(!diffBlockIndices.includes(result.length)) diffBlockIndices.push(result.length);
                change.value.forEach(line => {
                    result.push({
                        left: { type: 'removed', content: line, lineNum: leftLineNum++ },
                        right: { type: 'placeholder' },
                        isDiff: true,
                    });
                });
            } else {
                change.value.forEach(line => {
                    result.push({
                        left: { type: 'common', content: line, lineNum: leftLineNum++ },
                        right: { type: 'common', content: line, lineNum: rightLineNum++ },
                        isDiff: false,
                    });
                });
            }
        });
        return { pairedLines: result, diffBlocks: diffBlockIndices };
    }, [original, modified]);

    const goToDiff = (index: number) => {
        if (index >= 0 && index < diffBlocks.length) {
            setSelectedDiffIndex(index);
            const lineIndex = diffBlocks[index];
            diffLineRefs.current.get(lineIndex)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const selectedDiffContent = React.useMemo(() => {
        if (selectedDiffIndex === null || !diffBlocks[selectedDiffIndex]) {
            return { left: [], right: [] };
        }
        const startIndex = diffBlocks[selectedDiffIndex];
        let endIndex = startIndex;
        while (endIndex + 1 < pairedLines.length && pairedLines[endIndex + 1].isDiff) {
            endIndex++;
        }
        const block = pairedLines.slice(startIndex, endIndex + 1);
        return {
            left: block.map(l => l.left).filter(l => l.type !== 'placeholder'),
            right: block.map(l => l.right).filter(l => l.type !== 'placeholder'),
        };
    }, [selectedDiffIndex, pairedLines, diffBlocks]);

    return (
        <div className="diff-viewer-wrapper">
            <div className="diff-viewer-main-container" ref={diffContainerRef}>
                <div className="diff-viewer-container">
                    {/* Left Pane */}
                    <div className="diff-pane">
                        <div className="line-numbers">
                            {pairedLines.map((line, i) => <span key={`L${i}`}>{line.left.lineNum || ' '}</span>)}
                        </div>
                        <div className="diff-lines">
                            {pairedLines.map((line, i) => (
                                <div 
                                    key={`L${i}`} 
                                    className={`line ${line.left.type} ${diffBlocks[selectedDiffIndex] === i ? 'selected-diff' : ''}`}
                                    ref={ref => { if (ref) diffLineRefs.current.set(i, ref); }}
                                >
                                    <pre><code>{line.left.content || ''}</code></pre>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right Pane */}
                    <div className="diff-pane">
                        <div className="line-numbers">
                            {pairedLines.map((line, i) => <span key={`R${i}`}>{line.right.lineNum || ' '}</span>)}
                        </div>
                        <div className="diff-lines">
                            {pairedLines.map((line, i) => (
                                <div key={`R${i}`} className={`line ${line.right.type} ${diffBlocks[selectedDiffIndex] === i ? 'selected-diff' : ''}`}>
                                    <pre><code>{line.right.content || ''}</code></pre>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="diff-detail-container">
                <div className="diff-detail-header">
                    <span>Difference {selectedDiffIndex + 1} of {diffBlocks.length}</span>
                    <div className="diff-nav-buttons">
                        <button onClick={() => goToDiff(selectedDiffIndex - 1)} disabled={selectedDiffIndex <= 0}><VscArrowUp /> Prev</button>
                        <button onClick={() => goToDiff(selectedDiffIndex + 1)} disabled={selectedDiffIndex >= diffBlocks.length - 1}><VscArrowDown /> Next</button>
                    </div>
                </div>
                <div className="diff-detail-panes">
                    <div className="diff-detail-pane removed">
                        <pre><code>{selectedDiffContent.left.map(l => l.content).join('\n')}</code></pre>
                    </div>
                    <div className="diff-detail-pane added">
                        <pre><code>{selectedDiffContent.right.map(l => l.content).join('\n')}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;