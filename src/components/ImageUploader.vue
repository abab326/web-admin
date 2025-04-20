<script setup lang="ts">
import { ref } from "vue";
import Compressor from "compressorjs";
import { ElMessage, type UploadFile, type UploadRawFile } from "element-plus";

const props = defineProps<{
  fileTypes?: string[];
  maxSize?: number;
  compressOptions?: Compressor.Options;
}>();

const dialogVisible = ref(false);
const previewUrl = ref("");

const beforeUpload = (file: UploadRawFile) => {
  // 文件类型校验
  if (props.fileTypes && !props.fileTypes.includes(file.type)) {
    ElMessage.error(`仅支持${props.fileTypes.join(",")}格式`);
    return false;
  }

  // 文件大小校验
  if (props.maxSize && file.size > props.maxSize) {
    ElMessage.error(`文件大小不能超过${props.maxSize / 1024 / 1024}MB`);
    return false;
  }

  return new Promise<File | Blob | boolean>(resolve => {
    if (props.compressOptions) {
      new Compressor(file, {
        ...props.compressOptions,
        success: resolve,
        error: () => {
          ElMessage.error("图片压缩失败");
          resolve(false);
        }
      });
    } else {
      resolve(file);
    }
  });
};

const handlePreview = (file: UploadFile) => {
  previewUrl.value = file.url!;
  dialogVisible.value = true;
};
</script>

<template>
  <el-upload v-bind="$attrs" :before-upload="beforeUpload" @preview="handlePreview">
    <slot />
  </el-upload>
</template>

<style scoped>
.preview-image {
  width: 100%;
  object-fit: contain;
}
</style>
