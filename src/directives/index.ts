import type { App } from "vue";
import watermark from "./watermark";

export default {
  install(app: App) {
    app.directive("watermark", watermark);
  }
};
