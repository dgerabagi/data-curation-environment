import React, { useState, useEffect } from 'react';
import { VscChevronRight } from 'react-icons/vsc';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    renderNodeContent?: (node: TreeNode, isExpanded: boolean) => React.ReactNode;
    collapseTrigger?: number;
    onContextMenu?: (event: React.MouseEvent, node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent, collapseTrigger = 0, onContextMenu }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes([rootNode.absolutePath]);
            }
        }
    }, [data]);

    useEffect(() => {
        if (collapseTrigger > 0 && data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes([rootNode.absolutePath]);
            }
        }
    }, [collapseTrigger]);


    const handleToggleNode = (e: React.MouseEvent, nodePath: string) => {
        // Prevent toggling when clicking on checkbox or rename input
        if ((e.target as HTMLElement).closest('.file-checkbox') || (e.target as HTMLElement).closest('.rename-input')) {
            return;
        }
        e.stopPropagation();
        setExpandedNodes((prevExpandedNodes) => {
            const isExpanded = prevExpandedNodes.includes(nodePath);
            return isExpanded
                ? prevExpandedNodes.filter((n) => n !== nodePath)
                : [...prevExpandedNodes, nodePath];
        });
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div
                        className={`treenode-item-wrapper`}
                        onClick={(e) => isDirectory && handleToggleNode(e, node.absolutePath)}
                        onContextMenu={(e) => onContextMenu?.(e, node)}
                    >
                        <span 
                            className={`treenode-chevron ${isExpanded ? 'expanded' : ''}`}
                        >
                            {isDirectory && <VscChevronRight />}
                        </span>
                        <div className="treenode-content">
                            {renderNodeContent ? renderNodeContent(node, isExpanded) : node.name}
                        </div>
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