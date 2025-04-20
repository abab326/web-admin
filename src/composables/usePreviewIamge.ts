import { api } from "v-viewer";
export default function usePreviewImage() {
  const previewImage = (fileList: any[]) => {
    if (!fileList || fileList.length === 0) {
      return;
    }
    const images = fileList.map(item => {
      return typeof item === "string" ? item : item.url || item.path;
    });
    api({
      images: images,
      options: {
        // 配置项
        toolbar: 0
      }
    });
  };
  return { previewImage };
}
