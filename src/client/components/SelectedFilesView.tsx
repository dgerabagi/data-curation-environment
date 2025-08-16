import * as React from 'react';
import { useState, useMemo } from 'react';
import { FileNode } from '@/common/types/file-node';
import { VscClose, VscChevronUp, VscChevronDown, VscSymbolFile, VscSymbolNumeric } from 'react-icons/vsc';
import { formatLargeNumber } from '@/common/utils/formatting';
import Checkbox from './Checkbox';
import { SiReact, SiSass, SiTypescript, SiJavascript } from 'react-icons/si';
import { VscFile, VscJson, VscMarkdown } from 'react-icons/vsc';

type SortableColumn = 'name' | 'tokenCount';
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
    const [itemsToRemove, setItemsToRemove] = useState<Set<string>>(new Set());

    const sortedFiles = useMemo(() => {
        return [...selectedFileNodes].sort((a, b) => {
            const dir = sortDirection === 'asc' ? 1 : -1;
            if (sortColumn === 'name') {
                return a.name.localeCompare(b.name) * dir;
            }
            return (a.tokenCount - b.tokenCount) * dir;
        });
    }, [selectedFileNodes, sortColumn, sortDirection]);

    const handleSort = (column: SortableColumn) => {
        if (column === sortColumn) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('desc');
        }
    };

    const handleToggleRemove = (path: string, checked: boolean) => {
        setItemsToRemove(prev => {
            const newSet = new Set(prev);
            if (checked) {
                newSet.add(path);
            } else {
                newSet.delete(path);
            }
            return newSet;
        });
    };

    const handleRemoveSelected = () => {
        onRemove(Array.from(itemsToRemove));
        setItemsToRemove(new Set());
    };
    
    const SortIndicator = ({ column }: { column: SortableColumn }) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? <VscChevronUp /> : <VscChevronDown />;
    };

    return (
        <div className="selected-files-panel">
            <div className="panel-header">
                <span>Selected Items</span>
                <span className="token-label">Tokens</span>
            </div>
            <div className="panel-toolbar">
                <button onClick={handleRemoveSelected} disabled={itemsToRemove.size === 0}>
                    Remove selected ({itemsToRemove.size})
                </button>
            </div>
            <div className="selected-files-list-container">
                <div className="selected-list-header">
                    <div className="header-name" onClick={() => handleSort('name')}>
                        <VscSymbolFile /> File <SortIndicator column="name" />
                    </div>
                    <div className="header-tokens" onClick={() => handleSort('tokenCount')}>
                        <VscSymbolNumeric /> Tokens <SortIndicator column="tokenCount" />
                    </div>
                </div>
                <ul className="selected-files-list">
                    {sortedFiles.map(node => (
                        <li key={node.absolutePath}>
                            <Checkbox
                                checked={itemsToRemove.has(node.absolutePath)}
                                onChange={(checked) => handleToggleRemove(node.absolutePath, checked)}
                            />
                            <span className="file-icon">{getFileIcon(node.name)}</span>
                            <span className="file-name" title={node.absolutePath}>{node.name}</span>
                            <span className="file-tokens">{formatLargeNumber(node.tokenCount, 1)}</span>
                            <button className="remove-button" onClick={() => onRemove([node.absolutePath])} title="Remove from selection">
                                <VscClose />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectedFilesView;