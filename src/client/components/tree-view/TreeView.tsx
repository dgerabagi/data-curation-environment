import React, { useState, useEffect } from 'react';
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
    renderNodeContent?: (node: TreeNode, isExpanded: boolean) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

    useEffect(() => {
        // Set initial expanded state only once when data is first loaded
        if (data.length > 0 && expandedNodes.length === 0) {
            setExpandedNodes(getExpandedNodes(data));
        }
    }, [data]);

    const handleToggleNode = (e: React.MouseEvent, nodePath: string) => {
        // Robustness fix: Do not toggle if the click was on a checkbox.
        if ((e.target as HTMLElement).closest('.file-checkbox')) {
            return;
        }
        e.stopPropagation(); // Prevent the click from bubbling to the parent item wrapper
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
                    <div className={`treenode-item-wrapper`} onClick={(e) => isDirectory && handleToggleNode(e, node.absolutePath)}>
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