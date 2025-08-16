import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric, VscCollapseAll, VscRefresh } from 'react-icons/vsc';
import { removePathsFromSelected } from '@/client/components/file-tree/FileTree.utils';
import { logger } from '@/client/utils/logger';
import SelectedFilesView from '@/client/components/SelectedFilesView';

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
            if (receivedFiles.length > 0 && receivedFiles[0]) {
                 logger.log(`Received ${receivedFiles[0].fileCount || 0} files from backend.`);
            } else {
                logger.log("Received empty file tree from backend.");
            }
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

        const handleApplySelectionSet = ({ paths }: { paths: string[] }) => {
            logger.log(`Applying selection set with ${paths.length} paths.`);
            setSelectedFiles(paths);
        };
        clientIpc.onServerMessage(ServerToClientChannel.ApplySelectionSet, handleApplySelectionSet);

    }, [clientIpc]);

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

    const handleRemoveFromSelection = (pathsToRemove: string[]) => {
        const newSelected = removePathsFromSelected(pathsToRemove, selectedFiles, files);
        setSelectedFiles(newSelected);
    };

    const { totalFiles, totalTokens, selectedFileNodes } = useMemo(() => {
        let totalTokens = 0;
        const selectedFileSet = new Set<string>();
        const selectedNodes: FileNode[] = [];

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
                    if (!node.isImage) { // Should always be false now
                       totalTokens += node.tokenCount;
                       selectedNodes.push(node);
                    }
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
        
        const totalFileCount = selectedFileSet.size;

        return { totalFiles: totalFileCount, totalTokens, selectedFileNodes: selectedNodes };
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
                        />
                    ))
                ) : (
                    <div className="loading-message">Loading file tree...</div>
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