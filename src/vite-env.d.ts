/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<unknown, unknown, any>;
  export default component;
}
declare module "bpmn-js-properties-panel";
