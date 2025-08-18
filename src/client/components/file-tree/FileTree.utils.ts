import { FileNode } from "@/common/types/file-node";
import { logger } from "@/client/utils/logger";

function getAllDescendantPaths(node: FileNode): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            paths.push(child.absolutePath);
            paths = paths.concat(getAllDescendantPaths(child));
        }
    }
    return paths;
}

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

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    let newSelectedFiles = [...selectedFiles];

    const isDirectlySelected = newSelectedFiles.includes(path);
    const selectedAncestor = newSelectedFiles.find(ancestor => path.startsWith(ancestor + '/') && path !== ancestor);

    const isEffectivelySelected = isDirectlySelected || !!selectedAncestor;

    if (isEffectivelySelected) {
        // UNCHECKING
        if (selectedAncestor) {
            // A child of a selected folder is being unchecked.
            // This means we are "subtracting" it from the parent selection.
            newSelectedFiles = newSelectedFiles.filter(p => p !== selectedAncestor);
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (ancestorNode && ancestorNode.children) {
                // Add all siblings of the unchecked path back to the selection
                for (const child of ancestorNode.children) {
                    if (!path.startsWith(child.absolutePath + '/')) {
                         newSelectedFiles.push(child.absolutePath);
                    }
                }
            }
        } else {
            // A directly selected item is being unchecked. Remove it and all its descendants.
            const descendantPaths = getAllDescendantPaths(node);
            newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
        }
    } else {
        // CHECKING
        // Remove all descendants that might be individually selected, as the parent selection now covers them.
        newSelectedFiles = newSelectedFiles.filter(p => !p.startsWith(path + '/'));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Remove duplicates for cleanliness
};

export const removePathsFromSelected = (
    pathsToRemove: string[],
    selectedFiles: string[],
    fileTree: FileNode[]
): string[] => {
    logger.log(`Attempting to remove ${pathsToRemove.length} paths from selection.`);
    if (pathsToRemove.length === 0) {
        return selectedFiles;
    }

    let newSelectedFiles = [...selectedFiles];

    for (const path of pathsToRemove) {
        // This simulates an "uncheck" action for each file to be removed.
        // It correctly handles cases where the file is part of a larger selected directory.
        newSelectedFiles = addRemovePathInSelectedFiles(fileTree, path, newSelectedFiles);
    }

    const finalSelectedFiles = Array.from(new Set(newSelectedFiles));
    logger.log(`Selection updated. New count: ${finalSelectedFiles.length}.`);
    return finalSelectedFiles;
};