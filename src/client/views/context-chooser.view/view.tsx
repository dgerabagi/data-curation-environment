// Updated on: C162 (Exclude non-selectable nodes from UI counts)
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
import path from 'path-browserify';

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
    const processedFilesCache = useRef(new Set<string>());
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const requestFiles = (force = false) => {
        setIsLoading(true);
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, { force });
    };

    const updateCheckedFiles = useCallback((path: string) => {
        setCheckedFiles(currentChecked => {
            const newChecked = addRemovePathInSelectedFiles(files, path, currentChecked);
            clientIpc.sendToServer(ClientToServerChannel.SaveCurrentSelection, { paths: newChecked });
            return newChecked;
        });
    }, [clientIpc, files]);

    // Effect for pre-warming cache when selection or file tree changes
    useEffect(() => {
        if (files.length === 0 || checkedFiles.length === 0) {
            return;
        }

        const effectivelySelectedFiles = new Set<string>();
        const fileMap = new Map<string, FileNode>();
        
        const buildFileMap = (node: FileNode) => {
            fileMap.set(node.absolutePath, node);
            node.children?.forEach(buildFileMap);
        };
        files.forEach(buildFileMap);

        const addDescendantFiles = (node: FileNode) => {
            if (!node.isSelectable) return; // C162 Fix
            if (!node.children) {
                effectivelySelectedFiles.add(node.absolutePath);
            } else {
                node.children.forEach(addDescendantFiles);
            }
        };

        checkedFiles.forEach(path => {
            const node = fileMap.get(path);
            if (node) {
                if (node.children) {
                    addDescendantFiles(node);
                } else {
                    if (node.isSelectable) { // C162 Fix
                        effectivelySelectedFiles.add(path);
                    }
                }
            }
        });

        effectivelySelectedFiles.forEach(path => {
            if (processedFilesCache.current.has(path)) {
                return; // Already processed
            }

            const extension = `.${path.split('.').pop()?.toLowerCase() || ''}`;
            
            let requested = false;
            if (extension === '.pdf') {
                clientIpc.sendToServer(ClientToServerChannel.RequestPdfToText, { path });
                requested = true;
            } else if (EXCEL_EXTENSIONS.has(extension)) {
                clientIpc.sendToServer(ClientToServerChannel.RequestExcelToText, { path });
                requested = true;
            } else if (WORD_EXTENSIONS.has(extension)) {
                clientIpc.sendToServer(ClientToServerChannel.RequestWordToText, { path });
                requested = true;
            }

            if (requested) {
                processedFilesCache.current.add(path);
            }
        });

    }, [checkedFiles, files, clientIpc]);


    useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceTrustState, ({ isTrusted }) => {
            setIsWorkspaceTrusted(isTrusted);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, ({ files: receivedFiles }) => {
            setFiles(receivedFiles);
            setIsLoading(false);
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.ApplySelectionSet, ({ paths }) => {
            setCheckedFiles(paths);
            clientIpc.sendToServer(ClientToServerChannel.SaveCurrentSelection, { paths });
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendSelectionSets, ({ sets }) => {
            setSelectionSets(sets);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SetActiveFile, ({ path }) => {
            if (suppressActiveFileReveal.current) {
                suppressActiveFileReveal.current = false;
                return;
            }
            setActiveFile(path);
        });

        clientIpc.onServerMessage(ServerToClientChannel.FocusFile, ({ path }) => {
            setActiveFile(path);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendAutoAddState, ({ enabled }) => {
            setIsAutoAddEnabled(enabled);
        });

        clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => {
            if (reason === 'fileOp') {
                suppressActiveFileReveal.current = true;
                setTimeout(() => { suppressActiveFileReveal.current = false; }, 2000);
            }
            requestFiles(true);
            clientIpc.sendToServer(ClientToServerChannel.RequestLastSelection, {});
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateProblemCounts, ({ problemMap: newProblemMap }) => {
            setProblemMap(newProblemMap);
        });

        clientIpc.onServerMessage(ServerToClientChannel.UpdateNodeStats, ({ path, tokenCount, error }) => {
            processedFilesCache.current.add(path); 
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
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: checkedFiles });
    };

    const handleRefresh = () => {
        processedFilesCache.current.clear();
        requestFiles(true);
    };
    
    const handleExpandAll = () => {
        setExpandAllTrigger(c => c + 1);
    };

    const handleCollapseAll = () => {
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

    const processDrop = (event: React.DragEvent, node: FileNode) => {
        const targetDir = node.children ? node.absolutePath : path.dirname(node.absolutePath);
        
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const filesArray = Array.from(event.dataTransfer.files);
            filesArray.forEach((file: File) => {
                const reader = new FileReader();
                reader.onload = (readEvent) => {
                    if (readEvent.target?.result instanceof ArrayBuffer) {
                        const data = new Uint8Array(readEvent.target.result);
                        const finalTargetPath = `${targetDir}/${file.name}`.replace(/\\/g, '/');
                        clientIpc.sendToServer(ClientToServerChannel.RequestAddFileFromBuffer, { targetPath: finalTargetPath, data });
                    }
                };
                reader.readAsArrayBuffer(file);
            });
            return;
        }

        const uriList = event.dataTransfer.getData('text/uri-list');
        if (uriList) {
            const sourceUri = uriList.split('\n')[0].trim();
            if (sourceUri) {
                 clientIpc.sendToServer(ClientToServerChannel.RequestCopyFileFromUri, { sourceUri, targetDir });
            }
            return;
        }
    };

    const handleContainerDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOver(false);
        if (!isWorkspaceTrusted) return;
        
        const rootDir = files.length > 0 ? files[0].absolutePath : '';
        if (!rootDir) return;
        const dummyRootNode: FileNode = { absolutePath: rootDir, name: path.basename(rootDir), children: [], tokenCount: 0, fileCount: 0, isImage: false, sizeInBytes: 0, extension: '', isPdf: false, isExcel: false, isWordDoc: false, isSelectable: true };
        processDrop(event, dummyRootNode);
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
            if (!node.isSelectable) return; // C162 Fix: Exclude non-selectable nodes

            if (!node.children) { 
                if (!selectedFileSet.has(node.absolutePath)) {
                    selectedFileSet.add(node.absolutePath);
                    selectedNodes.push(node);
                    totalTokens += node.tokenCount;
                }
            } else { 
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
            onDrop={handleContainerDrop} 
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