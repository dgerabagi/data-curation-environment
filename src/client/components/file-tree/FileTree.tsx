import React, { useState, useEffect, useRef } from 'react';
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

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
  collapseTrigger?: number;
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

const FileTree: React.FC<FileTreeProps> = ({ data, onFileClick, selectedFiles, activeFile, updateSelectedFiles, collapseTrigger }) => {
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, node: FileNode } | null>(null);
    const [renamingPath, setRenamingPath] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const clientIpc = ClientPostMessageManager.getInstance();

    const handleNodeClick = (node: FileNode) => {
        if (!node.children) {
            onFileClick?.(node.absolutePath);
        }
    };

    const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filePath: string) => {
        e.stopPropagation();
        updateSelectedFiles(addRemovePathInSelectedFiles(data, filePath, selectedFiles));
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

    const renderFileNodeContent = (node: FileNode, isExpanded: boolean) => {
        const isActive = activeFile === node.absolutePath;
        const isDirectory = Array.isArray(node.children);
        
        // TS ERROR FIX: Replaced path.sep with '/'
        const hasSelectedAncestor = selectedFiles.some(ancestor => node.absolutePath.startsWith(ancestor + '/') && node.absolutePath !== ancestor);
        const isDirectlySelected = selectedFiles.includes(node.absolutePath);
        const isChecked = isDirectlySelected || hasSelectedAncestor;

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

        return (
            <div className={`file-item ${isActive ? 'active' : ''}`} onClick={() => handleNodeClick(node)}>
                <Checkbox
                    className="file-checkbox"
                    checked={isChecked}
                    indeterminate={!isDirectlySelected && !hasSelectedAncestor && selectedFiles.some(p => p.startsWith(node.absolutePath))}
                    onChange={(_, e) => handleFileCheckboxChange(e, node.absolutePath)}
                />
                <span className="file-icon">{isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : getFileIcon(node.name)}</span>
                <span className="file-name">{node.name}</span>
                <div className="file-stats">
                    {isDirectory && node.fileCount > 0 && (<> <VscFiles /> <span>{formatNumberWithCommas(node.fileCount)}</span> </>)}
                    {node.isImage ? (<span>{formatBytes(node.sizeInBytes)}</span>) : (node.tokenCount > 0 && (<> <VscSymbolNumeric /> <span>{formatLargeNumber(node.tokenCount, 1)}</span> </>))}
                </div>
            </div>
        );
    };

    return (
        <div className="file-tree">
            <TreeView data={data} renderNodeContent={(node, isExpanded) => renderFileNodeContent(node, isExpanded as boolean)} onContextMenu={handleContextMenu} collapseTrigger={collapseTrigger} activeFile={activeFile} />
            {contextMenu && <ContextMenu menu={contextMenu} onClose={() => setContextMenu(null)} onRename={handleRename} />}
        </div>
    );
};

export default FileTree;