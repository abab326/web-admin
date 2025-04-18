import {
  defineConfig,
  presetWind4,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  theme: {
    // 继承element-plus中的配色方案
    colors: {
      primary: "var(--el-color-primary)",
      success: "var(--el-color-success)",
      warning: "var(--el-color-warning)",
      danger: "var(--el-color-danger)",
      info: "var(--el-color-info)",
      error: "var(--el-color-error)"
    }
  },
  presets: [presetWind4(), presetAttributify()],
  transformers: [transformerDirectives({}), transformerVariantGroup()]
});
