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
    collapseTrigger?: number; // New prop to trigger collapse
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent, collapseTrigger = 0 }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

    useEffect(() => {
        // Set initial expanded state only once when data is first loaded
        if (data.length > 0) {
            // Only expand the root node initially
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes([rootNode.absolutePath]);
            }
        }
    }, [data]);

    useEffect(() => {
        // C18 FIX: When collapseTrigger changes, collapse all nodes except the root.
        // Removed 'data' from dependency array to prevent this from firing on refresh.
        if (collapseTrigger > 0 && data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes([rootNode.absolutePath]);
            }
        }
    }, [collapseTrigger]);


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