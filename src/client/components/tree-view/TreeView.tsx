import React, { useState } from 'react';
import { VscChevronRight } from 'react-icons/vsc';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    renderNodeContent?: (node: TreeNode, isExpanded: boolean) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(getExpandedNodes(data));

    const handleNodeClick = (node: TreeNode) => {
        if (node.children && node.children.length > 0) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.absolutePath);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.absolutePath)
                    : [...prevExpandedNodes, node.absolutePath];
            });
        }
        onNodeClick && onNodeClick(node);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div
                        onClick={() => handleNodeClick(node)}
                        className={`treenode-item-wrapper`}
                    >
                        <span className={`treenode-chevron ${isExpanded ? 'expanded' : ''}`}>
                            {isDirectory && <VscChevronRight />}
                        </span>
                        {renderNodeContent ? renderNodeContent(node, isExpanded) : node.name}
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="tree-view">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;