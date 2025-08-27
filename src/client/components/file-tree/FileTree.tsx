import React, { useState, useMemo } from 'react';
import TreeView, { TreeNode } from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import Checkbox from '../Checkbox';
import {
    VscFile, VscFolder, VscFolderOpened, VscJson, VscMarkdown, VscSymbolFile, VscSymbolNumeric, VscFiles, VscError, VscWarning, VscTable
} from 'react-icons/vsc';
import { SiTypescript, SiReact, SiJavascript, SiSass } from 'react-icons/si';
import { FaFileWord } from 'react-icons/fa';
import { formatLargeNumber, formatBytes, formatNumberWithCommas } from '@/common/utils/formatting';
import ContextMenu from '../ContextMenu';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { ProblemCountsMap } from '@/common/ipc/channels.type';
import { logger } from '@/client/utils/logger';

interface FileTreeProps {
  data: FileNode[];
  checkedFiles: string[];
  activeFile?: string;
  updateCheckedFiles: (path: string) => void;
  collapseTrigger?: number;
  expandAllTrigger?: number;
  searchTerm: string;
  problemMap: ProblemCountsMap;
  onNodeDrop?: (event: React.DragEvent, node: FileNode) => void;
  onCopy: (path: string) => void;
  clipboard: { path: string; type: 'copy' } | null;
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
        case 'xlsx': case 'xls': case 'csv': return <VscTable color="#217346" />;
        case 'docx': return <FaFileWord color="#2B579A" />;
        default: return <VscFile />;
    }
};

const getGitStatusTooltip = (status?: string): string => {
    switch (status) {
        case 'M': return 'Modified';
        case 'U': return 'Untracked';
        case 'A': return 'Added';
        case 'D': return 'Deleted';
        case 'C': return 'Conflicted';
        case 'I': return 'Ignored';
        default: return 'Git Status';
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


const FileTree: React.FC<FileTreeProps> = ({ data, checkedFiles, activeFile, updateCheckedFiles, collapseTrigger, expandAllTrigger, searchTerm, problemMap, onNodeDrop, onCopy, clipboard }) => {
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, node: FileNode } | null>(null);
    const [renamingPath, setRenamingPath] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const clientIpc = ClientPostMessageManager.getInstance();

    const filteredData = useMemo(() => filterTree(data, searchTerm), [data, searchTerm]);

    const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filePath: string) => {
        e.stopPropagation();
        updateCheckedFiles(filePath);
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

    const renderFileNodeContent = (node: TreeNode, isExpanded: boolean) => {
        const fileNode = node as FileNode;
        const isDirectory = Array.isArray(fileNode.children);
        
        const hasCheckedAncestor = checkedFiles.some(ancestor => fileNode.absolutePath.startsWith(ancestor + '/') && fileNode.absolutePath !== ancestor);
        const isDirectlyChecked = checkedFiles.includes(fileNode.absolutePath);
        const isChecked = isDirectlyChecked || hasCheckedAncestor;

        if (renamingPath === fileNode.absolutePath) {
            return (
                <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={handleRenameSubmit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSubmit();
                        if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x'].includes(e.key.toLowerCase())) {
                            e.stopPropagation();
                        }
                    }}
                    autoFocus
                    className="rename-input"
                />
            );
        }

        const checkedTokensInDir = isDirectory ? calculateCheckedTokens(fileNode) : 0;
        const isFullyChecked = isDirectory && checkedTokensInDir > 0 && checkedTokensInDir === fileNode.tokenCount;
        
        const liveProblems = problemMap[fileNode.absolutePath];
        const problemData = liveProblems || fileNode.problemCounts;

        const problemErrorCount = problemData?.error || 0;
        const problemWarningCount = problemData?.warning || 0;
        const hasProblems = problemErrorCount > 0 || problemWarningCount > 0;
        const problemColorClass = problemErrorCount > 0 ? 'problem-error' : 'problem-warning';
        const problemTooltip = `${problemErrorCount} Errors, ${problemWarningCount} Warnings`;
        const hasError = !!fileNode.error;

        const renderTokenCount = () => {
            if (hasError) {
                return <span>---</span>;
            }
            if (fileNode.isImage) {
                return <span>{formatBytes(fileNode.sizeInBytes)}</span>;
            }
            if (fileNode.tokenCount > 0) {
                let content;
                if (isDirectory) {
                    if (isFullyChecked) {
                        content = `(${formatLargeNumber(fileNode.tokenCount, 1)})`;
                    } else if (checkedTokensInDir > 0) {
                        content = <>{formatLargeNumber(fileNode.tokenCount, 1)} <span className="selected-token-count">({formatLargeNumber(checkedTokensInDir, 1)})</span></>;
                    } else {
                        content = formatLargeNumber(fileNode.tokenCount, 1);
                    }
                } else { // It's a file
                    content = isChecked ? `(${formatLargeNumber(fileNode.tokenCount, 1)})` : formatLargeNumber(fileNode.tokenCount, 1);
                }
                return <><VscSymbolNumeric /> <span>{content}</span></>;
            }
            return null;
        };

        const gitStatusClass = fileNode.gitStatus ? `git-status-${fileNode.gitStatus}` : '';

        return (
            <div className={`file-item ${gitStatusClass} ${hasProblems ? problemColorClass : ''} ${hasError ? 'has-error' : ''}`} title={fileNode.error}>
                <Checkbox
                    className="file-checkbox"
                    checked={isChecked}
                    indeterminate={!isDirectlyChecked && !hasCheckedAncestor && checkedFiles.some(p => p.startsWith(fileNode.absolutePath))}
                    onChange={(_, e) => handleFileCheckboxChange(e, fileNode.absolutePath)}
                    disabled={hasError || !fileNode.isSelectable}
                />
                <span className="file-icon">{isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : getFileIcon(fileNode.name)}</span>
                <span className="file-name">{fileNode.name}</span>
                <div className="file-stats">
                    {hasError && <span className="error-icon" title={fileNode.error}><VscError/></span>}
                    {fileNode.gitStatus && <span className="git-status-badge" title={getGitStatusTooltip(fileNode.gitStatus)}>{fileNode.gitStatus}</span>}
                    {hasProblems && (
                        <span className="problem-badge" title={problemTooltip}>
                            {problemErrorCount > 0 && <span className='error-icon'><VscError/> {problemErrorCount}</span>}
                            {problemWarningCount > 0 && <span className='warning-icon'><VscWarning/> {problemWarningCount}</span>}
                        </span>
                    )}
                    {isDirectory && fileNode.fileCount > 0 && (<> <VscFiles /> <span>{formatNumberWithCommas(fileNode.fileCount)}</span> </>)}
                    {renderTokenCount()}
                </div>
            </div>
        );
    };

    return (
        <div className="file-tree">
            <TreeView 
                data={filteredData as TreeNode[]} 
                renderNodeContent={(node, isExpanded) => renderFileNodeContent(node, isExpanded as boolean)} 
                onContextMenu={(e, node) => handleContextMenu(e, node as FileNode)} 
                collapseTrigger={collapseTrigger}
                expandAllTrigger={expandAllTrigger}
                activeFile={activeFile} 
                updateCheckedFiles={updateCheckedFiles}
                onNodeDrop={(e, node) => onNodeDrop?.(e, node as FileNode)}
                onCopy={onCopy}
                clipboard={clipboard}
            />
            {contextMenu && <ContextMenu menu={contextMenu} onClose={() => setContextMenu(null)} onRename={handleRename} />}
        </div>
    );
};

export default FileTree;