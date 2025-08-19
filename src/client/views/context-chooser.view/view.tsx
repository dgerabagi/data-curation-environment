import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric, VscCollapseAll, VscRefresh, VscNewFile, VscNewFolder, VscLoading, VscSave, VscFolderLibrary, VscSettingsGear, VscCheckAll, VscSearch, VscExpandAll } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import SelectedFilesView from '@/client/components/SelectedFilesView';
import { addRemovePathInSelectedFiles, removePathsFromSelected } from '@/client/components/file-tree/FileTree.utils';
import { SelectionSet, ProblemCountsMap } from '@/common/ipc/channels.type';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [checkedFiles, setCheckedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    const [collapseTrigger, setCollapseTrigger] = useState(0);
    const [expandAllTrigger, setExpandAllTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectionSets, setSelectionSets] = useState<SelectionSet>({});
    const [isSelectionListMinimized, setIsSelectionListMinimized] = useState(false);
    const [isAutoAddEnabled, setIsAutoAddEnabled] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [problemMap, setProblemMap] = useState<ProblemCountsMap>({});
    const [isDragging, setIsDragging] = useState(false);
    const suppressActiveFileReveal = useRef(false);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const requestFiles = (force = false) => {
        setIsLoading(true);
        logger.log(`Requesting workspace files (force=${force}).`);
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, { force });
    };

    const updateCheckedFiles = useCallback((path: string) => {
        const isChecking = !checkedFiles.some(checkedPath => path.startsWith(checkedPath));

        setCheckedFiles(currentChecked => {
            const newChecked = addRemovePathInSelectedFiles(files, path, currentChecked);
            clientIpc.sendToServer(ClientToServerChannel.SaveCurrentSelection, { paths: newChecked });
            return newChecked;
        });

        if (isChecking && path.toLowerCase().endsWith('.pdf')) {
            logger.log(`Requesting text for PDF: ${path}`);
            clientIpc.sendToServer(ClientToServerChannel.RequestPdfToText, { path });
        }
    }, [clientIpc, files, checkedFiles]);

    useEffect(() => {
        logger.log("Initializing view and requesting initial data.");
        
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, ({ files: receivedFiles }) => {
            logger.log(`Received file tree from backend. Root node: ${receivedFiles[0]?.name}`);
            setFiles(receivedFiles);
            setIsLoading(false);
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.ApplySelectionSet, ({ paths }) => {
            logger.log(`Applying selection set with ${paths.length} paths.`);
            setCheckedFiles(paths); // Direct set, not toggle
            clientIpc.sendToServer(ClientToServerChannel.SaveCurrentSelection, { paths });
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendSelectionSets, ({ sets }) => {
            logger.log(`Received ${Object.keys(sets).length} selection sets.`);
            setSelectionSets(sets);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SetActiveFile, ({ path }) => {
            if (suppressActiveFileReveal.current) {
                logger.log(`[WebView] Suppressing set active file event for: ${path}`);
                suppressActiveFileReveal.current = false; // Reset after first suppression
                return;
            }
            logger.log(`[WebView] Received set active file event for: ${path}`);
            setActiveFile(path);
        });

        clientIpc.onServerMessage(ServerToClientChannel.FocusFile, ({ path }) => {
            logger.log(`Received focus file event for: ${path}`);
            setActiveFile(path);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendAutoAddState, ({ enabled }) => {
            logger.log(`Received auto-add state: ${enabled}`);
            setIsAutoAddEnabled(enabled);
        });

        clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => {
            logger.log(`Force refresh triggered from backend. Reason: ${reason || 'unknown'}`);
            if (reason === 'fileOp') {
                suppressActiveFileReveal.current = true;
                setTimeout(() => { suppressActiveFileReveal.current = false; }, 2000);
            }
            requestFiles(true);
            clientIpc.sendToServer(ClientToServerChannel.RequestLastSelection, {});
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateProblemCounts, ({ problemMap: newProblemMap }) => {
            logger.log(`Received dynamic problem counts update with ${Object.keys(newProblemMap).length} entries.`);
            setProblemMap(newProblemMap);
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateNodeStats, ({ path, tokenCount, error }) => {
            logger.log(`Received stats update for ${path}. New token count: ${tokenCount}, Error: ${error}`);
            setFiles(currentFiles => {
                const newFiles = JSON.parse(JSON.stringify(currentFiles)); // Deep copy for mutation
                let nodeUpdated = false;

                const findAndUpdate = (nodes: FileNode[]) => {
                    for (const node of nodes) {
                        if (node.absolutePath === path) {
                            node.tokenCount = tokenCount;
                            node.error = error;
                            nodeUpdated = true;
                            return true;
                        }
                        if (node.children && findAndUpdate(node.children)) {
                            return true;
                        }
                    }
                    return false;
                };

                findAndUpdate(newFiles);
                if (nodeUpdated) {
                    return newFiles;
                }
                return currentFiles;
            });
        });

        requestFiles();
        clientIpc.sendToServer(ClientToServerChannel.RequestLastSelection, {});

    }, [clientIpc]);

    const handleFlattenClick = () => {
        logger.log(`Flatten Context button clicked with ${checkedFiles.length} paths.`);
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: checkedFiles });
    };

    const handleRefresh = () => {
        logger.log("Refresh button clicked.");
        requestFiles(true);
    };
    
    const handleExpandAll = () => {
        logger.log("Expand All button clicked.");
        setExpandAllTrigger(c => c + 1);
    };

    const handleCollapseAll = () => {
        logger.log("Collapse All button clicked.");
        setCollapseTrigger(c => c + 1);
    };

    const getParentDirForNewItem = (): string => {
        if (activeFile) {
            const nodeMap = new Map<string, FileNode>();
            const buildMap = (node: FileNode) => {
                nodeMap.set(node.absolutePath, node);
                node.children?.forEach(buildMap);
            };
            files.forEach(buildMap);
            const activeNode = nodeMap.get(activeFile);
            if (activeNode) {
                return activeNode.children ? activeNode.absolutePath : activeFile.substring(0, activeFile.lastIndexOf('/'));
            }
        }
        return files.length > 0 ? files[0].absolutePath : '';
    };

    const handleNewFile = () => {
        const parentDirectory = getParentDirForNewItem();
        logger.log(`Requesting new file in ${parentDirectory}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestNewFile, { parentDirectory });
    };

    const handleNewFolder = () => {
        const parentDirectory = getParentDirForNewItem();
        logger.log(`Requesting new folder in ${parentDirectory}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestNewFolder, { parentDirectory });
    };

    const handleToggleAutoAdd = () => {
        const newState = !isAutoAddEnabled;
        setIsAutoAddEnabled(newState);
        clientIpc.sendToServer(ClientToServerChannel.SaveAutoAddState, { enabled: newState });
    };

    const handleRemoveFromSelection = (pathsToRemove: string[]) => {
        setCheckedFiles(currentChecked => {
            const newChecked = removePathsFromSelected(pathsToRemove, currentChecked, files);
            clientIpc.sendToServer(ClientToServerChannel.SaveCurrentSelection, { paths: newChecked });
            return newChecked;
        });
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        logger.log("Drop event detected on view container.");
    
        const targetElement = event.target as HTMLElement;
        const dropTargetNodeElement = targetElement.closest('.treenode-li');
        let targetPath = files.length > 0 ? files[0].absolutePath : ''; // Default to root
    
        if (dropTargetNodeElement && dropTargetNodeElement.getAttribute('data-path')) {
            const potentialPath = dropTargetNodeElement.getAttribute('data-path')!;
            // Check if the drop target is a directory
            const nodeMap = new Map<string, FileNode>();
            const buildMap = (node: FileNode) => {
                nodeMap.set(node.absolutePath, node);
                node.children?.forEach(buildMap);
            };
            files.forEach(buildMap);
            const targetNode = nodeMap.get(potentialPath);
            if (targetNode?.children) { // It's a directory
                targetPath = potentialPath;
            } else { // It's a file, use its parent
                 targetPath = potentialPath.substring(0, potentialPath.lastIndexOf('/'));
            }
        }
        
        if (event.dataTransfer.items) {
            for (const item of event.dataTransfer.items) {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const buffer = e.target?.result;
                            if (buffer instanceof ArrayBuffer) {
                                const data = new Uint8Array(buffer);
                                const finalTargetPath = `${targetPath}/${file.name}`;
                                logger.log(`Sending file ${file.name} to backend to be saved at ${finalTargetPath}`);
                                clientIpc.sendToServer(ClientToServerChannel.RequestAddFileFromBuffer, { targetPath: finalTargetPath, data });
                            }
                        };
                        reader.readAsArrayBuffer(file);
                    }
                }
            }
        }
    };
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Necessary to allow drop
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        // Prevent flickering when moving over child elements
        if (event.currentTarget.contains(event.relatedTarget as Node)) {
            return;
        }
        setIsDragging(false);
    };

    const { totalFiles, totalTokens, selectedFileNodes } = useMemo(() => {
        let totalTokens = 0;
        const selectedFileSet = new Set<string>();
        const selectedNodes: FileNode[] = [];

        const fileMap: Map<string, FileNode> = new Map();
        const buildFileMap = (node: FileNode) => {
            fileMap.set(node.absolutePath, node);
            node.children?.forEach(buildFileMap);
        };
        files.forEach(buildFileMap);

        const addNodeAndDescendants = (node: FileNode) => {
            if (!node.children) { // Is a file
                if (!selectedFileSet.has(node.absolutePath)) {
                    selectedFileSet.add(node.absolutePath);
                    selectedNodes.push(node);
                    totalTokens += node.tokenCount;
                }
            } else { // Is a directory
                node.children.forEach(child => addNodeAndDescendants(child));
            }
        };

        checkedFiles.forEach(path => {
            const node = fileMap.get(path);
            if (node) {
                addNodeAndDescendants(node);
            }
        });
        
        const finalFileNodes = selectedNodes.filter(n => !n.isImage);

        return { totalFiles: finalFileNodes.length, totalTokens, selectedFileNodes: finalFileNodes };
    }, [checkedFiles, files]);

    return (
        <div 
            className={`view-container ${isDragging ? 'drag-over' : ''}`} 
            onDrop={handleDrop} 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="view-header">
                 <div className="header-row">
                    <div className="toolbar">
                        <button onClick={() => clientIpc.sendToServer(ClientToServerChannel.VSCodeCommand, { command: 'dce.saveCurrentSelection', args: [checkedFiles] })} title="Save Selection Set..."><VscSave /></button>
                        <button onClick={() => clientIpc.sendToServer(ClientToServerChannel.VSCodeCommand, { command: 'dce.loadSelectionSet' })} title="Load Selection Set..."><VscFolderLibrary /></button>
                        <button onClick={() => clientIpc.sendToServer(ClientToServerChannel.VSCodeCommand, { command: 'dce.manageSelectionSets' })} title="Manage Selection Sets..."><VscSettingsGear /></button>
                    </div>
                    <div className="toolbar">
                        {isLoading && <span className="spinner" title="Refreshing..."><VscLoading /></span>}
                        <button onClick={() => setIsSearchVisible(v => !v)} title="Search..." className={isSearchVisible ? 'active' : ''}><VscSearch /></button>
                        <button onClick={handleToggleAutoAdd} title="Automatically add new files to selection" className={isAutoAddEnabled ? 'active' : ''}><VscCheckAll /></button>
                        <button onClick={handleNewFile} title="New File..."><VscNewFile /></button>
                        <button onClick={handleNewFolder} title="New Folder..."><VscNewFolder /></button>
                        <button onClick={handleRefresh} title="Refresh Explorer"><VscRefresh /></button>
                        <button onClick={handleExpandAll} title="Expand All Folders"><VscExpandAll /></button>
                        <button onClick={handleCollapseAll} title="Collapse Folders in View"><VscCollapseAll /></button>
                    </div>
                 </div>
                 {isSearchVisible && (
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Filter files..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                 )}
            </div>
            <div className="file-tree-container">
                {isLoading && files.length === 0 ? (
                     <div className="loading-message">Loading file tree...</div>
                ) : files.length > 0 ? (
                    <FileTree
                        data={files}
                        checkedFiles={checkedFiles}
                        updateCheckedFiles={updateCheckedFiles}
                        activeFile={activeFile}
                        collapseTrigger={collapseTrigger}
                        expandAllTrigger={expandAllTrigger}
                        searchTerm={searchTerm}
                        problemMap={problemMap}
                    />
                ) : (
                    <div className="loading-message">No folder open.</div>
                )}
            </div>
            <SelectedFilesView 
                selectedFileNodes={selectedFileNodes} 
                onRemove={handleRemoveFromSelection}
                isMinimized={isSelectionListMinimized}
                onToggleMinimize={() => setIsSelectionListMinimized(prev => !prev)}
            />
            <div className="view-footer">
                <div className="summary-panel">
                    <span className='summary-item' title="Total number of individual files selected for flattening. This does not include empty directories.">
                        <VscFiles />
                        Selected Files: {formatNumberWithCommas(totalFiles)}
                    </span>
                    <span className='summary-item' title="Total tokens in selected text files">
                        <VscSymbolNumeric />
                        {formatLargeNumber(totalTokens, 1)}
                    </span>
                </div>
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);