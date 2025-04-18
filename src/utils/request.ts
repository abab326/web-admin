import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError
} from "axios";
import { ElMessage } from "element-plus";

interface ResponseData<T = unknown> {
  code: number;
  message: string;
  data: T;
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在这里统一添加token等
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status !== 200) return Promise.reject(response.data);
    handleGeneralError(response.data.code, response.data.message);
    return response;
  },
  (error: any) => {
    const axiosError = error as AxiosError;
    handleGeneralError(axiosError.status || axiosError?.response?.status);
    Promise.reject(axiosError.response);
  }
);

function handleGeneralError(code?: number, message?: string) {
  if (code && code === 401) {
    return true;
  }
  if (message) {
    ElMessage.error(message);
    return true;
  }
  const errMap: any = {
    403: "没有权限访问该资源",
    404: "请求的资源不存在",
    405: "请求方法不允许",
    408: "请求超时",
    500: "服务器内部错误",
    502: "网关错误",
    503: "服务不可用",
    504: "网关超时"
  };
  if (code && errMap[code]) {
    ElMessage.error(errMap[code]);
    return false;
  }
  ElMessage.error("未知错误");
  return true;
}
// 封装统一格式的请求方法
export function request<T = unknown>(config: AxiosRequestConfig): Promise<[T | null, any]> {
  return new Promise(resolve => {
    service<ResponseData>(config)
      .then(response => {
        const data = response.data as ResponseData;
        if (data.code !== 200) {
          resolve([null, data.message]);
          return;
        }
        resolve([data.data as T, null]);
      })
      .catch((error: any) => {
        return resolve([null, error]);
      });
  });
}
// 封装get请求
export function get<T = unknown>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<[T | null, any]> {
  return request<T>({
    url,
    method: "GET",
    params,
    ...config
  });
}
// 封装post请求
export function post<T = unknown>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<[T | null, any]> {
  return request<T>({
    url,
    method: "POST",
    data,
    ...config
  });
}
// 封装文件上传请求,
// 使用form-data格式,
// 支持自定义参数,
// 支持进度回调
export function upload<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig) {
  return request<T>({
    url,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...config
  });
}
// 封装文件下载请求,

export function download(url: string, params?: any, config?: AxiosRequestConfig) {
  return service({
    url,
    method: "GET",
    params,
    responseType: "blob",
    ...config
  });
}
export default service;
