import { type CSSOptions } from "vite";
export default function createCssConfig(): CSSOptions {
  const cssConfig: CSSOptions = {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  };
  return cssConfig;
}
