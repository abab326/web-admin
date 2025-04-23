<script setup lang="ts">
import SideMenuItem from "./SideMenuItem.vue";

import { useGlobalStateStore } from "@/store/global-state";

const globalStateStore = useGlobalStateStore();
const { menuCollapsed, menuList } = storeToRefs(globalStateStore);
</script>

<template>
  <el-scrollbar class="shadow-sm animate-bounce-in-left">
    <el-menu class="border-none h-full" router :collapse="menuCollapsed">
      <side-menu-item
        v-for="item in menuList"
        :key="item.path"
        :menu-item="item"
        :base-path="'/'"
      />
    </el-menu>
  </el-scrollbar>
</template>
