// Updated on: C128 (Implement multi-line highlight and character-level diff with phantom spaces)
import * as React from 'react';
import { diffArrays, diffChars, Change } from 'diff';
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
            const isDiffBlock = change.added || change.removed;
            if (isDiffBlock) {
                if(!diffBlockIndices.includes(result.length)) diffBlockIndices.push(result.length);
            }
            
            if (change.added) {
                change.value.forEach(line => {
                    result.push({
                        left: { type: 'placeholder' },
                        right: { type: 'added', content: line, lineNum: rightLineNum++ },
                        isDiff: true,
                    });
                });
            } else if (change.removed) {
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

    const isLineInSelectedBlock = (lineIndex: number): boolean => {
        const currentDiffStart = diffBlocks[selectedDiffIndex];
        if (currentDiffStart === undefined) return false;
        
        const nextDiffStart = diffBlocks[selectedDiffIndex + 1] || pairedLines.length;

        let currentDiffEnd = currentDiffStart;
        while(currentDiffEnd + 1 < nextDiffStart && pairedLines[currentDiffEnd + 1].isDiff) {
            currentDiffEnd++;
        }

        return lineIndex >= currentDiffStart && lineIndex <= currentDiffEnd;
    };

    const renderCharDiff = (originalText: string, modifiedText: string) => {
        const charChanges = diffChars(originalText, modifiedText);
        const leftSpans: React.ReactNode[] = [];
        const rightSpans: React.ReactNode[] = [];

        charChanges.forEach((part, index) => {
            const key = `char-${index}`;
            if (part.added) {
                rightSpans.push(<span key={key} className="char-added">{part.value}</span>);
                leftSpans.push(<span key={key} className="phantom-space">{'\u00A0'.repeat(part.value.length)}</span>);
            } else if (part.removed) {
                leftSpans.push(<span key={key} className="char-removed">{part.value}</span>);
                rightSpans.push(<span key={key} className="phantom-space">{'\u00A0'.repeat(part.value.length)}</span>);
            } else {
                leftSpans.push(<span key={key}>{part.value}</span>);
                rightSpans.push(<span key={key}>{part.value}</span>);
            }
        });
        return { left: <>{leftSpans}</>, right: <>{rightSpans}</> };
    };

    const selectedDiffContent = React.useMemo(() => {
        if (selectedDiffIndex === null || diffBlocks[selectedDiffIndex] === undefined) {
            return { left: [], right: [] };
        }
        const startIndex = diffBlocks[selectedDiffIndex];
        let endIndex = startIndex;
        while (endIndex + 1 < pairedLines.length && pairedLines[endIndex + 1].isDiff) {
            endIndex++;
        }
        const block = pairedLines.slice(startIndex, endIndex + 1);
        
        const originalLines = block.map(l => l.left.content).filter(Boolean) as string[];
        const modifiedLines = block.map(l => l.right.content).filter(Boolean) as string[];

        // For simplicity in this pane, we just diff the first lines if they exist.
        // A more complex implementation could handle multi-line changes.
        const { left, right } = renderCharDiff(originalLines.join('\n'), modifiedLines.join('\n'));
        
        return { left: [left], right: [right] };
    }, [selectedDiffIndex, pairedLines, diffBlocks]);

    return (
        <div className="diff-viewer-wrapper">
            <div className="diff-viewer-main-container" ref={diffContainerRef}>
                <div className="diff-viewer-container">
                    <div className="diff-pane">
                        <div className="line-numbers">
                            {pairedLines.map((line, i) => <span key={`L${i}`}>{line.left.lineNum || ' '}</span>)}
                        </div>
                        <div className="diff-lines">
                            {pairedLines.map((line, i) => (
                                <div 
                                    key={`L${i}`} 
                                    className={`line ${line.left.type} ${isLineInSelectedBlock(i) ? 'selected-diff' : ''}`}
                                    ref={ref => { if (ref) diffLineRefs.current.set(i, ref); }}
                                >
                                    <pre><code>{line.left.content || ''}</code></pre>
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
                                <div key={`R${i}`} className={`line ${line.right.type} ${isLineInSelectedBlock(i) ? 'selected-diff' : ''}`}>
                                    <pre><code>{line.right.content || ''}</code></pre>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="diff-detail-container">
                <div className="diff-detail-header">
                    <span>Difference {diffBlocks.length > 0 ? selectedDiffIndex + 1 : 0} of {diffBlocks.length}</span>
                    <div className="diff-nav-buttons">
                        <button onClick={() => goToDiff(selectedDiffIndex - 1)} disabled={selectedDiffIndex <= 0}><VscArrowUp /> Prev</button>
                        <button onClick={() => goToDiff(selectedDiffIndex + 1)} disabled={selectedDiffIndex >= diffBlocks.length - 1}><VscArrowDown /> Next</button>
                    </div>
                </div>
                <div className="diff-detail-panes">
                    <div className="diff-detail-pane removed">
                        <pre><code>{selectedDiffContent.left}</code></pre>
                    </div>
                    <div className="diff-detail-pane added">
                        <pre><code>{selectedDiffContent.right}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;