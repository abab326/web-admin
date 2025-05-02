# Web Admin 管理系统

## 项目介绍

基于 Vue 3 技术栈构建的企业级中后台管理系统，采用现代化前端技术架构，提供高效、灵活的开发体验。

### 核心技术栈

- **Vue 3** + TypeScript + Vite
- **Element Plus** - UI组件库
- **Pinia** - 状态管理
- **Vue Router** - 路由管理
- **Unocss** - 原子化CSS引擎
- **Axios** - HTTP请求库

### 主要特性

- 模块化开发架构
- 响应式布局设计
- 完善的权限控制
- 丰富的组件库
- 高效的状态管理方案

## 目录结构

```
├── src
│   ├── api/              # API接口
│   ├── assets/           # 静态资源
│   ├── components/       # 全局组件
│   │   ├── BpmnEditor.vue # BPMN流程设计器
│   │   ├── ImageUploader.vue # 图片上传组件
│   │   ├── SearchForm.vue # 搜索表单组件
│   │   ├── designer/     # 表单设计器组件
│   │   └── svg-icon/     # SVG图标组件
│   ├── composables/      # 组合式函数
│   ├── directives/       # 自定义指令
│   ├── layouts/          # 布局组件
│   ├── router/           # 路由配置
│   ├── store/            # Pinia状态管理
│   ├── styles/           # 全局样式
│   ├── types/            # 类型定义
│   ├── utils/            # 工具函数
│   ├── views/            # 页面视图
│   └── works/            # Web Workers

## 功能模块

### 图片上传组件

- 支持多种图片格式：JPEG/PNG/GIF
- 自动压缩优化（最大宽度1600px）
- 实时预览与删除功能
- 文件大小限制（默认10MB）
- 多图上传支持

### 表单设计器

- 可视化拖拽布局
- 动态组件加载
- 自定义事件绑定
- 实时数据管理
- 表单验证集成

### BPMN流程设计器

- 基于BPMN 2.0标准
- 可视化流程建模
- 节点属性配置
- 流程导出/导入

### 其他功能

- 用户权限管理
- 菜单配置
- 数据可视化
- 系统监控
