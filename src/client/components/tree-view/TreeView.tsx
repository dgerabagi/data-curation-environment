import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VscChevronRight } from 'react-icons/vsc';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { logger } from '@/client/utils/logger';

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
    const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
    const [lastClickedPath, setLastClickedPath] = useState<string | null>(null);
    const nodeRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());
    const flatNodeList = useRef<TreeNode[]>([]);
    const clientIpc = ClientPostMessageManager.getInstance();

    const buildFlatNodeList = useCallback((nodes: TreeNode[], expanded: string[]): TreeNode[] => {
        let list: TreeNode[] = [];
        for (const node of nodes) {
            list.push(node);
            if (node.children && expanded.includes(node.absolutePath)) {
                list = list.concat(buildFlatNodeList(node.children, expanded));
            }
        }
        return list;
    }, []);

    useEffect(() => {
        flatNodeList.current = buildFlatNodeList(data, expandedNodes);
    }, [data, expandedNodes, buildFlatNodeList]);

    useEffect(() => {
        if (data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes(prev => [...new Set([...prev, rootNode.absolutePath])]);
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
    }, [collapseTrigger, data]);

    useEffect(() => {
        if (activeFile && data.length > 0) {
            logger.log(`[TreeView] Active file changed: ${activeFile}. Attempting to reveal.`);
            const getParentPaths = (filePath: string, rootPath: string): string[] => {
                if (!filePath.startsWith(rootPath)) {
                    logger.warn(`[TreeView] Active file ${filePath} is not under root ${rootPath}`);
                    return [];
                }
                const relativePath = filePath.substring(rootPath.length + 1);
                const parts = relativePath.split('/');
                const paths: string[] = [];
                let current = rootPath;
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
                setSelectedPaths(new Set([activeFile]));
                setLastClickedPath(activeFile);
                setTimeout(() => {
                    const nodeElement = nodeRefs.current.get(activeFile);
                    if (nodeElement) {
                        nodeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 100);
            }
        }
    }, [activeFile, data]);

    const handleNodeClick = (e: React.MouseEvent, node: TreeNode) => {
        if ((e.target as HTMLElement).closest('.file-checkbox') || (e.target as HTMLElement).closest('.rename-input')) {
            return;
        }
        e.stopPropagation();

        const newSelection = new Set(selectedPaths);
        const path = node.absolutePath;

        if (e.shiftKey && lastClickedPath) {
            const firstIdx = flatNodeList.current.findIndex(f => f.absolutePath === lastClickedPath);
            const currentIdx = flatNodeList.current.findIndex(f => f.absolutePath === path);
            const start = Math.min(firstIdx, currentIdx);
            const end = Math.max(firstIdx, currentIdx);
            if (!e.ctrlKey) newSelection.clear();
            for (let i = start; i <= end; i++) {
                newSelection.add(flatNodeList.current[i].absolutePath);
            }
        } else if (e.ctrlKey) {
            if (newSelection.has(path)) newSelection.delete(path);
            else newSelection.add(path);
            setLastClickedPath(path);
        } else {
            newSelection.clear();
            newSelection.add(path);
            setLastClickedPath(path);
        }
        setSelectedPaths(newSelection);

        if (node.children) {
            setExpandedNodes(prev => {
                const isExpanded = prev.includes(path);
                return isExpanded ? prev.filter(p => p !== path) : [...prev, path];
            });
        } else {
            clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, { path });
        }
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isSelected = selectedPaths.has(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li" ref={el => nodeRefs.current.set(node.absolutePath, el)}>
                    <div
                        className={`treenode-item-wrapper ${isSelected ? 'selected' : ''}`}
                        onClick={(e) => handleNodeClick(e, node)}
                        onContextMenu={(e) => onContextMenu?.(e, node)}
                    >
                        <span className={`treenode-chevron ${isExpanded ? 'expanded' : ''}`}>
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