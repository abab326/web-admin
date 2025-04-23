<script lang="ts" setup>
defineOptions({
  name: "FileDemo"
});
const fileList = ref<any[]>([]);
const getFileList = () => {
  console.log("getFileList", fileList.value);
};
</script>

<template>
  <div>
    <ImageUploader v-model:file-list="fileList" />
    <el-button type="primary" @click="getFileList">展示文件列表</el-button>
  </div>
</template>
