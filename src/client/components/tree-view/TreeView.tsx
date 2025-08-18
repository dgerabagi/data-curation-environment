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
    updateCheckedFiles: (newChecked: string[]) => void;
    checkedFiles: string[];
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent, collapseTrigger = 0, onContextMenu, activeFile, updateCheckedFiles, checkedFiles }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
    const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
    const [focusedNodePath, setFocusedNodePath] = useState<string | null>(null);
    const [lastClickedPath, setLastClickedPath] = useState<string | null>(null);
    const [draggedPath, setDraggedPath] = useState<string | null>(null);
    const [dropTarget, setDropTarget] = useState<string | null>(null);

    const nodeRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());
    const treeViewRef = useRef<HTMLDivElement>(null);
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
        if (!focusedNodePath && flatNodeList.current.length > 0) {
            setFocusedNodePath(flatNodeList.current[0].absolutePath);
        }
    }, [data, expandedNodes, buildFlatNodeList, focusedNodePath]);

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
            logger.log(`[TreeView] activeFile prop changed: ${activeFile}. Attempting to reveal.`);
            const getParentPaths = (filePath: string, rootPath: string): string[] => {
                if (!filePath.startsWith(rootPath) || filePath === rootPath) {
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
                logger.log(`[TreeView] Parents to expand: ${JSON.stringify(parents)}`);
                setExpandedNodes(prev => [...new Set([...prev, ...parents, rootPath])]);
                setSelectedPaths(new Set([activeFile]));
                setFocusedNodePath(activeFile);
                setLastClickedPath(activeFile);
                setTimeout(() => {
                    const nodeElement = nodeRefs.current.get(activeFile);
                    if (nodeElement) {
                        logger.log(`[TreeView] Scrolling to active file element.`);
                        nodeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        logger.warn(`[TreeView] Could not find ref for active file: ${activeFile}`);
                    }
                }, 150);
            }
        }
    }, [activeFile, data]);

    const handleNodeClick = (e: React.MouseEvent, node: TreeNode) => {
        if ((e.target as HTMLElement).closest('.file-checkbox') || (e.target as HTMLElement).closest('.rename-input')) {
            return;
        }
        e.stopPropagation();

        // Ensure the tree view has focus to capture keyboard events
        treeViewRef.current?.focus();

        const path = node.absolutePath;
        setFocusedNodePath(path);
        
        if (e.shiftKey && lastClickedPath) {
            const newSelection = new Set(e.ctrlKey ? selectedPaths : []);
            const firstIdx = flatNodeList.current.findIndex(f => f.absolutePath === lastClickedPath);
            const currentIdx = flatNodeList.current.findIndex(f => f.absolutePath === path);
            const start = Math.min(firstIdx, currentIdx);
            const end = Math.max(firstIdx, currentIdx);
            if (start !== -1 && end !== -1) {
                for (let i = start; i <= end; i++) {
                    if (flatNodeList.current[i]) {
                        newSelection.add(flatNodeList.current[i].absolutePath);
                    }
                }
            }
            setSelectedPaths(newSelection);
        } else if (e.ctrlKey) {
            const newSelection = new Set(selectedPaths);
            if (newSelection.has(path)) {
                newSelection.delete(path);
            } else {
                newSelection.add(path);
            }
            setSelectedPaths(newSelection);
            setLastClickedPath(path);
        } else {
            setSelectedPaths(new Set([path]));
            setLastClickedPath(path);
            if (node.children) {
                setExpandedNodes(prev => {
                    const isExpanded = prev.includes(path);
                    return isExpanded ? prev.filter(p => p !== path) : [...prev, path];
                });
            } else {
                clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, { path });
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!focusedNodePath) return;

        const currentIndex = flatNodeList.current.findIndex(n => n.absolutePath === focusedNodePath);
        if (currentIndex === -1) return;

        const currentNode = flatNodeList.current[currentIndex];

        const moveFocus = (nextIndex: number) => {
            if (nextIndex >= 0 && nextIndex < flatNodeList.current.length) {
                const nextNodePath = flatNodeList.current[nextIndex].absolutePath;
                setFocusedNodePath(nextNodePath);
                const nodeElement = nodeRefs.current.get(nextNodePath);
                nodeElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        };
        
        e.preventDefault();
        e.stopPropagation();

        switch (e.key) {
            case 'ArrowUp':
                moveFocus(currentIndex - 1);
                break;
            case 'ArrowDown':
                moveFocus(currentIndex + 1);
                break;
            case 'ArrowRight':
                if (currentNode.children) {
                    setExpandedNodes(prev => [...new Set([...prev, currentNode.absolutePath])]);
                }
                break;
            case 'ArrowLeft':
                if (currentNode.children && expandedNodes.includes(currentNode.absolutePath)) {
                    setExpandedNodes(prev => prev.filter(p => p !== currentNode.absolutePath));
                }
                break;
            case ' ': // Spacebar
                const newChecked = new Set(checkedFiles);
                if (newChecked.has(currentNode.absolutePath)) {
                    newChecked.delete(currentNode.absolutePath);
                } else {
                    newChecked.add(currentNode.absolutePath);
                }
                updateCheckedFiles(Array.from(newChecked));
                break;
            case 'Enter':
                if (currentNode.children) {
                     setExpandedNodes(prev => {
                        const isExpanded = prev.includes(currentNode.absolutePath);
                        return isExpanded ? prev.filter(p => p !== currentNode.absolutePath) : [...prev, currentNode.absolutePath];
                    });
                } else {
                    clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, { path: currentNode.absolutePath });
                }
                break;
        }
    };

    // --- Drag and Drop Handlers ---
    const handleDragStart = (e: React.DragEvent, node: TreeNode) => {
        e.stopPropagation();
        setDraggedPath(node.absolutePath);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, node: TreeNode) => {
        e.preventDefault();
        e.stopPropagation();
        if (node.children && node.absolutePath !== draggedPath) {
            setDropTarget(node.absolutePath);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDropTarget(null);
    };

    const handleDrop = (e: React.DragEvent, dropNode: TreeNode) => {
        e.preventDefault();
        e.stopPropagation();
        setDropTarget(null);
        if (draggedPath && dropNode.children && dropNode.absolutePath !== draggedPath) {
            const draggedName = draggedPath.split('/').pop();
            if (draggedName) {
                const newPath = `${dropNode.absolutePath}/${draggedName}`;
                logger.log(`Requesting move from ${draggedPath} to ${newPath}`);
                clientIpc.sendToServer(ClientToServerChannel.RequestMoveFile, { oldPath: draggedPath, newPath });
            }
        }
        setDraggedPath(null);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isSelected = selectedPaths.has(node.absolutePath);
            const isFocused = focusedNodePath === node.absolutePath;
            const isDirectory = !!(node.children && node.children.length > 0);
            const isDropTarget = dropTarget === node.absolutePath;

            return (
                <li key={node.absolutePath} 
                    ref={el => nodeRefs.current.set(node.absolutePath, el)}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, node)}
                    onDragOver={(e) => handleDragOver(e, node)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, node)}
                    className={`treenode-li ${isDropTarget ? 'drop-target' : ''}`}
                >
                    <div
                        className={`treenode-item-wrapper ${isSelected ? 'selected' : ''} ${isFocused ? 'focused' : ''}`}
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
        <div className="tree-view" tabIndex={0} onKeyDown={handleKeyDown} ref={treeViewRef}>
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;