# My Vue Application

## 项目介绍

基于 Vue 3 技术栈构建，使用 Element Plus UI 组件库实现企业级中后台系统。主要技术栈包含：

- Vue 3 + TypeScript + Vite
- Element Plus 组件库
- Pinia 状态管理
- Vue Router 路由管理
- Unocss 原子化CSS引擎

## 目录结构

```
├── src
│   ├── components/        # 全局组件
│   │   ├── ImageUploader 图片上传组件
│   │   ├── designer      表单设计器组件
│   │   └── svg-icon      SVG图标组件
│   ├── views/            # 页面组件
│   ├── store/            # Pinia状态管理
│   └── styles/           # 全局样式

## 功能说明
### 图片上传组件
- 支持 JPEG/PNG/GIF 格式
- 自动压缩图片（最大宽度1600px）
- 实时预览与删除功能
- 文件大小限制（默认10MB）

### 表单设计器组件
- 可视化拖拽布局
- 动态组件加载能力
- 自定义事件绑定
- 实时表单数据管理
