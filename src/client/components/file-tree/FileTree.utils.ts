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
                    const normalizedChildPath = child.absolutePath.replace(/\\/g, '/');
                    const normalizedPath = path.replace(/\\/g, '/');
                    if (!normalizedChildPath.startsWith(normalizedPath)) {
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
        newSelectedFiles = newSelectedFiles.filter(p => !p.startsWith(path));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)];
};

export const removePathsFromSelected = (
    pathsToRemove: string[],
    selectedFiles: string[],
    fileTree: FileNode[]
): string[] => {
    let selectionSet = new Set(selectedFiles);

    // This function recursively finds all file paths under a given node path
    const getAllFilePaths = (node: FileNode): string[] => {
        if (!node.children) return [node.absolutePath];
        return node.children.flatMap(getAllFilePaths);
    };

    // Create a map for quick node lookup
    const fileMap: Map<string, FileNode> = new Map();
    const buildFileMap = (node: FileNode) => {
        fileMap.set(node.absolutePath, node);
        if (node.children) node.children.forEach(buildFileMap);
    };
    fileTree.forEach(buildFileMap);

    // First, remove all paths that are being explicitly removed
    pathsToRemove.forEach(p => selectionSet.delete(p));

    // Then, process the remaining selection to handle directory logic
    const finalSelection = new Set<string>();
    const processedPaths = new Set<string>();

    for (const path of selectionSet) {
        if (processedPaths.has(path)) continue;

        const node = fileMap.get(path);
        if (!node) continue;

        // If it's a directory, add it and mark all its children as processed
        if (node.children) {
            finalSelection.add(path);
            const childPaths = getAllFilePaths(node);
            childPaths.forEach(childPath => processedPaths.add(childPath));
        } else {
            // If it's a file, just add it
            finalSelection.add(path);
            processedPaths.add(path);
        }
    }

    return Array.from(finalSelection);
};