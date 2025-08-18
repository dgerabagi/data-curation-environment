import React, { useState, useMemo } from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles } from './FileTree.utils';
import Checkbox from '../Checkbox';
import {
    VscFile, VscFolder, VscFolderOpened, VscJson, VscMarkdown, VscSymbolFile, VscSymbolNumeric, VscFiles
} from 'react-icons/vsc';
import { SiTypescript, SiReact, SiJavascript, SiSass } from 'react-icons/si';
import { formatLargeNumber, formatBytes, formatNumberWithCommas } from '@/common/utils/formatting';
import ContextMenu from '../ContextMenu';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { logger } from '@/client/utils/logger';

interface FileTreeProps {
  data: FileNode[];
  checkedFiles: string[];
  activeFile?: string;
  updateCheckedFiles: (checkedFiles: string[]) => void;
  collapseTrigger?: number;
  searchTerm: string;
}

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'ts': return <SiTypescript color="#3178C6" />;
        case 'tsx': return <SiReact color="#61DAFB" />;
        case 'js': return <SiJavascript color="#F7DF1E" />;
        case 'json': return <VscJson color="#F7DF1E" />;
        case 'md': return <VscMarkdown />;
        case 'scss': case 'css': return <SiSass color="#CF649A"/>;
        case 'svg': case 'png': case 'jpg': case 'jpeg': case 'ico': case 'webp': return <VscSymbolFile />;
        default: return <VscFile />;
    }
};

const filterTree = (nodes: FileNode[], term: string): FileNode[] => {
    if (!term) return nodes;
    const lowerCaseTerm = term.toLowerCase();

    return nodes.reduce((acc, node) => {
        if (node.name.toLowerCase().includes(lowerCaseTerm)) {
            acc.push(node);
            return acc;
        }

        if (node.children) {
            const filteredChildren = filterTree(node.children, term);
            if (filteredChildren.length > 0) {
                acc.push({ ...node, children: filteredChildren });
            }
        }
        return acc;
    }, [] as FileNode[]);
};


const FileTree: React.FC<FileTreeProps> = ({ data, checkedFiles, activeFile, updateCheckedFiles, collapseTrigger, searchTerm }) => {
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, node: FileNode } | null>(null);
    const [renamingPath, setRenamingPath] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const clientIpc = ClientPostMessageManager.getInstance();

    const filteredData = useMemo(() => filterTree(data, searchTerm), [data, searchTerm]);

    const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filePath: string) => {
        e.stopPropagation();
        updateCheckedFiles(addRemovePathInSelectedFiles(data, filePath, checkedFiles));
    };

    const handleContextMenu = (event: React.MouseEvent, node: FileNode) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, node });
    };

    const handleRename = () => {
        if (contextMenu) {
            setRenamingPath(contextMenu.node.absolutePath);
            setRenameValue(contextMenu.node.name);
            setContextMenu(null);
        }
    };

    const handleRenameSubmit = () => {
        if (renamingPath && renameValue) {
            clientIpc.sendToServer(ClientToServerChannel.RequestFileRename, { oldPath: renamingPath, newName: renameValue });
        }
        setRenamingPath(null);
    };
    
    const calculateCheckedTokens = useMemo(() => {
        const checkedSet = new Set(checkedFiles);
        const memo = new Map<string, number>();

        const calculate = (node: FileNode): number => {
            if (memo.has(node.absolutePath)) {
                return memo.get(node.absolutePath)!;
            }

            if (checkedSet.has(node.absolutePath)) {
                memo.set(node.absolutePath, node.tokenCount);
                return node.tokenCount;
            }
            
            // Check for ancestor
            for (const checkedPath of checkedSet) {
                if (node.absolutePath.startsWith(checkedPath + '/')) {
                    memo.set(node.absolutePath, node.tokenCount);
                    return node.tokenCount;
                }
            }

            if (!node.children) {
                const result = checkedSet.has(node.absolutePath) ? node.tokenCount : 0;
                memo.set(node.absolutePath, result);
                return result;
            }
    
            const result = node.children.reduce((acc, child) => acc + calculate(child), 0);
            memo.set(node.absolutePath, result);
            return result;
        };
        return calculate;
    }, [checkedFiles]);

    const renderFileNodeContent = (node: FileNode, isExpanded: boolean) => {
        const isDirectory = Array.isArray(node.children);
        
        const hasCheckedAncestor = checkedFiles.some(ancestor => node.absolutePath.startsWith(ancestor + '/') && node.absolutePath !== ancestor);
        const isDirectlyChecked = checkedFiles.includes(node.absolutePath);
        const isChecked = isDirectlyChecked || hasCheckedAncestor;

        if (renamingPath === node.absolutePath) {
            return (
                <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={handleRenameSubmit}
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
                    autoFocus
                    className="rename-input"
                />
            );
        }

        const checkedTokensInDir = isDirectory ? calculateCheckedTokens(node) : 0;
        const isFullyChecked = isDirectory && checkedTokensInDir > 0 && checkedTokensInDir === node.tokenCount;

        const renderTokenCount = () => {
            if (node.isImage) {
                return <span>{formatBytes(node.sizeInBytes)}</span>;
            }
            if (node.tokenCount > 0) {
                let content;
                if (isDirectory) {
                    if (isFullyChecked) {
                        content = `(${formatLargeNumber(node.tokenCount, 1)})`;
                    } else if (checkedTokensInDir > 0) {
                        content = <>{formatLargeNumber(node.tokenCount, 1)} <span className="selected-token-count">({formatLargeNumber(checkedTokensInDir, 1)})</span></>;
                    } else {
                        content = formatLargeNumber(node.tokenCount, 1);
                    }
                } else { // It's a file
                    content = isChecked ? `(${formatLargeNumber(node.tokenCount, 1)})` : formatLargeNumber(node.tokenCount, 1);
                }
                return <><VscSymbolNumeric /> <span>{content}</span></>;
            }
            return null;
        };

        return (
            <div className={`file-item`}>
                <Checkbox
                    className="file-checkbox"
                    checked={isChecked}
                    indeterminate={!isDirectlyChecked && !hasCheckedAncestor && checkedFiles.some(p => p.startsWith(node.absolutePath))}
                    onChange={(_, e) => handleFileCheckboxChange(e, node.absolutePath)}
                />
                <span className="file-icon">{isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : getFileIcon(node.name)}</span>
                <span className="file-name">{node.name}</span>
                <div className="file-stats">
                    {isDirectory && node.fileCount > 0 && (<> <VscFiles /> <span>{formatNumberWithCommas(node.fileCount)}</span> </>)}
                    {renderTokenCount()}
                </div>
            </div>
        );
    };

    return (
        <div className="file-tree">
            <TreeView 
                data={filteredData} 
                renderNodeContent={(node, isExpanded) => renderFileNodeContent(node, isExpanded as boolean)} 
                onContextMenu={handleContextMenu} 
                collapseTrigger={collapseTrigger} 
                activeFile={activeFile} 
            />
            {contextMenu && <ContextMenu menu={contextMenu} onClose={() => setContextMenu(null)} onRename={handleRename} />}
        </div>
    );
};

export default FileTree;