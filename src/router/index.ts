import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/DesignerPage.vue")
    },
    {
      path: "/about",
      component: () => import("@/views/About.vue")
    },
    {
      path: "/svg",
      component: () => import("@/views/svg-demo/index.vue")
    }
  ]
});
