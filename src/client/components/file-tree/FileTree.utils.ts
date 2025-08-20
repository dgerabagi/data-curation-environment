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
    logger.log(`[Selection] Toggling path: ${path}`);
    const node = getFileNodeByPath(fileTree, path);
    if (!node) {
        logger.error(`[Selection] Node not found for path: ${path}`);
        return selectedFiles;
    }

    const currentSelection = new Set(selectedFiles);
    const isDirectlySelected = currentSelection.has(path);
    const selectedAncestor = selectedFiles.find(ancestor => path.startsWith(ancestor + '/') && path !== ancestor);

    const isEffectivelySelected = isDirectlySelected || !!selectedAncestor;
    logger.log(`[Selection] isDirectlySelected: ${isDirectlySelected}, hasSelectedAncestor: ${!!selectedAncestor}`);

    if (isEffectivelySelected) {
        // --- UNCHECKING ---
        logger.log(`[Selection] Unchecking logic initiated.`);
        if (selectedAncestor) {
            logger.log(`[Selection] Performing 'subtractive uncheck'. Ancestor: ${selectedAncestor}`);
            // A child of a selected folder is being unchecked.
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (!ancestorNode || !ancestorNode.children) {
                logger.error(`[Selection] Could not find ancestor node or it has no children. Aborting.`);
                return selectedFiles;
            }

            // 1. Remove the ancestor from the selection.
            currentSelection.delete(selectedAncestor);
            
            // 2. Add back all direct children of the ancestor EXCEPT the one on the path of the clicked node.
            for (const child of ancestorNode.children) {
                if (!path.startsWith(child.absolutePath)) {
                    logger.log(`[Selection] Adding sibling: ${child.absolutePath}`);
                    currentSelection.add(child.absolutePath);
                } else {
                    logger.log(`[Selection] Skipping branch: ${child.absolutePath}`);
                }
            }
        } else {
            // A directly selected item is being unchecked. Remove it.
            logger.log(`[Selection] Unchecking directly selected item: ${path}`);
            currentSelection.delete(path);
        }
    } else {
        // --- CHECKING ---
        logger.log(`[Selection] Checking logic initiated.`);
        // Remove any descendants that are already selected, as the new parent selection covers them.
        const newSelection = new Set<string>();
        for (const p of currentSelection) {
            if (!p.startsWith(path + '/')) {
                newSelection.add(p);
            } else {
                logger.log(`[Selection] Removing descendant '${p}' because parent '${path}' is being checked.`);
            }
        }
        newSelection.add(path);
        return Array.from(newSelection);
    }
  
  const finalSelection = Array.from(currentSelection);
  logger.log(`[Selection] Final selection count: ${finalSelection.length}`);
  return finalSelection;
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
        const nodeToRemove = fileMap.get(pathToRemove);
        if (nodeToRemove) {
            if (nodeToRemove.children) { // It's a directory
                getAllDescendantPaths(nodeToRemove, true).forEach(file => effectiveFileSelection.delete(file));
            } else { // It's a file
                effectiveFileSelection.delete(pathToRemove);
            }
        }
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