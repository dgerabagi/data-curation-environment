import { FileNode } from "@/common/types/file-node";
import { logger } from "@/client/utils/logger";

function getAllDescendantPaths(node: FileNode, includeFilesOnly: boolean = false): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            if (!includeFilesOnly || !child.children) {
                paths.push(child.absolutePath);
            }
            paths = paths.concat(getAllDescendantPaths(child, includeFilesOnly));
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
            // A child of a selected folder is being unchecked ("subtractive uncheck").
            newSelectedFiles = newSelectedFiles.filter(p => p !== selectedAncestor);
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (ancestorNode && ancestorNode.children) {
                // Add all direct children of the ancestor EXCEPT the one that was part of the uncheck path.
                for (const child of ancestorNode.children) {
                    if (!path.startsWith(child.absolutePath)) {
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

    // 1. Get the full set of all individual files that are currently selected.
    const effectiveFileSelection = new Set<string>();
    for (const selectedPath of currentSelectedFiles) {
        const node = fileMap.get(selectedPath);
        if (node) {
            if (node.children) { // It's a directory
                getAllDescendantPaths(node, true).forEach(file => effectiveFileSelection.add(file));
            } else { // It's a file
                effectiveFileSelection.add(selectedPath);
            }
        }
    }
    logger.log(`[Batch Remove] Expanded initial selection to ${effectiveFileSelection.size} effective files.`);

    // 2. Remove the unwanted files from this effective set.
    for (const pathToRemove of pathsToRemove) {
        effectiveFileSelection.delete(pathToRemove);
    }
    logger.log(`[Batch Remove] After removal, ${effectiveFileSelection.size} files remain.`);


    // 3. Compress the remaining set of files into the most efficient list of paths (folders + files).
    const finalPaths = new Set<string>();
    const checkedForCompression = new Set<string>();

    const compress = (node: FileNode) => {
        if (!node.children || checkedForCompression.has(node.absolutePath)) {
            return;
        }

        const descendantFiles = getAllDescendantPaths(node, true);
        if (descendantFiles.length === 0) {
            return; // Don't add empty folders
        }

        const allDescendantsSelected = descendantFiles.every(file => effectiveFileSelection.has(file));

        if (allDescendantsSelected) {
            finalPaths.add(node.absolutePath);
            // Mark all descendants as handled by this compression
            descendantFiles.forEach(file => checkedForCompression.add(file));
        } else {
            // Recurse to children if not all are selected
            node.children.forEach(compress);
        }
    };

    fileTree.forEach(compress);

    // Add any remaining files that were not part of a compressed folder
    for (const file of effectiveFileSelection) {
        if (!checkedForCompression.has(file)) {
            finalPaths.add(file);
        }
    }
    
    logger.log(`[Batch Remove] Compressed final selection to ${finalPaths.size} paths.`);
    return Array.from(finalPaths);
};