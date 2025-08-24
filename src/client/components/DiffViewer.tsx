// src/client/components/DiffViewer.tsx
import * as React from 'react';
import { diffArrays, Change } from 'diff';
import { VscArrowDown, VscArrowUp } from 'react-icons/vsc';

interface DiffLine {
    type: 'added' | 'removed' | 'common' | 'placeholder';
    content?: string;
}

interface PairedLine {
    left: DiffLine & { lineNum?: number };
    right: DiffLine & { lineNum?: number };
    isDiff: boolean;
}

interface DiffBlock {
    index: number;
    originalLines: string[];
    modifiedLines: string[];
}

const DiffViewer: React.FC<{ original: string; modified: string; }> = ({ original, modified }) => {
    const [selectedDiffIndex, setSelectedDiffIndex] = React.useState(0);
    const diffContainerRef = React.useRef<HTMLDivElement>(null);

    const { pairedLines, diffBlocks } = React.useMemo(() => {
        const originalLines = original.split('\n');
        const modifiedLines = modified.split('\n');
        const changes = diffArrays(originalLines, modifiedLines);
        
        const result: PairedLine[] = [];
        const diffs: DiffBlock[] = [];
        let leftLineNum = 1;
        let rightLineNum = 1;
        let diffCounter = 0;

        changes.forEach((part) => {
            if (part.added || part.removed) {
                const currentDiffBlock: DiffBlock = {
                    index: diffCounter++,
                    originalLines: [],
                    modifiedLines: [],
                };

                part.value.forEach(line => {
                    if (part.added) {
                        result.push({ left: { type: 'placeholder' }, right: { type: 'added', content: line, lineNum: rightLineNum++ }, isDiff: true });
                        currentDiffBlock.modifiedLines.push(line);
                    } else { // removed
                        result.push({ left: { type: 'removed', content: line, lineNum: leftLineNum++ }, right: { type: 'placeholder' }, isDiff: true });
                        currentDiffBlock.originalLines.push(line);
                    }
                });
                diffs.push(currentDiffBlock);
            } else {
                part.value.forEach(line => {
                    result.push({ left: { type: 'common', content: line, lineNum: leftLineNum++ }, right: { type: 'common', content: line, lineNum: rightLineNum++ }, isDiff: false });
                });
            }
        });

        return { pairedLines: result, diffBlocks: diffs };
    }, [original, modified]);

    const handleNav = (direction: 'next' | 'prev') => {
        const newIndex = direction === 'next'
            ? Math.min(selectedDiffIndex + 1, diffBlocks.length - 1)
            : Math.max(selectedDiffIndex - 1, 0);
        setSelectedDiffIndex(newIndex);
    };

    React.useEffect(() => {
        const element = diffContainerRef.current?.querySelector(`[data-diff-index='${selectedDiffIndex}']`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [selectedDiffIndex]);

    const selectedDiff = diffBlocks[selectedDiffIndex];

    return (
        <div className="diff-viewer-wrapper">
            <div className="diff-nav-header">
                <button onClick={() => handleNav('prev')} disabled={selectedDiffIndex <= 0}><VscArrowUp /> Previous</button>
                <span>Difference {selectedDiffIndex + 1} of {diffBlocks.length}</span>
                <button onClick={() => handleNav('next')} disabled={selectedDiffIndex >= diffBlocks.length - 1}><VscArrowDown /> Next</button>
            </div>
            <div className="diff-viewer-container" ref={diffContainerRef}>
                {/* Main Diff View Panes */}
                <div className="diff-pane">
                    <div className="line-numbers">
                        {pairedLines.map((line, i) => <span key={`L${i}`}>{line.left.lineNum || ''}</span>)}
                    </div>
                    <div className="diff-lines">
                        {pairedLines.map((line, i) => (
                            <div key={`L${i}`} className={`line ${line.left.type}`} data-diff-index={line.isDiff ? diffBlocks.find(db => db.originalLines.includes(line.left.content || ''))?.index : undefined}>
                                <pre><code>{line.left.content}</code></pre>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="diff-pane">
                    <div className="line-numbers">
                        {pairedLines.map((line, i) => <span key={`R${i}`}>{line.right.lineNum || ''}</span>)}
                    </div>
                    <div className="diff-lines">
                        {pairedLines.map((line, i) => (
                             <div key={`R${i}`} className={`line ${line.right.type}`} data-diff-index={line.isDiff ? diffBlocks.find(db => db.modifiedLines.includes(line.right.content || ''))?.index : undefined}>
                                <pre><code>{line.right.content}</code></pre>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="diff-detail-footer">
                <div className="diff-detail-pane">
                    <pre><code>{selectedDiff?.originalLines.join('\n') || ''}</code></pre>
                </div>
                <div className="diff-detail-pane">
                    <pre><code>{selectedDiff?.modifiedLines.join('\n') || ''}</code></pre>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;