// mock/index.ts
import { MockMethod } from "vite-plugin-mock";
import { generateResult } from "./utils";
// 菜单列表
// 注意
// 这里的菜单列表是模拟的
// 实际开发中需要从后端获取
const menuList = generateResult([
  {
    id: 1,
    parentId: 0,
    name: "首页",
    path: "/main",
    icon: "HomeOutlined",
    show: true,
    component: "layout"
  },
  {
    id: 2,
    parentId: 1,
    name: "页面设计",
    path: "designer",
    icon: "InfoCircleOutlined",
    show: true,
    component: "DesignerPage"
  },
  {
    id: 3,
    parentId: 1,
    name: "关于",
    path: "about",
    icon: "InfoCircleOutlined",
    show: true,
    component: "About"
  },
  {
    id: 4,
    parentId: 1,
    name: "svg",
    path: "svg",
    icon: "InfoCircleOutlined",
    show: true,
    component: "/svg-demo/index"
  },
  {
    id: 5,
    parentId: 1,
    name: "table",
    path: "table",
    icon: "InfoCircleOutlined",
    show: true,
    component: "/table-demo/TableDemo"
  },
  {
    id: 6,
    parentId: 1,
    name: "file",
    path: "file",
    icon: "InfoCircleOutlined",
    show: true,
    component: "/file-demo/FileDemo"
  },
  {
    id: 7,
    parentId: 1,
    name: "editor",
    path: "editor",
    icon: "InfoCircleOutlined",
    show: true,
    component: "/code-edit/CodeEdit"
  },
  {
    id: 8,
    parentId: 1,
    name: "worker",
    path: "worker",
    icon: "InfoCircleOutlined",
    show: true,
    component: "/works-demo/WrokDemo"
  },
  {
    id: 9,
    parentId: 1,
    name: "bpmn",
    path: "bpmn",
    icon: "InfoCircleOutlined",
    show: true,
    component: "/bpmn-demo/BpmnDemo"
  }
]);

export default [
  {
    url: "/api/system/menu",
    method: "get",
    response: () => {
      return menuList;
    }
  },
  {
    url: "/api/login",
    method: "post",
    timeout: 1000,
    response: ({ body }) => {
      return {
        code: 0,
        data: {
          token: "1234567890",
          ...body
        }
      };
    }
  }
] as MockMethod[];
