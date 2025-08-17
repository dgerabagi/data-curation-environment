import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric, VscCollapseAll, VscRefresh, VscNewFile, VscNewFolder, VscLoading } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import SelectedFilesView from '@/client/components/SelectedFilesView';
import { removePathsFromSelected } from '@/client/components/file-tree/FileTree.utils';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    const [collapseTrigger, setCollapseTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const requestFiles = (force = false) => {
        setIsLoading(true);
        logger.log(`Requesting workspace files (force=${force}).`);
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, { force });
    };

    useEffect(() => {
        logger.log("Initializing view and requesting workspace files.");
        requestFiles();

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            logger.log(`Received file tree from backend. Root node: ${receivedFiles[0]?.name}`);
            setFiles(receivedFiles);
            setIsLoading(false);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

        const handleApplySelectionSet = ({ paths }: { paths: string[] }) => {
            logger.log(`Applying selection set with ${paths.length} paths.`);
            setSelectedFiles(paths);
        };
        clientIpc.onServerMessage(ServerToClientChannel.ApplySelectionSet, handleApplySelectionSet);

    }, []);

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
        requestFiles(true);
    };

    const handleCollapseAll = () => {
        logger.log("Collapse All button clicked.");
        setCollapseTrigger(c => c + 1);
    };

    const handleNewFile = () => {
        const parentDirectory = files.length > 0 ? files[0].absolutePath : '';
        logger.log(`Requesting new file in ${parentDirectory}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestNewFile, { parentDirectory });
    };

    const handleNewFolder = () => {
        const parentDirectory = files.length > 0 ? files[0].absolutePath : '';
        logger.log(`Requesting new folder in ${parentDirectory}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestNewFolder, { parentDirectory });
    };

    const handleRemoveFromSelection = (pathsToRemove: string[]) => {
        const newSelected = removePathsFromSelected(pathsToRemove, selectedFiles, files);
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
            if (!node.children) {
                if (!selectedFileSet.has(node.absolutePath)) {
                    selectedFileSet.add(node.absolutePath);
                    if (!node.isImage) {
                       totalTokens += node.tokenCount;
                       selectedTextNodes.push(node);
                    }
                    totalFiles++;
                }
            } else {
                node.children.forEach(child => addNodeAndDescendants(child));
            }
        };

        selectedFiles.forEach(path => {
            const node = fileMap.get(path);
            if (node) {
                addNodeAndDescendants(node);
            }
        });
        
        return { totalFiles, totalTokens, selectedFileNodes: selectedTextNodes };
    }, [selectedFiles, files]);

    return (
        <div className="view-container">
            <div className="view-header">
                 <span className="view-title">Data Curation</span>
                 <div className="toolbar">
                    {isLoading && <span className="spinner" title="Refreshing..."><VscLoading /></span>}
                    <button onClick={handleNewFile} title="New File..."><VscNewFile /></button>
                    <button onClick={handleNewFolder} title="New Folder..."><VscNewFolder /></button>
                    <button onClick={handleRefresh} title="Refresh Explorer"><VscRefresh /></button>
                    <button onClick={handleCollapseAll} title="Collapse Folders in View"><VscCollapseAll /></button>
                 </div>
            </div>
            <div className="file-tree-container">
                {isLoading && files.length === 0 ? (
                     <div className="loading-message">Loading file tree...</div>
                ) : files.length > 0 ? (
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
                    <div className="loading-message">No folder open.</div>
                )}
            </div>
            <SelectedFilesView selectedFileNodes={selectedFileNodes} onRemove={handleRemoveFromSelection} />
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