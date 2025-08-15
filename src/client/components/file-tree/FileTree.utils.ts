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

// Helper to ensure path comparisons are safe against partial name matches (e.g., 'src' vs 'src-tiled')
const isAncestor = (ancestor: string, descendent: string) => {
    if (ancestor === descendent) return false;
    // Normalize by ensuring ancestor path ends with a separator
    const ancestorWithSlash = ancestor.endsWith('/') ? ancestor : `${ancestor}/`;
    return descendent.startsWith(ancestorWithSlash);
};

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    const descendantPaths = getAllDescendantPaths(node);
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => isAncestor(ancestor, path));
    
    let newSelectedFiles = [...selectedFiles];

    if (isSelected) {
        // Uncheck: remove this path and all its descendants
        newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
    } else if (hasSelectedAncestor) {
        // Uncheck a child of an already checked folder.
        // 1. Remove the ancestor.
        const ancestor = selectedFiles.find(ancestor => isAncestor(ancestor, path))!;
        const ancestorNode = getFileNodeByPath(fileTree, ancestor)!;
        
        newSelectedFiles = newSelectedFiles.filter(p => p !== ancestor);
        
        // 2. Add all children of the ancestor EXCEPT the one that was unchecked and its descendants.
        const siblingsAndCousins = getAllDescendantPaths(ancestorNode).filter(p => p !== path && !isAncestor(path, p));
        newSelectedFiles.push(...siblingsAndCousins);

    } else {
        // Check: remove all descendants that might be individually selected, then add the parent path.
        newSelectedFiles = newSelectedFiles.filter(p => !isAncestor(path, p));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Remove duplicates for cleanliness
};

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    // Use the isAncestor helper to prevent partial path segment matches
    if (node.children && isAncestor(node.absolutePath, filePath)) {
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