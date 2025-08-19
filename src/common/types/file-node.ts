export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
    tokenCount: number;
    fileCount: number; // For directories, this is the count of files inside. For files, it's 1.
    isImage: boolean;
    sizeInBytes: number;
    extension: string;
    gitStatus?: string; // e.g., 'M', 'U', 'A', 'D', 'C'
    problemCounts?: { error: number; warning: number; };
}