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
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
});

// 假设 pendingRequests 和 requestQueue 是全局变量，需明确初始化
const pendingRequests = new Map<string, Promise<InternalAxiosRequestConfig>>();
const requestQueue: (() => void)[] = [];
let activeRequests = 0; // 全局变量，需确保线程安全
// 生成请求标识
const generateReqKey = (config: InternalAxiosRequestConfig) => {
  return [
    config.url,
    config.method,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join("&");
};
// 请求缓存池中删除请求
const subPendingRequest = (config: InternalAxiosRequestConfig) => {
  const requestKey = generateReqKey(config);
  pendingRequests.delete(requestKey);
  activeRequests--;
  processQueue();
};
// 执行队列中的请求
const processQueue = () => {
  while (activeRequests < 5 && requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();
    nextRequest?.();
  }
};
// 生成请求
const generateRequestPromise = (config: InternalAxiosRequestConfig) => {
  const requestKey = generateReqKey(config);
  // 重复请求处理
  if (pendingRequests.has(requestKey)) {
    return pendingRequests.get(requestKey)!;
  }
  // 创建新的Promise用于队列控制
  const requestPromise = new Promise<InternalAxiosRequestConfig>(resolve => {
    const executeRequest = async () => {
      // 增加线程安全机制
      activeRequests++;
      // 添加token等原有逻辑
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      setTimeout(() => {
        resolve(config);
      }, 1000);
    };

    if (activeRequests >= 5) {
      requestQueue.push(executeRequest);
    } else {
      executeRequest();
    }
  });
  pendingRequests.set(requestKey, requestPromise);
  return requestPromise;
};
// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requestPromise = generateRequestPromise(config);
    return requestPromise;
  },
  (error: any) => {
    console.log("interceptors  request", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("interceptors  response", response);
    subPendingRequest(response.config);
    if (response.status !== 200) return Promise.reject(response.data);
    return response;
  },
  (error: any) => {
    console.log("interceptors  response error", error);
    const axiosError = error as AxiosError;
    subPendingRequest(axiosError.config!);
    if (!axios.isCancel(error)) {
      handleGeneralError(axiosError.status || axiosError?.response?.status);
    }
    return Promise.reject(axiosError.response);
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
export function request<T = unknown>(config: AxiosRequestConfig): Promise<[any, T | null]> {
  config.signal = config.signal || new AbortController().signal;
  return new Promise(resolve => {
    service<ResponseData>(config)
      .then(response => {
        console.log("request response", response);
        const data = response.data as ResponseData;
        if (!data) {
          resolve([response, null]);
          return;
        }
        if (data.code !== 200) {
          handleGeneralError(data.code, data.message);
          console.log("request response", data.message || "请求失败");
          resolve([data.message, null]);
          return;
        }
        resolve([null, data.data as T]);
      })
      .catch((error: any) => {
        console.log("request catch", error);
        return resolve([error, null]);
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
