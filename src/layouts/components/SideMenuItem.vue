<script setup lang="ts">
import type { NetworkMenu } from "@/types/menu";
import * as path from "pathe";

const props = defineProps<{
  menuItem: NetworkMenu;
  basePath: string;
}>();
// 合并二个 path 路径
const mergePath = computed(() => {
  if (path.isAbsolute(props.menuItem.path)) {
    return props.menuItem.path;
  }
  return path.join(props.basePath, props.menuItem.path);
});
</script>

<template>
  <el-sub-menu v-if="menuItem.children && menuItem.children.length" :index="mergePath">
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ menuItem.name }}</span>
    </template>
    <SideMenuItem
      v-for="(item, index) in menuItem.children"
      :key="index"
      :menu-item="item"
      :base-path="mergePath"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="mergePath">
    <el-icon>
      <component :is="'location'" />
    </el-icon>
    <div class="flex-1 text-ellipsis overflow-hidden">
      {{ menuItem.name }}
    </div>
  </el-menu-item>
</template>
