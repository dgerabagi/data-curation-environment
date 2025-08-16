import React from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles } from './FileTree.utils';
import Checkbox from '../Checkbox';
import {
    VscFile, VscFolder, VscFolderOpened, VscJson, VscMarkdown, VscSymbolFile, VscSymbolNumeric, VscFiles
} from 'react-icons/vsc';
import { SiTypescript, SiReact, SiJavascript, SiSass } from 'react-icons/si';
import { formatLargeNumber, formatBytes, formatNumberWithCommas } from '@/common/utils/formatting';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'ts':
            return <SiTypescript color="#3178C6" />;
        case 'tsx':
            return <SiReact color="#61DAFB" />;
        case 'js':
            return <SiJavascript color="#F7DF1E" />;
        case 'json':
            return <VscJson color="#F7DF1E" />;
        case 'md':
            return <VscMarkdown />;
        case 'scss':
        case 'css':
            return <SiSass color="#CF649A"/>;
        case 'svg':
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'ico':
        case 'webp':
            return <VscSymbolFile />;
        default:
            return <VscFile />;
    }
};

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  activeFile,
  updateSelectedFiles,
}) => {

  const handleNodeClick = (node: FileNode) => {
    if (!node.children) { // Only trigger onFileClick for files
        onFileClick?.(node.absolutePath);
    }
  };

  const isChildPathOf = (child: string, parent: string) => {
    if (child === parent) return false;
    // Normalize paths to use forward slashes for consistent comparison
    const normalizedChild = child.replace(/\\/g, '/');
    const normalizedParent = parent.replace(/\\/g, '/');
    return normalizedChild.startsWith(normalizedParent + '/');
  };

  const renderCheckbox = (filePath: string) => {
    const isSelected = selectedFiles.includes(filePath);
    const hasSelectedAncestor = selectedFiles.some(ancestor => isChildPathOf(filePath, ancestor));
    const hasSelectedDescendant = selectedFiles.some(descendant => isChildPathOf(descendant, filePath));
    
    return (
      <Checkbox
        className="file-checkbox"
        indeterminate={!isSelected && !hasSelectedAncestor && hasSelectedDescendant}
        checked={isSelected || hasSelectedAncestor}
        onChange={(_, e) => handleFileCheckboxChange(e, filePath)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filePath: string) => {
    e.stopPropagation(); // CRITICAL: This prevents the click from bubbling up to the tree node's expansion handler.
    updateSelectedFiles(addRemovePathInSelectedFiles(data, filePath, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode, isExpanded: boolean) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div className={`file-item ${isActive ? 'active' : ''}`} onClick={() => handleNodeClick(node)}>
        {renderCheckbox(node.absolutePath)}
        <span className="file-icon">
            {isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : getFileIcon(node.name)}
        </span>
        <span className="file-name">{node.name}</span>
        <div className="file-stats">
            {isDirectory && node.fileCount > 0 && (
                <>
                    <VscFiles />
                    <span>{formatNumberWithCommas(node.fileCount)}</span>
                </>
            )}
            {node.isImage ? (
                <span>{formatBytes(node.sizeInBytes)}</span>
            ) : (
                node.tokenCount > 0 && (
                    <>
                        <VscSymbolNumeric />
                        <span>{formatLargeNumber(node.tokenCount, 1)}</span>
                    </>
                )
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="file-tree">
      <TreeView 
        data={data} 
        renderNodeContent={(node, isExpanded) => renderFileNodeContent(node, isExpanded as boolean)} 
      />
    </div>
  );
};

export default FileTree;