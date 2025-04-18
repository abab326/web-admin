import { defineStore } from "pinia";
import { type ComponentSchema } from "@/types/designer.d";
export const useDesignerStore = defineStore("designer", {
  state: () => ({
    componentList: [] as ComponentSchema[],
    viewsData: {} as Record<string, any>,
    selectedComponentId: ""
  }),
  actions: {
    addComponent(component: ComponentSchema) {
      this.componentList.push(component);
    },
    removeComponent(componentId: string) {
      this.componentList = this.componentList.filter(c => c.id !== componentId);
    },
    updateComponentProps(componentId: string, props: Record<string, any>) {
      const component = this.componentList.find(c => c.id === componentId);
      if (component) {
        component.props = { ...component.props, ...props };
      }
    },
    setSelectedComponent(componentId: string) {
      this.selectedComponentId = componentId;
    },
    undo() {},
    redo() {}
  }
});
