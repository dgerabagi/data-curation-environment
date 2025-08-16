import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric } from 'react-icons/vsc';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

    }, [clientIpc]);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    const selectionSummary = useMemo(() => {
        let totalTokens = 0;
        let totalFiles = 0;
        const selectedFileSet = new Set<string>();

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
                    totalTokens += node.tokenCount; // Images have 0 tokens
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

        return { totalFiles, totalTokens };
    }, [selectedFiles, files]);

    return (
        <div className="view-container">
            <div className="view-header">
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
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
            <div className="summary-panel">
                <span className='summary-item'>
                    <VscFiles />
                    {formatNumberWithCommas(selectionSummary.totalFiles)} files
                </span>
                <span className='summary-item'>
                    <VscSymbolNumeric />
                    {formatLargeNumber(selectionSummary.totalTokens, 1)} tokens
                </span>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);