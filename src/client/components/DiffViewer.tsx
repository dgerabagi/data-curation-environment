// src/client/components/DiffViewer.tsx
import * as React from 'react';
import { diffLines, Change } from 'diff';

interface DiffViewerProps {
    original: string;
    modified: string;
    filePath: string;
    onClose: () => void;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified, filePath, onClose }) => {
    const changes = diffLines(original, modified);

    let originalLineNum = 1;
    let modifiedLineNum = 1;

    return (
        <div className="diff-modal-overlay" onClick={onClose}>
            <div className="diff-modal-content" onClick={e => e.stopPropagation()}>
                <h3>Diff for {filePath}</h3>
                <button onClick={onClose} style={{ alignSelf: 'flex-end' }}>Close</button>
                <div className="diff-viewer">
                    {changes.map((part, index) => {
                        const lines = part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '');
                        const partClassName = part.added ? 'added' : part.removed ? 'removed' : 'common';
                        
                        return (
                            <div key={index} className={partClassName}>
                                {lines.map((line, lineIndex) => {
                                    let displayOriginalLineNum = '';
                                    let displayModifiedLineNum = '';

                                    if (!part.added) {
                                        displayOriginalLineNum = (originalLineNum++).toString();
                                    }
                                    if (!part.removed) {
                                        displayModifiedLineNum = (modifiedLineNum++).toString();
                                    }

                                    return (
                                        <div key={lineIndex} className="line">
                                            <span className="line-num">{displayOriginalLineNum}</span>
                                            <span className="line-num">{displayModifiedLineNum}</span>
                                            <span className="line-content">
                                                {part.added ? '+ ' : part.removed ? '- ' : '  '}
                                                {line}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;