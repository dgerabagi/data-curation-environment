import React, { useState, useEffect, useRef } from 'react';
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
    activeFile?: string;
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent, collapseTrigger = 0, onContextMenu, activeFile }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
    const nodeRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());

    // Effect to expand the root node by default
    useEffect(() => {
        if (data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes(prev => [...new Set([...prev, rootNode.absolutePath])]);
            }
        }
    }, [data]);

    // Effect to handle collapsing all nodes
    useEffect(() => {
        if (collapseTrigger > 0 && data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes([rootNode.absolutePath]);
            }
        }
    }, [collapseTrigger, data]);

    // Effect to reveal and scroll to the active file
    useEffect(() => {
        if (activeFile) {
            const getParentPaths = (filePath: string, rootPath: string): string[] => {
                const normalizedFilePath = filePath.replace(/\\/g, '/');
                const normalizedRootPath = rootPath.replace(/\\/g, '/');
                if (!normalizedFilePath.startsWith(normalizedRootPath)) return [];

                const relativePath = normalizedFilePath.substring(normalizedRootPath.lastIndexOf('/') + 1);
                const parts = relativePath.split('/');
                const paths = [];
                let current = rootPath;
                for (let i = 0; i < parts.length - 1; i++) {
                    current += '/' + parts[i];
                    paths.push(current.replace(rootPath, data[0].absolutePath));
                }
                return paths;
            };

            const rootPath = data[0]?.absolutePath;
            if (rootPath) {
                const parents = getParentPaths(activeFile, rootPath);
                setExpandedNodes(prev => [...new Set([...prev, ...parents, rootPath])]);
                
                // Scroll into view on the next tick after state has updated
                setTimeout(() => {
                    const nodeElement = nodeRefs.current.get(activeFile);
                    nodeElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 0);
            }
        }
    }, [activeFile, data]);


    const handleToggleNode = (e: React.MouseEvent, nodePath: string) => {
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
                <li key={node.absolutePath} className="treenode-li" ref={el => nodeRefs.current.set(node.absolutePath, el)}>
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