export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
    tokenCount: number;
    fileCount: number; // For directories, this is the count of files inside. For files, it's 1.
    isImage: boolean;
    sizeInBytes: number;
    extension: string;
    isPdf: boolean;
    isExcel: boolean;
    isWordDoc: boolean;
    isSelectable: boolean;
    // gitStatus and problemCounts are removed as they are now handled dynamically
    error?: string;
}