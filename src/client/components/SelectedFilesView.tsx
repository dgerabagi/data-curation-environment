import * as React from 'react';
import { FileNode } from '@/common/types/file-node';
import { VscClose } from 'react-icons/vsc';
import { formatLargeNumber } from '@/common/utils/formatting';
import * as path from 'path';

interface SelectedFilesViewProps {
    files: FileNode[];
    onRemoveFile: (filePath: string) => void;
}

const SelectedFilesView: React.FC<SelectedFilesViewProps> = ({ files, onRemoveFile }) => {
    if (files.length === 0) {
        return null;
    }

    const workspaceFolders = (window as any).vscode.workspace.workspaceFolders;
    const rootPath = workspaceFolders && workspaceFolders.length > 0 ? workspaceFolders[0].uri.fsPath : '';

    return (
        <div className="selected-files-view">
            <div className="selected-files-header">
                {files.length} Files Selected
            </div>
            <ol>
                {files.slice(0, 15).map((file, index) => {
                    const relativePath = rootPath ? path.relative(rootPath, file.absolutePath) : file.absolutePath;
                    const dirname = path.dirname(relativePath);
                    return (
                        <li key={file.absolutePath} title={relativePath}>
                            <span className="file-rank">{index + 1}.</span>
                            <div className="file-info">
                                <span>{file.name}</span>
                                <span className="file-path"> — {dirname}</span>
                            </div>
                            <span className="file-token-count">{formatLargeNumber(file.tokenCount, 1)}</span>
                            <button className="remove-button" title="Remove from selection" onClick={() => onRemoveFile(file.absolutePath)}>
                                <VscClose />
                            </button>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default SelectedFilesView;