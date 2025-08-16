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

    const isDirectlySelected = newSelectedFiles.includes(path);
    const selectedAncestor = newSelectedFiles.find(ancestor => {
        const normalizedPath = path.replace(/\\/g, '/');
        const normalizedAncestor = ancestor.replace(/\\/g, '/');
        return normalizedPath.startsWith(normalizedAncestor + '/') && path !== ancestor;
    });

    const isEffectivelySelected = isDirectlySelected || !!selectedAncestor;

    if (isEffectivelySelected) {
        if (selectedAncestor) {
            newSelectedFiles = newSelectedFiles.filter(p => p !== selectedAncestor);
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (ancestorNode && ancestorNode.children) {
                for (const child of ancestorNode.children) {
                    if (child.absolutePath !== path) {
                         newSelectedFiles.push(child.absolutePath);
                    }
                }
            }
        } else {
            const descendantPaths = getAllDescendantPaths(node);
            newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
        }
    } else {
        const descendantPaths = getAllDescendantPaths(node);
        newSelectedFiles = newSelectedFiles.filter(p => !descendantPaths.includes(p));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)];
};

export const removePathsFromSelected = (
    pathsToRemove: string[],
    selectedFiles: string[],
    fileTree: FileNode[]
): string[] => {
    let newSelectedFiles = [...selectedFiles];
    for (const path of pathsToRemove) {
        // This reuses the same logic as unchecking, which is complex.
        // A simpler approach is to just remove the path and its descendants.
        const node = getFileNodeByPath(fileTree, path);
        if (!node) continue;

        const descendantPaths = getAllDescendantPaths(node);
        newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
    }
    return newSelectedFiles;
};