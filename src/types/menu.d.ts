import type { TreeNode } from "./tree";

export interface NetworkMenu extends TreeNode<NetworkMenu> {
  id: number;
  parentId: number;
  name: string;
  path: string;
  icon: string;
  show: boolean;
  component?: string;
}
