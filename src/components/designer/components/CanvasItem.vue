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
  setup({ componentOptions }, { emit }) {
    const formData = inject<{ [key: string]: any }>("formData", {});
    // 处理自定义事件
    if (componentOptions.events) {
      for (const key in componentOptions.events) {
        const eventValue = componentOptions.events[key];
        const eventFun = (...args: any[]) => {
          if (typeof eventValue === "function") {
            eventValue(...args);
          }
          if (typeof eventValue === "string") {
            const fun = new Function(eventValue);
            fun(...args);
          }
          emit("item-event", { key, args });
        };
        componentOptions.props![key] = eventFun;
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
    // 动态加载组件
    let resolveNode: any = "div";
    try {
      resolveNode = resolveComponent(componentOptions.type);
    } catch (e) {
      console.log(e);
      resolveNode = componentOptions.type;
    }
    //处理 modelvalue 事件
    const handleModelValue = (value: any) => {
      console.log("onUpdate:modelValue", value);
      if (componentOptions.modelKey) {
        formData.value[componentOptions.modelKey] = value;
      }
    };
    return () =>
      h(
        resolveNode,
        {
          ...componentOptions.props,
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
