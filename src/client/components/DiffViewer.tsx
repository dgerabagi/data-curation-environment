// src/client/components/DiffViewer.tsx
// Updated on: C120 (Add diff navigation and scroll into view)
import * as React from 'react';
import { diffLines, Change } from 'diff';
import { VscArrowSwap, VscDiff, VscChevronUp, VscChevronDown } from 'react-icons/vsc';

interface DiffViewerProps {
    workspaceContent: string | undefined | null;
    aiContent: string | undefined | null;
    isDiffMode: boolean;
    filePath: string | null;
    onDiffToggle: () => void;
}

const CodeViewer: React.FC<{ htmlContent: string | undefined | null }> = ({ htmlContent }) => {
    if (htmlContent === undefined || htmlContent === null) {
        return <div style={{ padding: '8px' }}>Select a file to view its content.</div>;
    }
    if (htmlContent.startsWith('// Error:')) {
        return <div style={{ padding: '8px' }}>{htmlContent}</div>;
    }

    const codeContentMatch = /<pre><code>([\s\S]*)<\/code><\/pre>/s.exec(htmlContent);
    const code = codeContentMatch ? codeContentMatch[1] : `<code>${htmlContent}</code>`;

    const lines = code.split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    return (
        <div className="file-content-viewer">
            <div className="line-numbers">
                {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
            </div>
            <div className="code-content" dangerouslySetInnerHTML={{ __html: code }} />
        </div>
    );
};

const DiffViewer: React.FC<DiffViewerProps> = ({ workspaceContent, aiContent, isDiffMode, filePath, onDiffToggle }) => {
    const [currentDiffIndex, setCurrentDiffIndex] = React.useState(0);
    const diffRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    const changes = React.useMemo(() => {
        const ws = workspaceContent?.replace(/<pre><code>|<\/code><\/pre>/g, '') || '';
        const ai = aiContent?.replace(/<pre><code>|<\/code><\/pre>/g, '') || '';
        return diffLines(ws, ai);
    }, [workspaceContent, aiContent]);

    const diffBlocks = React.useMemo(() => {
        return changes.filter(part => part.added || part.removed);
    }, [changes]);

    React.useEffect(() => {
        diffRefs.current = diffRefs.current.slice(0, diffBlocks.length);
     }, [diffBlocks]);

    React.useEffect(() => {
        if (diffBlocks.length > 0) {
            diffRefs.current[currentDiffIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentDiffIndex, diffBlocks]);

    const handleNextDiff = () => {
        setCurrentDiffIndex(prev => (prev + 1) % diffBlocks.length);
    };

    const handlePrevDiff = () => {
        setCurrentDiffIndex(prev => (prev - 1 + diffBlocks.length) % diffBlocks.length);
    };

    const renderDiff = () => {
        let diffBlockCounter = -1;
        return changes.map((part, index) => {
            const lines = part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '');
            const isDiffBlock = part.added || part.removed;
            if (isDiffBlock) diffBlockCounter++;
            const currentBlockIndex = diffBlockCounter;

            return (
                <div 
                    key={index} 
                    className={`diff-part ${part.added ? 'added' : part.removed ? 'removed' : 'common'} ${currentBlockIndex === currentDiffIndex && isDiffBlock ? 'current-diff' : ''}`}
                    ref={el => { if (isDiffBlock) diffRefs.current[currentBlockIndex] = el; }}
                >
                    {lines.map((line, lineIndex) => (
                        <div key={lineIndex} className="line" dangerouslySetInnerHTML={{ __html: line || ' ' }} />
                    ))}
                </div>
            );
        });
    };

    return (
        <>
            <div className="file-content-viewer-header">
                <span className="file-path" title={filePath || ''}>{filePath || 'No file selected'}</span>
                <div className="file-actions">
                    {isDiffMode && diffBlocks.length > 0 && (
                        <div className="diff-nav">
                            <button onClick={handlePrevDiff} title="Previous Difference"><VscChevronUp /></button>
                            <span>{currentDiffIndex + 1} of {diffBlocks.length}</span>
                            <button onClick={handleNextDiff} title="Next Difference"><VscChevronDown /></button>
                        </div>
                    )}
                    <button onClick={onDiffToggle} disabled={!filePath} title="Toggle Diff View"><VscDiff /></button>
                    <button disabled={!filePath} title="Swap with Workspace File"><VscArrowSwap /></button>
                </div>
            </div>
            <div className="code-viewer-wrapper">
                {isDiffMode ? (
                    <div className="diff-view">
                        {renderDiff()}
                    </div>
                ) : (
                    <CodeViewer htmlContent={aiContent} />
                )}
            </div>
        </>
    );
};

export default DiffViewer;