import { ref } from "vue";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from "bpmn-js-properties-panel";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda.json";

export function useBpmnModeler() {
  const modelerInstance = ref<BpmnModeler | null>(null);

  const initModeler = async (options: {
    container: HTMLElement;
    propertiesPanelContainer?: HTMLElement | null;
    additionalModules?: any[];
    moddleExtensions?: Record<string, any>;
  }) => {
    const { container, propertiesPanelContainer } = options;

    modelerInstance.value = new BpmnModeler({
      container,
      propertiesPanel: {
        parent: propertiesPanelContainer
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        ...(options.additionalModules || [])
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
        ...(options.moddleExtensions || {})
      }
    });

    // 注册事件监听
    registerEventListeners();
  };

  const destroyModeler = () => {
    if (modelerInstance.value) {
      modelerInstance.value.destroy();
      modelerInstance.value = null;
    }
  };

  const registerEventListeners = () => {
    if (!modelerInstance.value) return;
  };

  return {
    modelerInstance,
    initModeler,
    destroyModeler
  };
}
