import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { FileNode } from '@/common/types/file-node';
import { VscChevronUp, VscChevronDown, VscSymbolFile, VscSymbolNumeric, VscTypeHierarchy, VscClose, VscChevronRight, VscChevronLeft } from 'react-icons/vsc';
import { formatLargeNumber } from '@/common/utils/formatting';
import { SiReact, SiSass, SiTypescript, SiJavascript } from 'react-icons/si';
import { VscFile, VscJson, VscMarkdown } from 'react-icons/vsc';
import { logger } from '../utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

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

const getTokenBackgroundColor = (tokenCount: number): string => {
    // 0 - 8k: green
    if (tokenCount <= 8000) return 'hsla(120, 60%, 50%, 0.1)';
    // 8k - 10k: green to yellow
    if (tokenCount <= 10000) {
        const percentage = (tokenCount - 8000) / 2000;
        const hue = 120 - (percentage * 60); // 120 (green) -> 60 (yellow)
        return `hsla(${hue}, 70%, 50%, 0.15)`;
    }
    // 10k - 12k: yellow to red
    if (tokenCount <= 12000) {
        const percentage = (tokenCount - 10000) / 2000;
        const hue = 60 - (percentage * 60); // 60 (yellow) -> 0 (red)
        return `hsla(${hue}, 70%, 50%, 0.2)`;
    }
    // 12k - 40k: red to orange
    if (tokenCount <= 40000) {
        const percentage = (tokenCount - 12000) / 28000;
        const hue = 0 + (percentage * 30); // 0 (red) -> 30 (orange)
        return `hsla(${hue}, 80%, 50%, 0.25)`;
    }
    // 40k+: max orange
    return 'hsla(30, 90%, 50%, 0.3)';
};

const getTokenRiskTooltip = (tokenCount: number): string => {
    if (tokenCount <= 8000) return 'Low token count, suitable for most workloads.';
    if (tokenCount <= 10000) return 'Slightly elevated token count, small chance of performance degradation.';
    if (tokenCount <= 12000) return 'Moderate token count, may impact performance on complex tasks.';
    if (tokenCount <= 40000) return 'High token count, increased chance of performance degradation or truncation.';
    return 'Very high token count. Consider refactoring to reduce size for reliable AI processing.';
};


interface SelectedFilesViewProps {
    selectedFileNodes: FileNode[];
    onRemove: (pathsToRemove: string[]) => void;
    isMinimized: boolean;
    onToggleMinimize: () => void;
}

const SelectedFilesView: React.FC<SelectedFilesViewProps> = ({ selectedFileNodes, onRemove, isMinimized, onToggleMinimize }) => {
    const [sortColumn, setSortColumn] = useState<SortableColumn>('tokenCount');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [selection, setSelection] = useState<Set<string>>(new Set());
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const firstClickedPath = useRef<string | null>(null); // Anchor for shift-click
    const listRef = useRef<HTMLUListElement>(null);
    const clientIpc = ClientPostMessageManager.getInstance();

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
        if ((e.target as HTMLElement).closest('.quick-remove-icon')) {
            return;
        }
        
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
            clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, { path });
            // C38 Fix: Re-focus the list after a delay to reclaim focus from the editor
            setTimeout(() => listRef.current?.focus(), 100);
            newSelection.clear();
            newSelection.add(path);
            firstClickedPath.current = path;
        }
        
        setSelection(newSelection);
    };
    
    const handleRemoveSelected = () => {
        logger.log(`"Remove selected" button clicked. Removing ${selection.size} items.`);
        onRemove(Array.from(selection));
        setSelection(new Set());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
        switch (e.key) {
            case 'a':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    logger.log('Ctrl+A detected in SelectedFilesView.');
                    const allPaths = new Set(sortedFiles.map(f => f.absolutePath));
                    setSelection(allPaths);
                }
                break;
            case 'Delete':
                e.preventDefault();
                e.stopPropagation();
                if (selection.size > 0) {
                    logger.log(`Delete key pressed. Removing ${selection.size} items.`);
                    handleRemoveSelected();
                }
                break;
        }
    };

    const handleContainerClick = () => {
        listRef.current?.focus();
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
    };

    const handleSelectAll = () => {
        const allPaths = new Set(sortedFiles.map(f => f.absolutePath));
        setSelection(allPaths);
        setContextMenu(null);
    };

    const handleDeselectAll = () => {
        setSelection(new Set());
        setContextMenu(null);
    };
    
    const SortIndicator = ({ column }: { column: SortableColumn }) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? <VscChevronUp /> : <VscChevronDown />;
    };

    return (
        <div className="selected-files-panel" onClick={handleContainerClick}>
            <div className="panel-header">
                <span>Selected Items ({selectedFileNodes.length})</span>
                <button onClick={onToggleMinimize} className="toolbar-button" title={isMinimized ? "Expand" : "Minimize"}>
                    {isMinimized ? <VscChevronRight /> : <VscChevronDown />}
                </button>
            </div>
            {!isMinimized && (
                <>
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
                        <ul className="selected-files-list" ref={listRef} tabIndex={0} onKeyDown={handleKeyDown} onContextMenu={handleContextMenu}>
                            {sortedFiles.map((node, index) => (
                                <li key={node.absolutePath} 
                                    className={selection.has(node.absolutePath) ? 'selected' : ''}
                                    onClick={(e) => handleItemClick(e, node.absolutePath)}
                                    onMouseEnter={() => setHoveredPath(node.absolutePath)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    style={{ backgroundColor: node.isImage ? 'transparent' : getTokenBackgroundColor(node.tokenCount) }}
                                    title={node.isImage ? `Binary file: ${node.name}` : getTokenRiskTooltip(node.tokenCount)}
                                >
                                    <span className="file-index">
                                        {hoveredPath === node.absolutePath ? (
                                            <span 
                                                className="quick-remove-icon" 
                                                title="Remove from selection"
                                                onClick={(e) => { e.stopPropagation(); onRemove([node.absolutePath]); }}
                                            >
                                                <VscClose />
                                            </span>
                                        ) : (
                                            index + 1
                                        )}
                                    </span>
                                    <span className="file-icon">{getFileIcon(node.name)}</span>
                                    <span className="file-name" title={node.absolutePath}>{node.name}</span>
                                    <span className="file-tokens">{formatLargeNumber(node.tokenCount, 1)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
            {contextMenu && (
                 <>
                    <div className="context-menu-overlay" onClick={() => setContextMenu(null)}></div>
                    <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                        <ul>
                            <li onClick={handleSelectAll}>Select All</li>
                            <li onClick={handleDeselectAll}>Deselect All</li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectedFilesView;