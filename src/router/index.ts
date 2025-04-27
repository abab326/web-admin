import { createRouter, createWebHistory } from "vue-router";
import { constantsRoutes } from "./constant";

import { useGlobalStateStore } from "@/store/global-state";
const router = createRouter({
  history: createWebHistory(),
  routes: [...constantsRoutes]
});

router.beforeEach(async (to, from, next) => {
  const globalStateStore = useGlobalStateStore();
  globalStateStore.addTagTabsList(to);
  if (globalStateStore.menuList.length === 0) {
    await globalStateStore.getNetMenuList();
    const routes = globalStateStore.generateRoutesList();
    // 动态添加路由
    routes.forEach(route => {
      router.addRoute(route);
    });
    next({ path: to.path });
    return;
  }
  next();
});
export default router;
