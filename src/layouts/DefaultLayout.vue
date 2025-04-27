<script setup lang="ts">
import SideMenu from "./components/SideMenu.vue";
import Header from "./components/Header.vue";
import NavTab from "./components/NavTab.vue";
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
        <!-- 导航标签页 -->
        <NavTab />
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
