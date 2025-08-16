import React from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles } from './FileTree.utils';
import Checkbox from '../Checkbox';
import {
    VscFile, VscFolder, VscFolderOpened, VscJson, VscMarkdown, VscSymbolFile
} from 'react-icons/vsc';
import { SiTypescript, SiReact, SiJavascript, SiSass } from 'react-icons/si';
import { formatLargeNumber } from '@/common/utils/formatting';

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

  const renderCheckbox = (path: string) => {
    const isSelected = selectedFiles.includes(path);
    // A node is an ancestor if the path starts with the ancestor's path and a separator
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor + '/') && path !== ancestor);
    // A node has a selected descendant if a selected path starts with the node's own path
    const hasSelectedDescendant = selectedFiles.some(descendant => descendant.startsWith(path + '/') && descendant !== path);
    
    return (
      <Checkbox
        className="file-checkbox"
        indeterminate={!isSelected && !hasSelectedAncestor && hasSelectedDescendant}
        checked={isSelected || hasSelectedAncestor}
        onChange={(_, e) => handleFileCheckboxChange(e, path)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    e.stopPropagation();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode, isExpanded: boolean) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div
        className={`file-item ${isActive ? 'active' : ''}`}
        // Let TreeView handle expansion, don't re-handle it here
        // onClick={() => handleNodeClick(node)}
      >
        {renderCheckbox(node.absolutePath)}
        <span className="file-icon">
            {isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : getFileIcon(node.name)}
        </span>
        <span className="file-name">{node.name}</span>
        <span className="token-count">
            {formatLargeNumber(node.tokenCount, 1)}
            {isDirectory && node.fileCount > 0 && ` (${node.fileCount})`}
        </span>
      </div>
    );
  };

  return (
    <div className="file-tree">
      <TreeView 
        data={data} 
        onNodeClick={handleNodeClick}
        renderNodeContent={(node, isExpanded) => renderFileNodeContent(node, isExpanded as boolean)} 
      />
    </div>
  );
};

export default FileTree;