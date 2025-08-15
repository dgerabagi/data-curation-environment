import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc: string[], node) => {
    if (node.isExpanded) {
      acc.push(node.absolutePath);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};