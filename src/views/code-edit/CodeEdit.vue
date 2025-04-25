<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import * as monaco from "monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  }
};
const editorRef = useTemplateRef("editorRef");
const language = ref("javascript");
// 显式指定 editor 类型为 monaco.editor.IStandaloneCodeEditor 或 null
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

onMounted(() => {
  init();
});

// 监听语言变化
watch(language, newLang => {
  if (editor) {
    const model = editor.getModel();
    monaco.editor.setModelLanguage(model!, newLang);
  }
});

const init = async () => {
  if (editorRef.value) {
    editor = monaco.editor.create(editorRef.value, {
      value: "// 输入你的代码\n",
      language: language.value,
      theme: "vs-dark",
      automaticLayout: true,
      minimap: { enabled: true },
      fontSize: 14,
      tabSize: 2
    });
  }
};
// 格式化代码
const formatCode = async () => {
  try {
    await editor?.getAction("editor.action.formatDocument")?.run();
  } catch (e) {
    console.error("格式化失败:", e);
    alert("当前语言不支持自动格式化");
  }
};

// 保存代码
const saveCode = () => {
  const code = editor?.getValue();
  console.log("保存代码:", code);
};
</script>

<template>
  <div class="editor-container">
    <div class="toolbar">
      <select v-model="language">
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <button @click="formatCode">格式化</button>
      <button @click="saveCode">保存</button>
    </div>
    <div ref="editorRef" class="editor"></div>
  </div>
</template>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor {
  flex: 1;
  height: 0;
}

.toolbar {
  padding: 8px;
  display: flex;
  gap: 8px;
}
</style>
