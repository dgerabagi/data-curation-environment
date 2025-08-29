// Updated on: C167 (Fix multi-select delete)
import React, { useEffect, useRef } from 'react';
import { FileNode } from '@/common/types/file-node';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

interface ContextMenuProps {
    menu: { x: number; y: number; node: FileNode, paths: string[] };
    onClose: () => void;
    onRename: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ menu, onClose, onRename }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleAction = (action: () => void) => {
        action();
        onClose();
    };
    
    const { node, paths } = menu;
    const isDirectory = !!node.children;
    const isMultiSelect = paths.length > 1;

    const getParentDirectory = () => {
        if (isDirectory) {
            return node.absolutePath;
        }
        const parts = node.absolutePath.split('/');
        parts.pop();
        return parts.join('/');
    };

    const handleDelete = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestBatchFileDelete, { paths });
    };

    return (
        <>
            <div className="context-menu-overlay" onClick={onClose}></div>
            <div ref={menuRef} className="context-menu" style={{ top: menu.y, left: menu.x }}>
                <ul>
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestNewFile, { parentDirectory: getParentDirectory() }))}>New File...</li>
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestNewFolder, { parentDirectory: getParentDirectory() }))}>New Folder...</li>
                    <hr />
                    <li className={isMultiSelect ? 'disabled' : ''} onClick={() => !isMultiSelect && handleAction(() => onRename())}>Rename</li>
                    <li onClick={() => handleAction(handleDelete)}>Delete</li>
                    <hr />
                    <li className={isMultiSelect ? 'disabled' : ''} onClick={() => !isMultiSelect && handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: node.absolutePath, relative: false }))}>Copy Path</li>
                    <li className={isMultiSelect ? 'disabled' : ''} onClick={() => !isMultiSelect && handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: node.absolutePath, relative: true }))}>Copy Relative Path</li>
                    <hr />
                    <li className={isMultiSelect ? 'disabled' : ''} onClick={() => !isMultiSelect && handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestRevealInExplorer, { path: node.absolutePath }))}>Reveal in File Explorer</li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenu;