<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, provide } from "vue";
import { useBpmnModeler } from "@/composables/useBpmnModeler";
import { useBpmnState } from "@/composables/useBpmnState";

// 组件属性
const props = defineProps({
  xml: { type: String, default: "" }
});

// 组件事件
const emit = defineEmits(["save", "error", "loading", "loaded"]);

// 模板引用
const bpmnCanvas = ref<HTMLElement | null>(null);
const propertiesPanelContainer = ref<HTMLElement | null>(null);

// 使用组合式API
const { modelerInstance, initModeler, destroyModeler } = useBpmnModeler();
const { setStatus } = useBpmnState();

// 初始化BPMN编辑器
onMounted(async () => {
  if (!bpmnCanvas.value) return;

  try {
    emit("loading", true);
    setStatus("正在初始化BPMN编辑器...");

    await initModeler({
      container: bpmnCanvas.value,
      propertiesPanelContainer: propertiesPanelContainer.value
    });

    if (props.xml) {
      await loadDiagram(props.xml);
    } else {
      await createNewDiagram();
    }

    emit("loaded", modelerInstance.value);
    setStatus("就绪");
  } catch (error) {
    handleError(error);
  } finally {
    emit("loading", false);
  }
});

// 清理资源
onBeforeUnmount(() => {
  destroyModeler();
});

// 监听XML变化
watch(
  () => props.xml,
  async newXml => {
    if (newXml && modelerInstance.value) {
      await loadDiagram(newXml);
    }
  }
);

// 提供模型器实例给子组件
provide("modeler", modelerInstance);

// 方法实现
const loadDiagram = async (xml: string) => {
  try {
    setStatus("正在加载流程图...");
    const importXMLResult = await modelerInstance.value?.importXML(xml);
    if (importXMLResult?.warnings?.length) {
      setStatus(`加载完成，有${importXMLResult?.warnings.length}个警告`, "warning");
    } else {
      setStatus("流程图加载完成");
    }
  } catch (err) {
    handleError(err);
  }
};

const createNewDiagram = async () => {
  const defaultXml = "";
  await loadDiagram(defaultXml);
};

const handleSave = async (format: "xml" | "svg" = "xml") => {
  try {
    setStatus("正在保存...");
    let result;

    if (format === "xml") {
      result = await modelerInstance.value?.saveXML({ format: true });
      emit("save", { xml: result?.xml, format });
    } else {
      result = await modelerInstance.value?.saveSVG();
      emit("save", { svg: result?.svg, format });
    }

    setStatus("保存成功");
    return result;
  } catch (err) {
    handleError(err);
  }
};

const handleExport = async (type: "svg" | "png" = "svg") => {
  // 实现导出逻辑
  console.log("type", type);
};

const handleValidate = async () => {
  // 实现验证逻辑
};

const handleError = (error: unknown) => {
  console.error("BPMN错误:", error);
  setStatus(`错误: ${error instanceof Error ? error.message : String(error)}`, "error");
  emit("error", error);
};

defineExpose({
  save: handleSave,
  export: handleExport,
  validate: handleValidate,
  getModeler: () => modelerInstance.value
});
</script>

<template>
  <div class="flex h-full">
    <div ref="bpmnCanvas" class="flex-1"></div>
    <div ref="propertiesPanelContainer" class="w-64"></div>
  </div>
</template>

<style lang="scss">
@import url("bpmn-js/dist/assets/diagram-js.css");
@import url("bpmn-js/dist/assets/bpmn-font/css/bpmn.css");
@import url("bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css");
</style>
