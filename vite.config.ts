import path from "path";
import { defineConfig, loadEnv } from "vite";

import { createVitePlugins, createbuildConfig, createCssConfig, createProxy } from "./config";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"));
  console.log("command", command, env);
  return {
    // 路径
    base: "./",
    // env 目录
    envDir: "./env",
    // 插件
    plugins: createVitePlugins(),
    // 服务器
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
      cors: true,
      proxy: createProxy([["/api", "https://www.baidu.com"]])
    },
    // 构建
    build: createbuildConfig(),
    // 别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    // css
    css: createCssConfig(),
    // 预加载
    optimizeDeps: {
      include: ["echarts", "axios"]
    }
  };
});
