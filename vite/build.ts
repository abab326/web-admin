import { type BuildEnvironmentOptions } from "vite";

export default function createbuildConfig() {
  const buildConfig: BuildEnvironmentOptions = {
    // 输出文件目录
    outDir: "dist",
    // 静态资源目录
    assetsDir: "static",
    // 关闭文件计算
    reportCompressedSize: false,
    // 关闭生成map文件
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    // 在生产环境移除console.log
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 打包配置
    rollupOptions: {
      output: {
        // manualChunks 是 Rollup 中的一个配置选项，用于手动控制代码分割的行为。
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        chunkFileNames: "static/js/[name]-[hash].js",
        // 用于命名代码拆分时创建的共享块的输出命名
        entryFileNames: "static/js/[name]-[hash].js",
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  };
  return buildConfig;
}
