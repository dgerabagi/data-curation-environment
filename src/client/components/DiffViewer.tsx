// Updated on: C129 (Vertical layout, fixed panes, block highlight, buttons below)
import * as React from 'react';
import { diffArrays, diffChars } from 'diff';
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

interface DiffBlock {
    start: number;
    end: number;
}

const DiffViewer: React.FC<{ original: { content: string, path: string }, modified: { content: string, path: string } }> = ({ original, modified }) => {
    const [selectedDiffIndex, setSelectedDiffIndex] = React.useState<number>(0);
    const diffLineRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());

    const { pairedLines, diffBlocks } = React.useMemo(() => {
        const originalLines = original.content.split('\n');
        const modifiedLines = modified.content.split('\n');
        const changes = diffArrays(originalLines, modifiedLines);
        
        const result: PairedLine[] = [];
        const diffBlockIndices: DiffBlock[] = [];
        let leftLineNum = 1;
        let rightLineNum = 1;

        changes.forEach(change => {
            if (change.added || change.removed) {
                const blockStart = result.length;
                if (change.added) {
                    change.value.forEach(line => {
                        result.push({ left: { type: 'placeholder' }, right: { type: 'added', content: line, lineNum: rightLineNum++ }, isDiff: true });
                    });
                } else if (change.removed) {
                    change.value.forEach(line => {
                        result.push({ left: { type: 'removed', content: line, lineNum: leftLineNum++ }, right: { type: 'placeholder' }, isDiff: true });
                    });
                }
                diffBlockIndices.push({ start: blockStart, end: result.length - 1 });
            } else {
                change.value.forEach(line => {
                    result.push({ left: { type: 'common', content: line, lineNum: leftLineNum++ }, right: { type: 'common', content: line, lineNum: rightLineNum++ }, isDiff: false });
                });
            }
        });
        return { pairedLines: result, diffBlocks: diffBlockIndices };
    }, [original.content, modified.content]);

    const goToDiff = (index: number) => {
        if (index >= 0 && index < diffBlocks.length) {
            setSelectedDiffIndex(index);
            const lineIndex = diffBlocks[index].start;
            diffLineRefs.current.get(lineIndex)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const isLineInSelectedBlock = (lineIndex: number): boolean => {
        if (diffBlocks.length === 0) return false;
        const currentDiff = diffBlocks[selectedDiffIndex];
        return lineIndex >= currentDiff.start && lineIndex <= currentDiff.end;
    };

    const renderCharDiff = (originalText: string, modifiedText: string) => {
        const charChanges = diffChars(originalText, modifiedText);
        const leftSpans: React.ReactNode[] = [];
        const rightSpans: React.ReactNode[] = [];

        charChanges.forEach((part, index) => {
            const key = `char-${index}`;
            const className = part.added ? 'char-added' : part.removed ? 'char-removed' : '';
            if (part.added) {
                rightSpans.push(<span key={key} className={className}>{part.value}</span>);
            } else if (part.removed) {
                leftSpans.push(<span key={key} className={className}>{part.value}</span>);
            } else {
                leftSpans.push(<span key={key}>{part.value}</span>);
                rightSpans.push(<span key={key}>{part.value}</span>);
            }
        });
        return { left: <>{leftSpans}</>, right: <>{rightSpans}</> };
    };

    const selectedDiffContent = React.useMemo(() => {
        if (diffBlocks.length === 0) return { left: [], right: [] };
        const block = diffBlocks[selectedDiffIndex];
        const blockLines = pairedLines.slice(block.start, block.end + 1);
        
        const originalLines = blockLines.map(l => l.left.content).filter(Boolean) as string[];
        const modifiedLines = blockLines.map(l => l.right.content).filter(Boolean) as string[];

        return renderCharDiff(originalLines.join('\n'), modifiedLines.join('\n'));
    }, [selectedDiffIndex, pairedLines, diffBlocks]);

    return (
        <div className="diff-viewer-wrapper">
            <div className="diff-viewer-main-container">
                {/* Original Pane (Top) */}
                <div className="diff-pane-header">Original: {original.path}</div>
                <div className="diff-pane">
                    <div className="line-numbers">{pairedLines.map((line, i) => <span key={`L${i}`}>{line.left.lineNum || ' '}</span>)}</div>
                    <div className="diff-lines">
                        {pairedLines.map((line, i) => (
                             <div key={`L${i}`} className={`line ${line.left.type}`} ref={ref => { if (ref) diffLineRefs.current.set(i, ref); }}>
                                <pre><code>{line.left.content || ''}</code></pre>
                             </div>
                        ))}
                    </div>
                </div>
                {/* Modified Pane (Bottom) */}
                <div className="diff-pane-header">Response: {modified.path}</div>
                <div className="diff-pane">
                    <div className="line-numbers">{pairedLines.map((line, i) => <span key={`R${i}`}>{line.right.lineNum || ' '}</span>)}</div>
                    <div className="diff-lines">
                         {pairedLines.map((line, i) => (
                             <div key={`R${i}`} className={`line ${line.right.type}`}>
                                 <pre><code>{line.right.content || ''}</code></pre>
                             </div>
                         ))}
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
                    <div className="diff-detail-pane removed"><pre><code>{selectedDiffContent.left}</code></pre></div>
                    <div className="diff-detail-pane added"><pre><code>{selectedDiffContent.right}</code></pre></div>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;