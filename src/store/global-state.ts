import type { RouteRecordRaw, RouteLocationNormalizedGeneric } from "vue-router";
import pathe from "pathe";
import type { NetworkMenu } from "@/types/menu";
import { globalApi } from "@/api";
import { arrayToTree } from "@/utils/array-to-tree";

const pageModules = import.meta.glob(["@/views/**/*.vue", "@/views/**/component/**/*.vue"]);
console.log("pageModules", pageModules);

function getComponent(componentName?: string) {
  if (!componentName) {
    return null;
  }
  if (componentName.toLocaleLowerCase().startsWith("layout")) {
    return () => import(`@/layouts/DefaultLayout.vue`);
  }
  const componentPath = pathe.join("/src/views/", componentName);
  const component = pageModules[`${componentPath}.vue`];
  return component;
}

/**
 * 定义全局状态管理
 * 该函数用于定义全局状态管理的存储。
 * 它使用Pinia库提供的defineStore函数来创建一个名为"globalState"的存储。
 * 该存储包含了多个状态变量和操作函数，用于管理全局的状态和数据。
 * @property {Ref<boolean>} menuCollapsed - 菜单是否收起的状态变量。
 * @property {Ref<NetworkMenu[]>} networkMenuList - 网络菜单列表的状态变量。
 * @property {Ref<NetworkMenu[]>} menuList - 菜单列表的状态变量。
 * @property {Ref<unknown[]>} breadcrumbList - 面包屑列表的状态变量。
 * @property {Ref<unknown[]>} tagTabsList - 标签页列表的状态变量。
 * @property {Function} toggleMenuCollapsed - 切换菜单展开收起的操作函数。
 * @property {Function} getNetMenuList - 获取网络菜单列表的操作函数。
 * @property {Function} generateMenuList - 生成菜单列表的操作函数。
 * @property {Function} generateRoutesList - 生成路由列表的操作函数。
 * @property {Function} addTagTabsList - 添加标签页列表的操作函数。
 * @property {Function} removeTagTabsList - 移除标签页列表的操作函数。
 * @property {Function} clearTagTabsList - 清空标签页列表的操作函数。
 * @returns {Object} - 包含多个状态变量和操作函数的对象。
 */
export const useGlobalStateStore = defineStore("globalState", () => {
  const menuCollapsed = ref(false);
  // 后端返回的菜单列表
  const networkMenuList = ref<NetworkMenu[]>([]);
  // 前端处理后的菜单列表
  const menuList = ref<NetworkMenu[]>([]);
  // 前端处理后的面包屑列表
  const breadcrumbList = ref([]);
  // 前端处理后的标签页列表
  const tabsList = ref<RouteLocationNormalizedGeneric[]>([]);
  // 当前激活的标签页
  const activeTab = ref("");

  /**
   * 设置当前激活的标签页
   * @param tabName - 标签页名称
   */
  function setActiveTab(tabName: string) {
    activeTab.value = tabName;
  }
  /**
   * 切换菜单展开收起
   * 该函数用于切换菜单的展开和收起状态。
   * 当调用该函数时，menuCollapsed的值会取反，即如果当前为展开状态，则切换为收起状态；
   * 如果当前为收起状态，则切换为展开状态。
   */
  function toggleMenuCollapsed() {
    menuCollapsed.value = !menuCollapsed.value;
  }
  /**
   * 初始化网络菜单列表
   * 该函数用于构建并赋值一个包含菜单项的列表，用于在网络相关的页面或组件中展示导航菜单
   * 每个菜单项包含的信息有：id（菜单项的唯一标识）、name（菜单显示的名称）、path（对应的路由路径）、
   * icon（图标名称，通常用于左侧菜单的图标展示）、show（是否显示该菜单项）、component（对应的组件名称）和
   * children（子菜单项列表，这里初始化为空数组，表示没有子菜单）
   */
  async function getNetMenuList() {
    const [error, result] = await globalApi.systemApi.getSystemMenu();
    if (!error && result) {
      networkMenuList.value = result;
      menuList.value = generateMenuList(networkMenuList.value);
    }
  }
  /**
   * 生成菜单列表
   * 该函数用于根据网络菜单列表生成前端处理的菜单列表。
   * 首先，过滤掉所有show为false的菜单项，然后使用arrayToTree函数将过滤后的列表转换为树形结构。
   * 最后，将生成的树形结构赋值给menuList变量。
   */
  function generateMenuList(menuArrayList: NetworkMenu[] = []) {
    const filterList = menuArrayList.filter(item => item.show);
    return arrayToTree(filterList);
  }

  function generateRoutesList(menuRouteList: NetworkMenu[] = []) {
    const routesList: RouteRecordRaw[] = [];
    if (!menuRouteList || menuRouteList.length === 0) {
      menuRouteList = menuList.value;
    }
    for (const menu of menuRouteList) {
      const componentName = menu.component;

      const route: RouteRecordRaw = {
        path: menu.path,
        name: menu.name,
        component: getComponent(componentName),
        meta: {
          title: menu.name,
          icon: menu.icon
        },
        children: []
      };
      if (menu.children && menu.children.length > 0) {
        route.children = [...generateRoutesList(menu.children)];
      }
      routesList.push(route);
    }
    return routesList;
  }
  /**
   * 添加标签页
   * @param tab - 标签页对象，包含name和path属性
   */
  function addTagTabsList(tab: RouteLocationNormalizedGeneric) {
    if (!tabsList.value.some(t => t.path === tab.path)) {
      tabsList.value.push(tab);
    }
    setActiveTab(tab.path);
  }

  /**
   * 移除标签页
   * @param path - 要移除的标签页路径
   */
  function removeTagTabsList(path: string) {
    tabsList.value = tabsList.value.filter(tab => tab.path !== path);
  }

  /**
   * 清空标签页列表
   * @param start - 开始索引（可选）
   * @param end - 结束索引（可选）
   */
  function clearTagTabsList(start?: number, end?: number) {
    if (start !== undefined && end !== undefined) {
      tabsList.value.splice(start, end - start);
    } else if (start !== undefined) {
      tabsList.value.splice(start);
    } else {
      tabsList.value = [];
    }
  }

  return {
    menuCollapsed,
    toggleMenuCollapsed,
    networkMenuList,
    getNetMenuList,
    generateMenuList,
    generateRoutesList,
    menuList,
    breadcrumbList,
    tabsList,
    activeTab,
    setActiveTab,
    addTagTabsList,
    removeTagTabsList,
    clearTagTabsList
  };
});
