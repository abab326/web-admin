import { get } from "@/utils/request";
export const getSystemInfo = () => get("/system/info");
export const getSystemConfig = () => get("/system/config");

export const systemApi = {
  getSystemInfo,
  getSystemConfig
};
