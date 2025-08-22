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
        <div className="diff-viewer-container">
            <div className="diff-header">
                <h3>Diff for {filePath}</h3>
            </div>
            <div className="diff-content">
                {changes.map((part, index) => {
                    const lines = part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '');
                    const partClassName = part.added ? 'added' : part.removed ? 'removed' : 'common';
                    
                    return (
                        <div key={index} className={`diff-part ${partClassName}`}>
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
                                        <span className="line-num orig-num">{displayOriginalLineNum}</span>
                                        <span className="line-num mod-num">{displayModifiedLineNum}</span>
                                        <span className="line-content">
                                            <span className="line-prefix">{part.added ? '+' : part.removed ? '-' : ' '}</span>
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
    );
};

export default DiffViewer;