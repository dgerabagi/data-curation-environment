import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric, VscCollapseAll, VscRefresh, VscClose } from 'react-icons/vsc';
import { addRemovePathInSelectedFiles } from '@/client/components/file-tree/FileTree.utils';
import { logger } from '@/client/utils/logger';

const SelectedFilesPanel = ({ selectedFileNodes, onRemove }: { selectedFileNodes: FileNode[], onRemove: (path: string) => void }) => {
    if (selectedFileNodes.length === 0) {
        return null;
    }

    return (
        <div className="selected-files-panel">
            <div className="panel-header">
                <span>Selected Items</span>
                <span>Tokens</span>
            </div>
            <ul className="selected-files-list">
                {selectedFileNodes.map((node, index) => (
                    <li key={node.absolutePath}>
                        <span className="list-number">{index + 1}.</span>
                        <span className="file-name" title={node.absolutePath}>{node.name}</span>
                        <span className="file-tokens">{formatLargeNumber(node.tokenCount, 1)}</span>
                        <button className="remove-button" onClick={() => onRemove(node.absolutePath)} title="Remove from selection">
                            <VscClose />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    const [collapseTrigger, setCollapseTrigger] = useState(0);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        logger.log("Initializing view and requesting workspace files.");
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            logger.log(`Received file tree from backend. Root node: ${receivedFiles[0]?.name}`);
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

        const handleApplySelectionSet = ({ paths }: { paths: string[] }) => {
            logger.log(`Applying selection set with ${paths.length} paths.`);
            setSelectedFiles(paths);
        };
        clientIpc.onServerMessage(ServerToClientChannel.ApplySelectionSet, handleApplySelectionSet);

    }, []); // C19 FIX: Empty dependency array ensures this runs only once on mount.

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        logger.log(`Flatten Context button clicked with ${selectedFiles.length} paths.`);
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    const handleRefresh = () => {
        logger.log("Refresh button clicked.");
        setFiles([]); // Clear files to show loading state
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});
    };

    const handleCollapseAll = () => {
        logger.log("Collapse All button clicked.");
        setCollapseTrigger(c => c + 1);
    };

    const handleRemoveFromSelection = (pathToRemove: string) => {
        const newSelected = addRemovePathInSelectedFiles(files, pathToRemove, selectedFiles);
        setSelectedFiles(newSelected);
    };

    const { totalFiles, totalTokens, selectedFileNodes } = useMemo(() => {
        let totalTokens = 0;
        let totalFiles = 0;
        const selectedFileSet = new Set<string>();
        const selectedTextNodes: FileNode[] = [];

        const fileMap: Map<string, FileNode> = new Map();
        const buildFileMap = (node: FileNode) => {
            fileMap.set(node.absolutePath, node);
            if (node.children) {
                node.children.forEach(buildFileMap);
            }
        };
        files.forEach(buildFileMap);

        const addNodeAndDescendants = (node: FileNode) => {
            if (!node.children) { // It's a file
                if (!selectedFileSet.has(node.absolutePath)) {
                    selectedFileSet.add(node.absolutePath);
                    if (!node.isImage) {
                       totalTokens += node.tokenCount;
                       selectedTextNodes.push(node);
                    }
                    totalFiles++;
                }
            } else { // It's a directory
                node.children.forEach(child => addNodeAndDescendants(child));
            }
        };

        selectedFiles.forEach(path => {
            const node = fileMap.get(path);
            if (node) {
                addNodeAndDescendants(node);
            }
        });
        
        selectedTextNodes.sort((a, b) => b.tokenCount - a.tokenCount);

        return { totalFiles, totalTokens, selectedFileNodes: selectedTextNodes };
    }, [selectedFiles, files]);

    return (
        <div className="view-container">
            <div className="view-header">
                 <div className="toolbar">
                    <button onClick={handleRefresh} title="Refresh Explorer"><VscRefresh /></button>
                    <button onClick={handleCollapseAll} title="Collapse Folders in View"><VscCollapseAll /></button>
                 </div>
            </div>
            <div className="file-tree-container">
                {files.length > 0 ? (
                    files.map((rootNode, index) => (
                        <FileTree
                            key={index}
                            data={[rootNode]}
                            onFileClick={handleFileClick}
                            selectedFiles={selectedFiles}
                            updateSelectedFiles={updateSelectedFiles}
                            activeFile={activeFile}
                            collapseTrigger={collapseTrigger}
                        />
                    ))
                ) : (
                    <div className="loading-message">Loading file tree...</div>
                )}
            </div>
            <SelectedFilesPanel selectedFileNodes={selectedFileNodes} onRemove={handleRemoveFromSelection} />
            <div className="view-footer">
                <div className="summary-panel">
                    <span className='summary-item' title="Total selected files">
                        <VscFiles />
                        {formatNumberWithCommas(totalFiles)}
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