<script setup lang="ts">
import { useDesignerStore } from "@/store/designer";

const handleSave = () => {
  // 暂留保存逻辑
};
// 撤销
const handleUndo = () => {
  useDesignerStore().undo();
};
// 重做
const handleRedo = () => {
  useDesignerStore().redo();
};
</script>

<template>
  <div class="toolbar">
    <div class="left-group">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button type="primary" @click="handleUndo">撤销</el-button>
      <el-button type="primary" @click="handleRedo">重做</el-button>
    </div>
  </div>
</template>
