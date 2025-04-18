import { type ComponentSchema } from "@/types/designer.d";
export const constantComponents: ComponentSchema[] = [
  {
    id: "button",
    name: "按钮",
    type: "el-button",
    props: {
      type: "primary"
    },
    slots: {
      default: "按钮"
    },
    events: {
      click: `() => { alert("按钮被点击了");}`
    }
  },
  {
    id: "input",
    name: "输入框",
    modelKey: "name",
    type: "el-input",
    props: {
      placeholder: "请输入",
      clearable: true
    },
    events: {
      change: (value: string) => {
        console.log("Change 1====", value);
      }
    }
  }
];
