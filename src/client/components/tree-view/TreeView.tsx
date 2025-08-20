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
    expandAllTrigger?: number;
    onContextMenu?: (event: React.MouseEvent, node: TreeNode) => void;
    activeFile?: string;
    updateCheckedFiles: (path: string) => void;
    onNodeDrop?: (event: React.DragEvent, node: TreeNode) => void;
    onCopy: (path: string) => void;
    clipboard: { path: string; type: 'copy' } | null;
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent, collapseTrigger = 0, expandAllTrigger = 0, onContextMenu, activeFile, updateCheckedFiles, onNodeDrop, onCopy, clipboard }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
    const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
    const [focusedNodePath, setFocusedNodePath] = useState<string | null>(null);
    const [lastClickedPath, setLastClickedPath] = useState<string | null>(null);
    const [draggedPath, setDraggedPath] = useState<string | null>(null);
    const [dropTarget, setDropTarget] = useState<string | null>(null);
    const expansionTimer = useRef<NodeJS.Timeout | null>(null);

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

    const expandNode = (path: string) => {
        setExpandedNodes(prev => [...new Set([...prev, path])]);
    };

    useEffect(() => {
        if (data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                expandNode(rootNode.absolutePath);
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
        if (expandAllTrigger > 0 && data.length > 0) {
            const allDirPaths: string[] = [];
            const collectDirs = (node: TreeNode) => {
                if (node.children) {
                    allDirPaths.push(node.absolutePath);
                    node.children.forEach(collectDirs);
                }
            };
            data.forEach(collectDirs);
            setExpandedNodes(allDirPaths);
        }
    }, [expandAllTrigger, data]);

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
                setTimeout(() => treeViewRef.current?.focus(), 100);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'c':
                    e.preventDefault(); e.stopPropagation();
                    if (focusedNodePath) {
                        logger.log(`Copying path to clipboard: ${focusedNodePath}`);
                        onCopy(focusedNodePath);
                    }
                    return;
                case 'v':
                    e.preventDefault(); e.stopPropagation();
                    if (clipboard && focusedNodePath) {
                        const targetNode = flatNodeList.current.find(n => n.absolutePath === focusedNodePath);
                        if (targetNode) {
                            const destinationDir = targetNode.children ? targetNode.absolutePath : targetNode.absolutePath.substring(0, targetNode.absolutePath.lastIndexOf('/'));
                            logger.log(`Pasting ${clipboard.path} into ${destinationDir}`);
                            clientIpc.sendToServer(ClientToServerChannel.RequestCopyFile, { sourcePath: clipboard.path, destinationDir });
                        }
                    }
                    return;
                case 'z':
                    e.preventDefault(); e.stopPropagation();
                    clientIpc.sendToServer(ClientToServerChannel.RequestUndo, {});
                    return;
                case 'y':
                    e.preventDefault(); e.stopPropagation();
                    clientIpc.sendToServer(ClientToServerChannel.RequestRedo, {});
                    return;
            }
        }

        if (!focusedNodePath) return;
        const currentIndex = flatNodeList.current.findIndex(n => n.absolutePath === focusedNodePath);
        if (currentIndex === -1) return;
        const currentNode = flatNodeList.current[currentIndex];

        const moveFocus = (nextIndex: number) => {
            if (nextIndex >= 0 && nextIndex < flatNodeList.current.length) {
                const nextNodePath = flatNodeList.current[nextIndex].absolutePath;
                setFocusedNodePath(nextNodePath);
                nodeRefs.current.get(nextNodePath)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        };
        
        switch (e.key) {
            case 'ArrowUp': e.preventDefault(); e.stopPropagation(); moveFocus(currentIndex - 1); break;
            case 'ArrowDown': e.preventDefault(); e.stopPropagation(); moveFocus(currentIndex + 1); break;
            case 'ArrowRight': e.preventDefault(); e.stopPropagation(); if (currentNode.children) expandNode(currentNode.absolutePath); break;
            case 'ArrowLeft': e.preventDefault(); e.stopPropagation(); if (currentNode.children && expandedNodes.includes(currentNode.absolutePath)) setExpandedNodes(prev => prev.filter(p => p !== currentNode.absolutePath)); break;
            case ' ': e.preventDefault(); e.stopPropagation(); updateCheckedFiles(currentNode.absolutePath); break;
            case 'Enter': e.preventDefault(); e.stopPropagation(); if (currentNode.children) setExpandedNodes(prev => prev.includes(currentNode.absolutePath) ? prev.filter(p => p !== currentNode.absolutePath) : [...prev, currentNode.absolutePath]); else clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, { path: currentNode.absolutePath }); break;
        }
    };

    // --- Drag/Drop ---
    const handleInternalDragStart = (e: React.DragEvent, node: TreeNode) => {
        e.stopPropagation();
        setDraggedPath(node.absolutePath);
        e.dataTransfer.effectAllowed = 'move';
        logger.log(`Internal Drag Start: ${node.name}`);
    };

    const handleDragEnter = (e: React.DragEvent, node: TreeNode) => {
        e.preventDefault();
        e.stopPropagation();
        logger.log(`Drag Enter on node: ${node.name}`);
        if (node.children && node.absolutePath !== draggedPath) {
            setDropTarget(node.absolutePath);
            if (!expandedNodes.includes(node.absolutePath)) {
                expansionTimer.current = setTimeout(() => {
                    logger.log(`Hover-expanding node: ${node.name}`);
                    expandNode(node.absolutePath);
                }, 500);
            }
        }
    };

    const handleDragLeave = (e: React.DragEvent, node: TreeNode) => {
        e.preventDefault();
        e.stopPropagation();
        logger.log(`Drag Leave from node: ${node.name}`);
        if (dropTarget === node.absolutePath) {
            setDropTarget(null);
        }
        if (expansionTimer.current) {
            clearTimeout(expansionTimer.current);
            expansionTimer.current = null;
        }
    };

    const handleDrop = (e: React.DragEvent, node: TreeNode) => {
        e.preventDefault();
        e.stopPropagation();
        logger.log(`Drop on node: ${node.name}`);
        setDropTarget(null);
        if (expansionTimer.current) {
            clearTimeout(expansionTimer.current);
            expansionTimer.current = null;
        }

        if (draggedPath) { // Internal move
            if (node.children && node.absolutePath !== draggedPath && !node.absolutePath.startsWith(draggedPath + '/')) {
                const draggedName = draggedPath.split('/').pop();
                if (draggedName) {
                    const newPath = `${node.absolutePath}/${draggedName}`;
                    logger.log(`Requesting internal move from ${draggedPath} to ${newPath}`);
                    clientIpc.sendToServer(ClientToServerChannel.RequestMoveFile, { oldPath: draggedPath, newPath });
                }
            }
            setDraggedPath(null);
        } else if (onNodeDrop) { // External drop
            onNodeDrop(e, node);
        }
    };
    
    const handleDragOver = (e: React.DragEvent, node: TreeNode) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedPath && node.absolutePath.startsWith(draggedPath + '/')) {
            e.dataTransfer.dropEffect = 'none'; // Prevent dropping a folder into itself
        } else {
            e.dataTransfer.dropEffect = 'move';
        }
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
                    onDragStart={(e) => handleInternalDragStart(e, node)}
                    onDragEnter={(e) => handleDragEnter(e, node)}
                    onDragLeave={(e) => handleDragLeave(e, node)}
                    onDragOver={(e) => handleDragOver(e, node)}
                    onDrop={(e) => handleDrop(e, node)}
                    className={`treenode-li ${isDropTarget ? 'drop-target' : ''}`}
                    data-path={node.absolutePath}
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
        <div 
            className="tree-view" 
            tabIndex={0} 
            onKeyDown={handleKeyDown} 
            ref={treeViewRef}
            onClick={() => treeViewRef.current?.focus()}
        >
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;