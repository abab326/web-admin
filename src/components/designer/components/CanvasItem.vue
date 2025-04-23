<script lang="tsx">
import type { ComponentSchema } from "@/types/designer";
import { type PropType } from "vue";
export default defineComponent({
  name: "CanvasItem",
  props: {
    componentOptions: {
      type: Object as PropType<ComponentSchema>,
      required: true
    }
  },
  emits: ["item-event"],
  setup({ componentOptions }) {
    const formData = inject<Record<string, any>>("formData", {});
    const evnets: Record<string, any> = {};
    // 处理自定义事件
    if (componentOptions.events) {
      for (const key in componentOptions.events) {
        evnets[key] = componentOptions.events![key];
      }
    }
    // 处理slots
    const slots: Record<string, any> = {};
    if (componentOptions.slots) {
      for (const key in componentOptions.slots) {
        const slotValue = componentOptions.slots![key];
        slots[key] = typeof slotValue === "function" ? slotValue : () => slotValue;
      }
    }
    //处理 modelvalue 事件
    const handleModelValue = (value: any) => {
      console.log("handleModelValue", value);
      if (componentOptions.modelKey) {
        // 由于 formData 类型未知，这里假设 formData 是一个 Ref 对象，并且其值是一个对象
        if (componentOptions.modelKey) {
          formData.value[componentOptions.modelKey] = value;
        }
      }
    };
    return () =>
      h(
        resolveComponent(componentOptions.type),
        {
          ...componentOptions.props,
          ...evnets,
          ...(componentOptions.modelKey
            ? {
                modelValue: formData.value[componentOptions.modelKey],
                "onUpdate:modelValue": handleModelValue
              }
            : {})
        },
        slots
      );
  }
});
</script>
