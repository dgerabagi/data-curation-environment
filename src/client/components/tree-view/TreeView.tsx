import React, { useState, useEffect, useRef } from 'react';
import { VscChevronRight } from 'react-icons/vsc';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

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
    const clientIpc = ClientPostMessageManager.getInstance();

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
        if (activeFile && data.length > 0) {
            const getParentPaths = (filePath: string, rootPath: string): string[] => {
                if (!filePath.startsWith(rootPath)) return [];
    
                const relativePath = filePath.substring(rootPath.length + 1);
                const parts = relativePath.split('/');
                const paths: string[] = [];
                let current = rootPath;
                // Iterate up to the second to last part to get only parent directories
                for (let i = 0; i < parts.length - 1; i++) {
                    current += '/' + parts[i];
                    paths.push(current);
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
                }, 100); // A small delay can help ensure the DOM is updated
            }
        }
    }, [activeFile, data]);


    const handleToggleNode = (e: React.MouseEvent, node: TreeNode) => {
        if ((e.target as HTMLElement).closest('.file-checkbox') || (e.target as HTMLElement).closest('.rename-input')) {
            return;
        }
        e.stopPropagation();
        if (node.children) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.absolutePath);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.absolutePath)
                    : [...prevExpandedNodes, node.absolutePath];
            });
        }
    };
    
    const handleDoubleClick = (node: TreeNode) => {
        if (!node.children) { // It's a file
            clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, { path: node.absolutePath });
        }
    };


    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li" ref={el => nodeRefs.current.set(node.absolutePath, el)}>
                    <div
                        className={`treenode-item-wrapper`}
                        onClick={(e) => handleToggleNode(e, node)}
                        onDoubleClick={() => handleDoubleClick(node)}
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