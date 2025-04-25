import { get } from "@/utils/request";
export const getSystemMenu = () => get("/system/menu");
export const getSystemInfo = () => get("/system/info");
export const getSystemConfig = () => get("/system/config");

export const systemApi = {
  getSystemMenu,
  getSystemInfo,
  getSystemConfig
};
