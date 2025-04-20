<script setup lang="ts">
import Compressor from "compressorjs";
import {
  ElMessage,
  type UploadFile,
  type UploadRawFile,
  type UploadRequestOptions,
  type UploadUserFile
} from "element-plus";
import { api } from "v-viewer";
const props = defineProps<{
  fileTypes?: string[];
  maxSize?: number;
  compressOptions?: Compressor.Options;
}>();

const fileList = defineModel<UploadUserFile[]>("file-list", { default: [] });
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

const fileUpload = (file: UploadRequestOptions) => {
  console.log("11", file);
  return new Promise<boolean>((resolve, reject) => {
    // 这里可以替换成你自己的上传接口
    setTimeout(() => {
      fileList.value.push({
        name: file.file.name,
        url: URL.createObjectURL(file.file),
        status: "fail"
      });
      reject(false);
    }, 1000 * 3);
  });
};
const handlePreview = (file: UploadFile) => {
  console.log(file);
  api({
    images: [file.url!],
    options: {
      toolbar: 0
    }
  }).view();
};

const handleRemove = (file: UploadFile) => {
  console.log("handleRemove", file);
  console.log("handleRemove", fileList.value);
};
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    class="image-uploader"
    :style="{ '--file-card-size': fileList.length > 0 ? '100px' : '80px' }"
    :show-file-list="true"
    :before-upload="beforeUpload"
    :http-request="fileUpload"
    :on-remove="handleRemove"
    :on-preview="handlePreview"
    :disabled="true"
    list-type="picture-card"
  >
    <slot>
      <el-icon size="28"><Plus /></el-icon>
    </slot>
  </el-upload>
</template>

<style lang="scss" scoped>
.image-uploader {
  --file-card-size: 80px;
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
  :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: var(--file-card-size);
  }
  :deep(.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: var(--file-card-size);
  }
}
</style>
