export interface ComponentSchema {
  id: string;
  name: string;
  type: "container" | "el-button" | "el-input" | string;
  props: { [key: string]: any };
  modelKey?: string;
  children?: ComponentSchema[];
  parentId?: string;
  slots?: {
    [key: string]: any;
  };
  events?: {
    [key: string]: any;
  };
}

export interface DesignerState {
  components: ComponentSchema[];
  selectedComponentId: string | null;
  history: {
    past: ComponentSchema[][];
    future: ComponentSchema[][];
  };
}

export interface ElButtonProps {
  type?: "primary" | "success" | "warning" | "danger" | "info" | "text";
  size?: "large" | "default" | "small";
  icon?: string;
}

export interface ElInputProps {
  type?: "text" | "textarea" | "number";
  maxlength?: number;
  showWordLimit?: boolean;
}
