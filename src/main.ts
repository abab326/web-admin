import { createApp } from "vue";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "@/styles/globals.scss";
import "virtual:uno.css";

import "dayjs/locale/zh-cn";
import "dayjs/locale/fa";

import router from "./router";
import pinia from "./store";
import directives from "./directives";
// 导入 svg icon
import "virtual:svg-icons-register";

import App from "./App.vue";

const app = createApp(App);
// 注册ElementPlusIcons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.use(ElementPlus, { locale: zhCn });
app.use(directives);

// 注册图片预览组件
app.use(Viewer);
/**
 * 挂载应用
 */
app.mount("#app");
