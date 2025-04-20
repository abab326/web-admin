import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/designer",
      component: () => import("@/views/DesignerPage.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/login/Login.vue")
    },
    {
      path: "/about",
      component: () => import("@/views/About.vue")
    },
    {
      path: "/svg",
      component: () => import("@/views/svg-demo/index.vue")
    },
    {
      path: "/table",
      component: () => import("@/views/table-demo/TableDemo.vue")
    },
    {
      path: "/file",
      component: () => import("@/views/file-demo/FileDemo.vue")
    }
  ]
});
