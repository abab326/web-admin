import path from "path";
import { type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import { visualizer } from "rollup-plugin-visualizer";
// import { createHtmlPlugin } from "vite-plugin-html";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin, type ViteSvgIconsPlugin } from "vite-plugin-svg-icons";
import Unocss from "unocss/vite";
import viteCompression from "vite-plugin-compression";
import { viteMockServe } from "vite-plugin-mock";

const svgoOptions: ViteSvgIconsPlugin["svgoOptions"] = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false
        }
      }
    },
    "removeDimensions", // 移除 width/height
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke|class|style|data-name)",
        preserveCurrentColor: true
      }
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ fill: "currentColor" }] // 添加 fill="currentColor"
      }
    }
  ]
};
const vitePlugins: PluginOption[] = [
  // 支持 Vue 单文件组件
  vue(),
  // 支持 Vue JSX 语法
  vueJsx(),
  // 自动导入 Composition API
  AutoImport({
    imports: ["vue", "vue-router", "pinia"],
    dts: "src/auto-imports.d.ts",
    resolvers: [ElementPlusResolver()],
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
      globalsPropValue: true
    }
  }),
  // 自动导入组件
  Components({
    dts: "src/components.d.ts",
    dirs: ["src/components/**", "!src/components/**/components"],
    resolvers: [],
    extensions: ["vue"],
    deep: true
  }),
  // svg
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
    symbolId: "icon-[name]",
    // 自定义 SVG 处理
    svgoOptions: svgoOptions
  }),
  // mock
  viteMockServe({
    mockPath: "mock",
    logger: true // 控制台显示请求日志
  }),
  // 原子化CSS
  Unocss({
    configFile: "./uno.config.ts"
  }),
  // 压缩配置
  viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: "gzip",
    ext: ".gz"
  })
];

const createVitePlugins = (): PluginOption[] => {
  return vitePlugins;
};
export default createVitePlugins;
