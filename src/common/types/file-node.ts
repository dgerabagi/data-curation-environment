export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
    tokenCount?: number;
}