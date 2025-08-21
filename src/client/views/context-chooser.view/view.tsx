import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric, VscCollapseAll, VscRefresh, VscNewFile, VscNewFolder, VscLoading, VscSave, VscFolderLibrary, VscSettingsGear, VscCheckAll, VscSearch, VscExpandAll, VscShield } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import SelectedFilesView from '../../components/SelectedFilesView';
import { addRemovePathInSelectedFiles, removePathsFromSelected } from '@/client/components/file-tree/FileTree.utils';
import { SelectionSet, ProblemCountsMap } from '@/common/ipc/channels.type';

const EXCEL_EXTENSIONS = new Set(['.xlsx', '.xls', '.csv']);
const WORD_EXTENSIONS = new Set(['.docx', '.doc']);

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
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [isWorkspaceTrusted, setIsWorkspaceTrusted] = useState(true); // Assume trusted by default
    const [clipboard, setClipboard] = useState<{ path: string; type: 'copy' } | null>(null);
    const suppressActiveFileReveal = useRef(false);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const requestFiles = (force = false) => {
        setIsLoading(true);
        logger.log(`Requesting workspace files (force=${force}).`);
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, { force });
    };

    const updateCheckedFiles = useCallback((path: string) => {
        const extension = `.${path.split('.').pop()?.toLowerCase() || ''}`;
        const isChecking = !checkedFiles.some(checkedPath => path.startsWith(checkedPath));

        setCheckedFiles(currentChecked => {
            const newChecked = addRemovePathInSelectedFiles(files, path, currentChecked);
            clientIpc.sendToServer(ClientToServerChannel.SaveCurrentSelection, { paths: newChecked });
            return newChecked;
        });

        if (isChecking) {
            if (extension === '.pdf') {
                logger.log(`Requesting text for PDF: ${path}`);
                clientIpc.sendToServer(ClientToServerChannel.RequestPdfToText, { path });
            } else if (EXCEL_EXTENSIONS.has(extension)) {
                logger.log(`Requesting text for Excel/CSV: ${path}`);
                clientIpc.sendToServer(ClientToServerChannel.RequestExcelToText, { path });
            } else if (WORD_EXTENSIONS.has(extension)) {
                logger.log(`Requesting text for Word Doc: ${path}`);
                clientIpc.sendToServer(ClientToServerChannel.RequestWordToText, { path });
            }
        }
    }, [clientIpc, files, checkedFiles]);

    useEffect(() => {
        logger.log("Initializing view and requesting initial data.");
        
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceTrustState, ({ isTrusted }) => {
            logger.log(`Received workspace trust state: ${isTrusted}`);
            setIsWorkspaceTrusted(isTrusted);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, ({ files: receivedFiles }) => {
            logger.log(`Received file tree from backend. Root node: ${receivedFiles[0]?.name}`);
            setFiles(receivedFiles);
            setIsLoading(false);
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.ApplySelectionSet, ({ paths }) => {
            logger.log(`[C78 CACHE FIX] Applying selection set with ${paths.length} paths.`);
            setCheckedFiles(paths);
            clientIpc.sendToServer(ClientToServerChannel.SaveCurrentSelection, { paths });

            logger.log(`[C78 CACHE FIX] Pre-warming cache for ${paths.length} restored paths.`);
            paths.forEach(path => {
                const extension = `.${path.split('.').pop()?.toLowerCase() || ''}`;
                logger.log(`[C78 CACHE FIX] Checking path: ${path}, extension: ${extension}`);
                 if (extension === '.pdf') {
                    logger.log(`[C78 CACHE FIX] Requesting text for restored PDF: ${path}`);
                    clientIpc.sendToServer(ClientToServerChannel.RequestPdfToText, { path });
                } else if (EXCEL_EXTENSIONS.has(extension)) {
                    logger.log(`[C78 CACHE FIX] Requesting text for restored Excel/CSV: ${path}`);
                    clientIpc.sendToServer(ClientToServerChannel.RequestExcelToText, { path });
                } else if (WORD_EXTENSIONS.has(extension)) {
                    logger.log(`[C78 CACHE FIX] Requesting text for restored Word Doc: ${path}`);
                    clientIpc.sendToServer(ClientToServerChannel.RequestWordToText, { path });
                }
            });
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendSelectionSets, ({ sets }) => {
            logger.log(`[WebView] Received ${Object.keys(sets).length} selection sets.`);
            setSelectionSets(sets);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SetActiveFile, ({ path }) => {
            if (suppressActiveFileReveal.current) {
                logger.log(`[WebView] Suppressing set active file event for: ${path}`);
                suppressActiveFileReveal.current = false;
                return;
            }
            logger.log(`[WebView] [WebView] Received set active file event for: ${path}`);
            setActiveFile(path);
        });

        clientIpc.onServerMessage(ServerToClientChannel.FocusFile, ({ path }) => {
            logger.log(`[WebView] Received focus file event for: ${path}`);
            setActiveFile(path);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendAutoAddState, ({ enabled }) => {
            logger.log(`[WebView] Received auto-add state: ${enabled}`);
            setIsAutoAddEnabled(enabled);
        });

        clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => {
            logger.log(`[WebView] Force refresh triggered from backend. Reason: ${reason || 'unknown'}`);
            if (reason === 'fileOp') {
                suppressActiveFileReveal.current = true;
                setTimeout(() => { suppressActiveFileReveal.current = false; }, 2000);
            }
            requestFiles(true);
            clientIpc.sendToServer(ClientToServerChannel.RequestLastSelection, {});
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateProblemCounts, ({ problemMap: newProblemMap }) => {
            logger.log(`[WebView] Received dynamic problem counts update with ${Object.keys(newProblemMap).length} entries.`);
            setProblemMap(newProblemMap);
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateNodeStats, ({ path, tokenCount, error }) => {
            logger.log(`Received stats update for ${path}. New token count: ${tokenCount}, Error: ${error}`);
            setFiles(currentFiles => {
                const newFiles = JSON.parse(JSON.stringify(currentFiles));
                let nodeUpdated = false;
                const findAndUpdate = (nodes: FileNode[]) => {
                    for (const node of nodes) {
                        if (node.absolutePath === path) {
                            node.tokenCount = tokenCount;
                            node.error = error;
                            nodeUpdated = true;
                            return true;
                        }
                        if (node.children && findAndUpdate(node.children)) return true;
                    }
                    return false;
                };
                findAndUpdate(newFiles);
                return nodeUpdated ? newFiles : currentFiles;
            });
        });

        clientIpc.sendToServer(ClientToServerChannel.RequestInitialData, {});
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

    const handleNewFile = () => clientIpc.sendToServer(ClientToServerChannel.RequestNewFile, { parentDirectory: getParentDirForNewItem() });
    const handleNewFolder = () => clientIpc.sendToServer(ClientToServerChannel.RequestNewFolder, { parentDirectory: getParentDirForNewItem() });

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

    const processDrop = (event: React.DragEvent, targetDir: string) => {
        logger.log(`[Drop] Drop detected on target: ${targetDir}`);
        logger.log(`[Drop] Available types: ${Array.from(event.dataTransfer.types).join(', ')}`);

        // Case 1: Drop from OS File Explorer
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            logger.log(`[Drop] Handling as OS file drop (${event.dataTransfer.files.length} files).`);
            const filesArray = Array.from(event.dataTransfer.files);
            filesArray.forEach((file: File) => {
                const reader = new FileReader();
                reader.onload = (readEvent) => {
                    if (readEvent.target?.result instanceof ArrayBuffer) {
                        const data = new Uint8Array(readEvent.target.result);
                        const finalTargetPath = `${targetDir}/${file.name}`.replace(/\\/g, '/');
                        logger.log(`[Drop] Sending file buffer ${file.name} to backend for creation at ${finalTargetPath}`);
                        clientIpc.sendToServer(ClientToServerChannel.RequestAddFileFromBuffer, { targetPath: finalTargetPath, data });
                    }
                };
                reader.onerror = () => logger.error(`[Drop] FileReader error for file: ${file.name}`);
                reader.readAsArrayBuffer(file);
            });
            return;
        }

        // Case 2: Drop from VS Code Explorer
        const uriList = event.dataTransfer.getData('text/uri-list');
        if (uriList) {
            logger.log(`[Drop] Handling as VS Code URI drop. URI List: ${uriList}`);
            const sourceUri = uriList.split('\n')[0].trim(); // Handle multiple URIs if needed, for now just take the first
            if (sourceUri) {
                 clientIpc.sendToServer(ClientToServerChannel.RequestCopyFileFromUri, { sourceUri, targetDir });
            }
            return;
        }
        
        logger.warn('[Drop] Drop event occurred but no compatible data type was found.');
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOver(false);
        if (!isWorkspaceTrusted) return;
        
        const targetDir = files.length > 0 ? files[0].absolutePath : '';
        if (!targetDir) {
            logger.error("Cannot drop file, no workspace root identified.");
            return;
        }
        processDrop(event, targetDir);
    };
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (isWorkspaceTrusted && (event.dataTransfer.types.includes('Files') || event.dataTransfer.types.includes('text/uri-list'))) {
             event.dataTransfer.dropEffect = 'copy';
        } else {
            event.dataTransfer.dropEffect = 'none';
        }
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (isWorkspaceTrusted && (event.dataTransfer.types.includes('Files') || event.dataTransfer.types.includes('text/uri-list'))) {
            setIsDraggingOver(true);
        }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsDraggingOver(false);
        }
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
            if (!node.children) { // It's a file
                if (!selectedFileSet.has(node.absolutePath)) {
                    selectedFileSet.add(node.absolutePath);
                    selectedNodes.push(node);
                    totalTokens += node.tokenCount;
                }
            } else { // It's a directory
                node.children.forEach(addNodeAndDescendants);
            }
        };
        checkedFiles.forEach(path => {
            const node = fileMap.get(path);
            if (node) addNodeAndDescendants(node);
        });
        return { totalFiles: selectedNodes.length, totalTokens, selectedFileNodes: selectedNodes };
    }, [checkedFiles, files]);

    return (
        <div 
            className={`view-container ${isDraggingOver ? 'drag-over' : ''}`} 
            onDrop={handleDrop} 
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {!isWorkspaceTrusted && (
                <div className="workspace-trust-banner">
                    <VscShield />
                    <span>Drag and drop is disabled because this workspace is not trusted.</span>
                    <button onClick={() => clientIpc.sendToServer(ClientToServerChannel.VSCodeCommand, { command: 'workbench.action.manageWorkspaceTrust' })}>
                        Manage Trust
                    </button>
                </div>
            )}
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
                        <input type="text" placeholder="Filter files..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                )}
            </div>
            <div className="file-tree-container">
                {isLoading && files.length === 0 ? (
                     <div className="loading-message">Loading file tree...</div>
                ) : files.length > 0 ? (
                    <FileTree data={files} checkedFiles={checkedFiles} updateCheckedFiles={updateCheckedFiles} activeFile={activeFile} collapseTrigger={collapseTrigger} expandAllTrigger={expandAllTrigger} searchTerm={searchTerm} problemMap={problemMap} onNodeDrop={processDrop} onCopy={(path) => setClipboard({ path, type: 'copy' })} clipboard={clipboard} />
                ) : (
                    <div className="loading-message">No folder open.</div>
                )}
            </div>
            <SelectedFilesView selectedFileNodes={selectedFileNodes} onRemove={handleRemoveFromSelection} isMinimized={isSelectionListMinimized} onToggleMinimize={() => setIsSelectionListMinimized(prev => !prev)} />
            <div className="view-footer">
                <div className="summary-panel">
                    <span className='summary-item' title="Total number of individual files selected for flattening. This does not include empty directories."><VscFiles /> Selected Files: {formatNumberWithCommas(totalFiles)}</span>
                    <span className='summary-item' title="Total tokens in selected text files"><VscSymbolNumeric /> {formatLargeNumber(totalTokens, 1)}</span>
                </div>
                <button className="flatten-button" onClick={handleFlattenClick}>Flatten Context</button>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);