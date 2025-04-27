<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGlobalStateStore } from "@/store/global-state";
import { storeToRefs } from "pinia";
import type { TabPaneName } from "element-plus";

const router = useRouter();
const globalStateStore = useGlobalStateStore();
const { tabsList: tabs, activeTab } = storeToRefs(globalStateStore);
// 切换标签页
const handleTabClick = (path: TabPaneName): void => {
  activeTab.value = path as string;
  router.push(path as string);
};

// 删除标签页
const removeTab = (path: TabPaneName) => {
  globalStateStore.removeTagTabsList(path as string);
  if (activeTab.value === path) {
    activeTab.value = tabs.value[tabs.value.length - 1]?.path || "/";
    if (activeTab.value) {
      router.push(activeTab.value);
    }
  }
};

// 删除左侧标签页
const removeLeftTabs = (path: TabPaneName) => {
  const index = tabs.value.findIndex(tab => tab.path === path);
  if (index > 0) {
    globalStateStore.clearTagTabsList(0, index);
  }
};

// 删除右侧标签页
const removeRightTabs = (path: string) => {
  const index = tabs.value.findIndex(tab => tab.path === path);
  if (index < tabs.value.length - 1) {
    globalStateStore.clearTagTabsList(index + 1);
  }
};

// 删除其他标签页
const removeOtherTabs = (path: string) => {
  const activeItem = tabs.value.find(tab => tab.path === path);
  globalStateStore.clearTagTabsList();
  globalStateStore.addTagTabsList(activeItem!);
};
const getTabName = (route: any) => {
  let tabName = route.name;
  if (route.meta?.title) {
    tabName = route.meta.title;
  }
  return tabName;
};
</script>

<template>
  <div class="flex items-center">
    <div class="flex flex-1 overflow-x-auto">
      <el-tabs v-model="activeTab" closable @tab-change="handleTabClick" @tab-remove="removeTab">
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.path"
          :name="tab.path"
          :label="getTabName(tab)"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown>
      <el-button type="primary" size="small" class="ml-2">
        标签操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="removeLeftTabs(activeTab)">关闭左侧</el-dropdown-item>
          <el-dropdown-item @click="removeRightTabs(activeTab)">关闭右侧</el-dropdown-item>
          <el-dropdown-item @click="removeOtherTabs(activeTab)">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs) {
  --el-tabs-header-height: 32px;
  width: 100%;

  .el-tabs__header {
    margin: 0 0 4px;
    .el-tabs__nav-wrap:after {
      background-color: transparent;
    }
  }
}
</style>
