import React, { useEffect, useState } from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles, getFileNodeByPath } from './FileTree.utils';
import Checkbox from '../Checkbox';
import { VscFile, VscFolder, VscFolderOpened } from 'react-icons/vsc';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

// Helper to ensure path comparisons are safe against partial name matches (e.g., 'src' vs 'src-tiled')
const isAncestor = (ancestor: string, descendent: string) => {
    if (ancestor === descendent) return false;
    // Normalize by ensuring ancestor path ends with a separator
    const ancestorWithSlash = ancestor.endsWith('/') ? ancestor : `${ancestor}/`;
    return descendent.startsWith(ancestorWithSlash);
};

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  activeFile,
  updateSelectedFiles,
}) => {

  const rootNode = data.length > 0 ? data[0] : null;

  const [expandedNodes, setExpandedNodes] = useState<string[]>(rootNode ? [rootNode.absolutePath] : []);

  useEffect(() => {
    const toExpand = new Set<string>();
    selectedFiles?.forEach((selectedFile) => {
        const node = getFileNodeByPath(data, selectedFile);
        if (node && node.children) {
            toExpand.add(node.absolutePath);
        }
    });

    setExpandedNodes(prevExpandedNodes => [...new Set([...prevExpandedNodes, ...Array.from(toExpand)])]);
  }, [selectedFiles, data]);

  const handleNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, node: FileNode) => {
    if (e && (e.target as HTMLElement)?.closest('.file-checkbox')) {
        return;
    }
    onFileClick && onFileClick(node.absolutePath);
  };

  const renderCheckbox = (path: string) => {
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => isAncestor(ancestor, path));
    const hasSelectedDescendant = selectedFiles.some(descendant => isAncestor(path, descendant));
    
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
    e.preventDefault();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode, isExpanded: boolean) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div
        className={`file-item ${isActive ? 'active' : ''}`}
        onClick={(e) => handleNodeClick(e, node)}
      >
        {renderCheckbox(node.absolutePath)}
        <span className="file-icon">
            {isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : <VscFile />}
        </span>
        <span className="file-name">{node.name}</span>
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