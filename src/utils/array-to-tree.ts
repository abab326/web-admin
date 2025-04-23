import * as _ from "lodash-es";
import type { TreeNode } from "@/types/tree";

type ArrayToTreeOption = {
  idKey?: string;
  parentKey?: string;
  childrenKey?: string;
};

export function arrayToTree<T extends TreeNode<T>>(
  array: T[],
  options: ArrayToTreeOption = {}
): T[] {
  const { idKey = "id", parentKey = "parentId", childrenKey = "children" } = options;

  const clonedArray = _.cloneDeep(array);
  const tree: T[] = [];
  const map: Record<string, T> = {};

  // 创建映射
  for (const item of clonedArray) {
    const id = _.get(item, idKey);
    map[id] = item;
  }

  // 构建树
  for (const item of clonedArray) {
    const parentId = _.get(item, parentKey);

    if (parentId) {
      const parent = map[parentId];
      if (parent) {
        if (!parent[childrenKey]) {
          (parent as any)[childrenKey] = [];
        }
        parent[childrenKey].push(item);
      }
    } else {
      tree.push(item);
    }
  }

  return tree;
}
