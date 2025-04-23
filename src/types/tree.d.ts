export interface TreeNode<T extends Record<string, any>> {
  [key: string]: any;
  children?: T[];
}
