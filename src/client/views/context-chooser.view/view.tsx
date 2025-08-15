import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect } from 'react';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            setFiles(receivedFiles);
            setIsLoaded(true);
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

    const handleOpenFolderClick = () => {
        clientIpc.sendToServer(ClientToServerChannel.OpenFolderDialog, {});
    };

    const renderContent = () => {
        if (!isLoaded) {
            return <div className="loading-message">Loading file tree...</div>;
        }
        if (files.length === 0) {
            return (
                <div className="empty-view-container">
                    <p>No folder opened.</p>
                    <button className="open-folder-button" onClick={handleOpenFolderClick}>
                        Open Folder
                    </button>
                </div>
            );
        }
        return files.map((rootNode, index) => (
            <FileTree
                key={index}
                data={[rootNode]}
                onFileClick={handleFileClick}
                selectedFiles={selectedFiles}
                updateSelectedFiles={updateSelectedFiles}
                activeFile={activeFile}
            />
        ));
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
            <div className="file-tree-container">
                {renderContent()}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);