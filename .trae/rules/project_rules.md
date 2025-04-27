# Vue 项目规范

## 项目概述

本项目基于 Vue 3、Vue-Router 和 pinia 构建，适用于中大型管理类项目。项目使用 `vite` 进行脚手架搭建，支持现代前端开发流程。

## 组件规范

### 基础规则

- **组件名使用 PascalCase**：所有组件名应使用 PascalCase 格式，例如 `UserProfile`。
- **组件文件结构**：组件文件应包含组件的template、script、style。
- **组件样式**：优先使用Unocss在标签编写的样式。例如`<div class="bg-red-500">`
- **使用 Composition API**：在组件中使用 Vue 3 的 Composition API 来组织逻辑, 例如 `<script setup>`。
- **Props 定义使用 `defineProps`**：使用 `defineProps` 来定义组件的 props, 超过三个参数使用 typescript interface 定义。
- **事件使用 `defineEmits`**：使用 `defineEmits` 来定义和触发组件事件，确保事件名称清晰且具有描述性。
- **使用 `defineExpose`**：使用 `defineExpose` 来定义组件的 exposed 属性，用于在父组件中访问。

### 目录结构

src/
├── api/              # API 接口
├── assets/           # 静态资源
├── components/       # 通用组件
├── composables/      # 自定义 composables
├── directives/       # 自定义指令
├── layouts/          # 布局组件
├── store/            # Vuex 状态管理
├── router/           # 路由配置
├── utils/            # 工具函数
├── views/            # 页面视图
└── main.js/           # 应用入口

### 组合式函数规范

- **以 `use` 开头命名**：所有组合式函数应以 `use` 开头命名，例如 `useUserList`。
- **一个函数只做一件事**：确保每个组合式函数只负责一个功能，避免功能混杂。
- **返回响应式数据**：返回值应为响应式数据，以便在组件中直接使用。
- **注意依赖收集**：确保在组合式函数中正确收集依赖，以便响应式更新。

### 性能优化

- **合理使用 `computed`**：使用 `computed` 来缓存计算结果，避免不必要的重新计算。
- **`v-show` vs `v-if`**：在需要频繁切换显示状态时，优先使用 `v-show`，以减少 DOM 操作。
- **使用 `defineAsyncComponent`**：对于大型组件，使用 `defineAsyncComponent` 进行懒加载，减少初始加载时间。
- **`keep-alive` 缓存**：使用 `keep-alive` 来缓存不需要频繁销毁的组件，提升性能。

## 状态管理

- **小型项目使用 `provide`/`inject`**：对于小型项目或局部状态管理，使用 `provide`/`inject`。
- **大型项目使用 Vuex**：对于大型项目，使用 Vuex 进行模块化的状态管理。
- **模块化状态管理**：将状态管理模块化，每个模块负责一个功能域，便于维护和扩展。
- **合理使用 `mapState` 和 `mapGetters`**：使用这些工具将 Vuex store 中的状态和计算属性映射到组件中，简化代码。

## 依赖说明

- **axios**：用于 HTTP 请求，与后端 API 交互。
- **element-plus**：UI 框架，提供丰富的组件库，用于快速构建界面。
- **vue-router**：用于页面路由管理，支持单页应用（SPA）。
- **pinia**：用于状态管理，支持模块化和响应式状态更新。

## 开发工具

- **vite**：项目脚手架工具，用于快速搭建项目和运行开发服务器。
- **eslint**：代码风格检查工具，确保代码质量。
- **prettier**：代码格式化工具，统一代码风格。
- **husky** 和 **lint-staged**：用于在提交代码前自动运行代码检查和格式化。
- **Unocss、sass**：用于编写样式。
