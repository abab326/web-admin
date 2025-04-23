export const constantsRoutes = [
  {
    path: "/",
    name: "home",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue")
  }
];
