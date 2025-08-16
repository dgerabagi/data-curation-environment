import { FileNode } from "@/common/types/file-node";

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
    // Normalize paths for comparison to avoid issues with mixed slashes
    const normalizedFilePath = filePath.replace(/\\/g, '/');
    const normalizedNodePath = node.absolutePath.replace(/\\/g, '/');

    if (node.children && normalizedFilePath.startsWith(normalizedNodePath + '/')) {
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

    // Check if the node is directly selected or selected via an ancestor
    const isDirectlySelected = newSelectedFiles.includes(path);
    const selectedAncestor = newSelectedFiles.find(ancestor => {
        const normalizedPath = path.replace(/\\/g, '/');
        const normalizedAncestor = ancestor.replace(/\\/g, '/');
        return normalizedPath.startsWith(normalizedAncestor + '/') && path !== ancestor;
    });

    const isEffectivelySelected = isDirectlySelected || !!selectedAncestor;

    if (isEffectivelySelected) {
        // --- UNCHECK LOGIC ---
        if (selectedAncestor) {
            // A child of an already checked folder is being unchecked.
            // 1. Remove the ancestor.
            newSelectedFiles = newSelectedFiles.filter(p => p !== selectedAncestor);
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (ancestorNode && ancestorNode.children) {
                // 2. Add all children of the ancestor EXCEPT the one that was just unchecked.
                for (const child of ancestorNode.children) {
                    // Don't re-add the path that was clicked.
                    if (child.absolutePath !== path) {
                         newSelectedFiles.push(child.absolutePath);
                    }
                }
            }
        } else {
            // A parent or a file that was checked directly is being unchecked.
            // Remove it and all its descendants.
            const descendantPaths = getAllDescendantPaths(node);
            newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
        }
    } else {
        // --- CHECK LOGIC ---
        // 1. Remove any descendants that might already be individually selected,
        // as the new parent selection will cover them.
        const descendantPaths = getAllDescendantPaths(node);
        newSelectedFiles = newSelectedFiles.filter(p => !descendantPaths.includes(p));
        
        // 2. Add the new path.
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Use Set to remove any duplicates.
};