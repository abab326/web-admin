<script setup lang="ts">
import SideMenu from "./components/SideMenu.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="layout-container flex h-screen w-full">
    <!-- 左侧菜单 -->
    <SideMenu />
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- 顶部功能栏 -->
      <Header />
      <!-- 主内容区 -->
      <main class="flex flex-1 flex-col overflow-hidden">
        <!-- 页面标题 -->
        <div class="px-4 py-2 bg-gray-100 flex items-center justify-between">
          <h1 class="text-lg font-semibold">页面标题</h1>
          <!-- 这里可以添加额外的功能按钮 -->
        </div>
        <!-- 主要内容 -->
        <div class="flex-1 relative">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 这里可以添加样式 */
</style>
