// Updated on: C26 (Make uncheck logic resilient to stale tree)
import { FileNode } from "@/common/types/file-node";
import { logger } from "@/client/utils/logger";

/**
 * Recursively finds all selectable files at or below a given node.
 * @param node The node to start from.
 * @returns A flat array of absolute paths for all selectable files.
 */
export function getAllSelectableFiles(node: FileNode): string[] {
    if (!node.isSelectable) {
        return [];
    }
    if (!node.children) { // It's a file
        return [node.absolutePath];
    }
    // It's a directory
    let files: string[] = [];
    for (const child of node.children) {
        files = files.concat(getAllSelectableFiles(child));
    }
    return files;
}

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
    for (const rootNode of fileNodes) {
        const found = findNode(rootNode, filePath);
        if (found) return found;
    }
    return null;
};

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    if (node.children && filePath.startsWith(node.absolutePath + '/')) {
        for (const child of node.children) {
            const found = findNode(child, filePath);
            if(found) return found;
        }
    }
    return null;
}

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string, // The path of the node that was clicked
  selectedFiles: string[] // The current set of selected FILE paths
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    const currentSelection = new Set(selectedFiles);

    if (!node) {
        logger.warn(`[Selection Util] Node not found in file tree for path: ${path}. Selection cannot be changed robustly.`);
        if (currentSelection.has(path)) {
            currentSelection.delete(path);
            return Array.from(currentSelection);
        }
        return selectedFiles;
    }
    
    if (!node.isSelectable) return selectedFiles;

    const filesToToggle = getAllSelectableFiles(node);
    const isCurrentlyChecked = filesToToggle.length > 0 && filesToToggle.every(file => currentSelection.has(file));

    if (isCurrentlyChecked) {
        // UNCHECK: Remove all selectable files under this node from the selection.
        filesToToggle.forEach(file => currentSelection.delete(file));
        
        // C26 Fix: Defensively remove any selected file that is a descendant by path,
        // in case the fileTree state was stale and missed some newly added files.
        if (node.children) { // Only apply this logic to directories
            const dirPathWithSlash = node.absolutePath.endsWith('/') ? node.absolutePath : node.absolutePath + '/';
            for (const selectedFile of selectedFiles) {
                if (selectedFile.startsWith(dirPathWithSlash)) {
                    currentSelection.delete(selectedFile);
                }
            }
        }
    } else {
        // CHECK: Add all selectable files under this node to the selection.
        filesToToggle.forEach(file => currentSelection.add(file));
    }
  
    return Array.from(currentSelection);
};


export const removePathsFromSelected = (
    pathsToRemove: string[],
    currentSelectedFiles: string[],
    fileTree: FileNode[]
): string[] => {
    logger.log(`[Batch Remove] Starting removal of ${pathsToRemove.length} paths.`);
    if (pathsToRemove.length === 0) return currentSelectedFiles;

    const fileMap = new Map<string, FileNode>();
    const buildMap = (node: FileNode) => {
        fileMap.set(node.absolutePath, node);
        node.children?.forEach(buildMap);
    };
    fileTree.forEach(buildMap);

    const effectiveFileSelection = new Set<string>();
    for (const selectedPath of currentSelectedFiles) {
        const node = fileMap.get(selectedPath);
        if (node) {
            if (node.children) {
                getAllSelectableFiles(node).forEach(file => effectiveFileSelection.add(file));
            } else if (node.isSelectable) {
                effectiveFileSelection.add(selectedPath);
            }
        }
    }

    for (const pathToRemove of pathsToRemove) {
        const nodeToRemove = fileMap.get(pathToRemove);
        if (nodeToRemove) {
            if (nodeToRemove.children) {
                getAllSelectableFiles(nodeToRemove).forEach(file => effectiveFileSelection.delete(file));
            } else {
                effectiveFileSelection.delete(pathToRemove);
            }
        }
    }
    
    logger.log(`[Batch Remove] After removal, ${effectiveFileSelection.size} files remain.`);
    return Array.from(effectiveFileSelection);
};