import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { FileNode } from '@/common/types/file-node';
import { VscChevronUp, VscChevronDown, VscSymbolFile, VscSymbolNumeric, VscTypeHierarchy } from 'react-icons/vsc';
import { formatLargeNumber } from '@/common/utils/formatting';
import { SiReact, SiSass, SiTypescript, SiJavascript } from 'react-icons/si';
import { VscFile, VscJson, VscMarkdown } from 'react-icons/vsc';
import { logger } from '../utils/logger';

type SortableColumn = 'name' | 'tokenCount' | 'extension';
type SortDirection = 'asc' | 'desc';

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'ts': return <SiTypescript color="#3178C6" />;
        case 'tsx': return <SiReact color="#61DAFB" />;
        case 'js': return <SiJavascript color="#F7DF1E" />;
        case 'json': return <VscJson color="#F7DF1E" />;
        case 'md': return <VscMarkdown />;
        case 'scss': case 'css': return <SiSass color="#CF649A"/>;
        default: return <VscFile />;
    }
};

interface SelectedFilesViewProps {
    selectedFileNodes: FileNode[];
    onRemove: (pathsToRemove: string[]) => void;
}

const SelectedFilesView: React.FC<SelectedFilesViewProps> = ({ selectedFileNodes, onRemove }) => {
    const [sortColumn, setSortColumn] = useState<SortableColumn>('tokenCount');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [selection, setSelection] = useState<Set<string>>(new Set());
    const firstClickedPath = useRef<string | null>(null); // Anchor for shift-click

    // Reset selection when the list of files changes
    useEffect(() => {
        setSelection(new Set());
    }, [selectedFileNodes]);

    const sortedFiles = useMemo(() => {
        return [...selectedFileNodes].sort((a, b) => {
            const dir = sortDirection === 'asc' ? 1 : -1;
            if (sortColumn === 'name') {
                return a.name.localeCompare(b.name, undefined, { numeric: true }) * dir;
            }
            if (sortColumn === 'extension') {
                const extA = a.extension || '';
                const extB = b.extension || '';
                if (extA !== extB) {
                    return extA.localeCompare(extB) * dir;
                }
                // Sub-sort by token count if extensions are the same
                return (b.tokenCount - a.tokenCount);
            }
            // Default and tokenCount sort
            return (a.tokenCount - b.tokenCount) * dir;
        });
    }, [selectedFileNodes, sortColumn, sortDirection]);

    const handleSort = (column: SortableColumn) => {
        if (column === sortColumn) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection(column === 'tokenCount' ? 'desc' : 'asc');
        }
    };

    const handleItemClick = (e: React.MouseEvent, path: string) => {
        const newSelection = new Set(selection);

        if (e.shiftKey && firstClickedPath.current) {
            const firstIdx = sortedFiles.findIndex(f => f.absolutePath === firstClickedPath.current);
            const currentIdx = sortedFiles.findIndex(f => f.absolutePath === path);
            const start = Math.min(firstIdx, currentIdx);
            const end = Math.max(firstIdx, currentIdx);
            
            if (!e.ctrlKey) newSelection.clear();

            for (let i = start; i <= end; i++) {
                newSelection.add(sortedFiles[i].absolutePath);
            }
        } else if (e.ctrlKey) {
            if (newSelection.has(path)) {
                newSelection.delete(path);
            } else {
                newSelection.add(path);
            }
            firstClickedPath.current = path; // Update anchor on ctrl-click
        } else {
            newSelection.clear();
            newSelection.add(path);
            firstClickedPath.current = path; // Set anchor on simple click
        }
        
        setSelection(newSelection);
    };

    const handleRemoveSelected = () => {
        logger.log(`"Remove selected" button clicked. Removing ${selection.size} items.`);
        onRemove(Array.from(selection));
        setSelection(new Set());
    };
    
    const SortIndicator = ({ column }: { column: SortableColumn }) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? <VscChevronUp /> : <VscChevronDown />;
    };

    return (
        <div className="selected-files-panel">
            <div className="panel-header">
                <span>Selected Items ({selectedFileNodes.length})</span>
            </div>
            <div className="panel-toolbar">
                <button onClick={handleRemoveSelected} disabled={selection.size === 0}>
                    Remove selected ({selection.size})
                </button>
            </div>
            <div className="selected-files-list-container">
                <div className="selected-list-header">
                    <div className="header-index">#</div>
                    <div className="header-type" onClick={() => handleSort('extension')} title="Sort by File Type">
                        <VscTypeHierarchy /> <SortIndicator column="extension" />
                    </div>
                    <div className="header-name" onClick={() => handleSort('name')}>
                        <VscSymbolFile /> File <SortIndicator column="name" />
                    </div>
                    <div className="header-tokens" onClick={() => handleSort('tokenCount')}>
                        <VscSymbolNumeric /> Tokens <SortIndicator column="tokenCount" />
                    </div>
                </div>
                <ul className="selected-files-list">
                    {sortedFiles.map((node, index) => (
                        <li key={node.absolutePath} 
                            className={selection.has(node.absolutePath) ? 'selected' : ''}
                            onClick={(e) => handleItemClick(e, node.absolutePath)}
                        >
                            <span className="file-index">{index + 1}</span>
                            <span className="file-icon">{getFileIcon(node.name)}</span>
                            <span className="file-name" title={node.absolutePath}>{node.name}</span>
                            <span className="file-tokens">{formatLargeNumber(node.tokenCount, 1)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectedFilesView;