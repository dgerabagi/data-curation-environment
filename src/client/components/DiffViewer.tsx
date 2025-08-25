// Updated on: C132 (Add keyboard nav, accept logic, and four scrollbars)
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

interface DiffBlock {
    start: number;
    end: number;
}

const DiffViewer: React.FC<{ original: { content: string, path: string }, modified: { content: string, path: string } }> = ({ original, modified }) => {
    const [selectedDiffIndex, setSelectedDiffIndex] = React.useState<number>(0);
    const [originalLines, setOriginalLines] = React.useState<string[]>(() => original.content.split('\n'));
    const diffLineRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());
    const leftPaneRef = React.useRef<HTMLDivElement>(null);
    const rightPaneRef = React.useRef<HTMLDivElement>(null);
    const leftDetailRef = React.useRef<HTMLDivElement>(null);
    const rightDetailRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setOriginalLines(original.content.split('\n'));
    }, [original.content]);

    const { pairedLines, diffBlocks } = React.useMemo(() => {
        const modifiedLines = modified.content.split('\n');
        const changes = diffArrays(originalLines, modifiedLines);
        
        const result: PairedLine[] = [];
        const diffBlockIndices: DiffBlock[] = [];
        let leftLineNum = 1;
        let rightLineNum = 1;

        for (const change of changes) {
            const blockStart = result.length;
            let isDiffBlock = false;
            if (change.added) {
                isDiffBlock = true;
                for (const line of change.value) {
                    result.push({ left: { type: 'placeholder' }, right: { type: 'added', content: line, lineNum: rightLineNum++ }, isDiff: true });
                }
            } else if (change.removed) {
                isDiffBlock = true;
                for (const line of change.value) {
                    result.push({ left: { type: 'removed', content: line, lineNum: leftLineNum++ }, right: { type: 'placeholder' }, isDiff: true });
                }
            } else {
                for (const line of change.value) {
                    result.push({ left: { type: 'common', content: line, lineNum: leftLineNum++ }, right: { type: 'common', content: line, lineNum: rightLineNum++ }, isDiff: false });
                }
            }
            if (isDiffBlock) {
                diffBlockIndices.push({ start: blockStart, end: result.length - 1 });
            }
        }
        return { pairedLines: result, diffBlocks: diffBlockIndices };
    }, [originalLines, modified.content]);

    const goToDiff = React.useCallback((index: number) => {
        if (index >= 0 && index < diffBlocks.length) {
            setSelectedDiffIndex(index);
            const lineIndex = diffBlocks[index].start;
            diffLineRefs.current.get(lineIndex)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [diffBlocks]);

    React.useEffect(() => {
        goToDiff(selectedDiffIndex);
    }, [selectedDiffIndex, goToDiff]);

    const handleAcceptChange = () => {
        if (selectedDiffIndex < 0 || selectedDiffIndex >= diffBlocks.length) return;
    
        const block = diffBlocks[selectedDiffIndex];
        const blockLines = pairedLines.slice(block.start, block.end + 1);
    
        const originalBlockLines = blockLines.filter(l => l.left.type === 'removed').map(l => l.left.content);
        const modifiedBlockLines = blockLines.filter(l => l.right.type === 'added').map(l => l.right.content);
    
        const firstOriginalLineNum = blockLines.find(l => l.left.lineNum)?.left.lineNum;
    
        if (firstOriginalLineNum === undefined) return;
    
        const startIndex = firstOriginalLineNum - 1;
        const deleteCount = originalBlockLines.length;
    
        setOriginalLines(prev => {
            const newLines = [...prev];
            newLines.splice(startIndex, deleteCount, ...modifiedBlockLines as string[]);
            return newLines;
        });
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedDiffIndex(prev => Math.min(prev + 1, diffBlocks.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedDiffIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleAcceptChange();
            }
        };

        const wrapper = wrapperRef.current;
        wrapper?.addEventListener('keydown', handleKeyDown);
        return () => wrapper?.removeEventListener('keydown', handleKeyDown);
    }, [diffBlocks.length, handleAcceptChange]);


    const handleScroll = (scroller: 'left' | 'right') => {
        if (!leftPaneRef.current || !rightPaneRef.current) return;
        if (scroller === 'left' && rightPaneRef.current.scrollTop !== leftPaneRef.current.scrollTop) {
            rightPaneRef.current.scrollTop = leftPaneRef.current.scrollTop;
        } else if (scroller === 'right' && leftPaneRef.current.scrollTop !== rightPaneRef.current.scrollTop) {
            leftPaneRef.current.scrollTop = rightPaneRef.current.scrollTop;
        }
    };

    const handleDetailScroll = (scroller: 'left' | 'right') => {
        if (!leftDetailRef.current || !rightDetailRef.current) return;
        if (scroller === 'left' && rightDetailRef.current.scrollLeft !== leftDetailRef.current.scrollLeft) {
            rightDetailRef.current.scrollLeft = leftDetailRef.current.scrollLeft;
        } else if (scroller === 'right' && leftDetailRef.current.scrollLeft !== rightDetailRef.current.scrollLeft) {
            leftDetailRef.current.scrollLeft = rightDetailRef.current.scrollLeft;
        }
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
        if (diffBlocks.length === 0 || selectedDiffIndex < 0 || selectedDiffIndex >= diffBlocks.length) return { left: [], right: [] };
        const block = diffBlocks[selectedDiffIndex];
        const blockLines = pairedLines.slice(block.start, block.end + 1);
        
        const originalLines = blockLines.map(l => l.left.content).filter(Boolean) as string[];
        const modifiedLines = blockLines.map(l => l.right.content).filter(Boolean) as string[];

        return renderCharDiff(originalLines.join('\n'), modifiedLines.join('\n'));
    }, [selectedDiffIndex, pairedLines, diffBlocks]);

    return (
        <div className="diff-viewer-wrapper" ref={wrapperRef} tabIndex={-1}>
            <div className="diff-viewer-main-container">
                {/* Modified Pane (Left) */}
                <div className="diff-pane" onScroll={() => handleScroll('left')} ref={leftPaneRef}>
                    <div className="diff-pane-header">Response: {modified.path}</div>
                    <div className="diff-pane-content">
                        <div className="line-numbers">{pairedLines.map((line, i) => <span key={`L${i}`}>{line.right.lineNum || ' '}</span>)}</div>
                        <div className="diff-lines">
                            {pairedLines.map((line, i) => (
                                <div key={`L${i}`} className={`line ${line.right.type} ${diffBlocks[selectedDiffIndex]?.start <= i && i <= diffBlocks[selectedDiffIndex]?.end ? 'selected-diff' : ''}`} ref={ref => { if (ref) diffLineRefs.current.set(i, ref); }}>
                                    <pre><code>{line.right.content || ''}</code></pre>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Original Pane (Right) */}
                <div className="diff-pane" onScroll={() => handleScroll('right')} ref={rightPaneRef}>
                     <div className="diff-pane-header">Original: {original.path}</div>
                     <div className="diff-pane-content">
                        <div className="line-numbers">{pairedLines.map((line, i) => <span key={`R${i}`}>{line.left.lineNum || ' '}</span>)}</div>
                        <div className="diff-lines">
                            {pairedLines.map((line, i) => (
                                <div key={`R${i}`} className={`line ${line.left.type} ${diffBlocks[selectedDiffIndex]?.start <= i && i <= diffBlocks[selectedDiffIndex]?.end ? 'selected-diff' : ''}`}>
                                    <pre><code>{line.left.content || ''}</code></pre>
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
                    <div className="diff-detail-pane added" ref={rightDetailRef} onScroll={() => handleDetailScroll('right')}><pre><code>{selectedDiffContent.right}</code></pre></div>
                    <div className="diff-detail-pane removed" ref={leftDetailRef} onScroll={() => handleDetailScroll('left')}><pre><code>{selectedDiffContent.left}</code></pre></div>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;