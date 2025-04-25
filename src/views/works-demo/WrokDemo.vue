<script setup lang="ts">
let worker: Worker | null = null;
// 使用 Vite 的特殊导入语法
worker = new Worker(new URL("../../works/myWorker.ts", import.meta.url), {
  type: "module"
});

worker.onmessage = (e: MessageEvent) => {
  console.log("结果:", e.data);
};

// 执行work
const executeWork = () => {
  // 向 worker 发送消息
  worker.postMessage({
    type: "CALCULATE",
    data: 100
  });
};
// 组件卸载时终止 worker
onUnmounted(() => {
  worker?.terminate();
});
</script>
<template>
  <div>
    <div class="editor-container">
      <el-button type="primary" @click="executeWork">执行work</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
