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
        // --- UNCHECK LOGIC ---
        if (selectedAncestor) {
            // Unchecking a child of an already checked folder
            // 1. Remove the ancestor.
            newSelectedFiles = newSelectedFiles.filter(p => p !== selectedAncestor);
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (ancestorNode && ancestorNode.children) {
                // 2. Add all children of the ancestor EXCEPT the one that was just unchecked.
                for (const child of ancestorNode.children) {
                    if (child.absolutePath !== path) {
                        newSelectedFiles.push(child.absolutePath);
                    }
                }
            }
        } else {
            // Unchecking a parent or a file that was checked directly
            const descendantPaths = getAllDescendantPaths(node);
            newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
        }
    } else {
        // --- CHECK LOGIC ---
        // 1. Remove all descendants that might already be individually selected
        const descendantPaths = getAllDescendantPaths(node);
        newSelectedFiles = newSelectedFiles.filter(p => !descendantPaths.includes(p));
        
        // 2. Add the new path
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Remove duplicates for cleanliness
};