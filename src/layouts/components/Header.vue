<script setup lang="ts">
import { useGlobalStateStore } from "@/store/global-state";
import packageJson from "../../../package.json";

const globalStateStore = useGlobalStateStore();
const appVersion = packageJson.version;
</script>

<template>
  <div class="header-content px-4 py-1 flex w-full shadow-xs items-center justify-between">
    <!-- 左侧logo/标题 -->
    <div class="flex items-center">
      <el-icon @click="globalStateStore.toggleMenuCollapsed"><Expand /></el-icon>
    </div>

    <!-- 右侧功能区 -->
    <div class="flex items-center space-x-4">
      <!-- 通知图标 -->

      <el-icon :size="20"><bell /></el-icon>

      <!-- 设置图标 -->

      <el-icon :size="20"><setting /></el-icon>

      <!-- 版本号 -->
      <div class="text-sm text-gray-500 mr-4">v{{ appVersion }}</div>

      <!-- 用户信息 -->
      <el-dropdown>
        <div class="flex cursor-pointer items-center space-x-2">
          <el-avatar :size="32" src="" />
          <span>用户名</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
