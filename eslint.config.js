import { readFileSync } from "fs";
import { defineConfig } from "eslint/config";
import eslintJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import vuePlugin from "eslint-plugin-vue";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import unocssEslintConfigFlat from "@unocss/eslint-config/flat";
import globals from "globals";

const autoEslintGlobals = JSON.parse(readFileSync("./.eslintrc-auto-import.json", "utf-8"));
export default defineConfig([
  // 全局变量
  {
    files: ["**/*.{js,mjs,ts,tsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
        ...autoEslintGlobals.globals
      }
    }
  },
  // 忽略文件
  {
    ignores: ["dist", "node_modules", "public"]
  },
  // 基础配置
  eslintJs.configs.recommended,
  // 支持 TypeScript
  tsEslint.configs.recommended,

  // 支持 Vue
  ...vuePlugin.configs["flat/recommended"],
  // 针对 TypeScript 文件
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsEslint.parser, // 使用 TypeScript 解析器
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin // 启用 @typescript-eslint 插件
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        parser: tsEslint.parser,
        ecmaFeatures: {
          jsx: true // 添加这行启用 JSX 支持
        }
      }
    }
  },

  // 支持 UnoCSS
  unocssEslintConfigFlat,
  // 支持 Prettier
  prettierPlugin,
  {
    files: ["**/*.{js,mjs,ts,tsx,vue}"],
    rules: {
      "prettier/prettier": ["warn", { endOfLine: "auto" }], // 自动检测换行符
      "vue/jsx-uses-vars": "error",
      "vue/multi-word-component-names": "off",
      "vue/block-order": [
        "error",
        {
          order: ["script", "template", "style"]
        }
      ],
      "@typescript-eslint/no-explicit-any": "off" // 关闭 any 类型的检查
    }
  }
]);
