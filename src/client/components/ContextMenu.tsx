import React, { useEffect, useRef } from 'react';
import { FileNode } from '@/common/types/file-node';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

interface ContextMenuProps {
    menu: { x: number; y: number; node: FileNode };
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
    
    const { node } = menu;
    const isDirectory = !!node.children;

    return (
        <>
            <div className="context-menu-overlay" onClick={onClose}></div>
            <div ref={menuRef} className="context-menu" style={{ top: menu.y, left: menu.x }}>
                <ul>
                    {isDirectory && (
                        <>
                            <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestNewFile, { parentDirectory: node.absolutePath }))}>New File...</li>
                            <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestNewFolder, { parentDirectory: node.absolutePath }))}>New Folder...</li>
                            <hr />
                        </>
                    )}
                    <li onClick={() => handleAction(() => onRename())}>Rename</li>
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestFileDelete, { path: node.absolutePath }))}>Delete</li>
                    <hr />
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: node.absolutePath, relative: false }))}>Copy Path</li>
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: node.absolutePath, relative: true }))}>Copy Relative Path</li>
                    <hr />
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestRevealInExplorer, { path: node.absolutePath }))}>Reveal in File Explorer</li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenu;