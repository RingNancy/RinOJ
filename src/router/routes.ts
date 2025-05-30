import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthority from "@/views/NoAuthority.vue";
import LoginView from "@/views/LoginView.vue";
import AccessEnum from "@/access/AccessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题库",
    component: HomeView,
  },

  {
    path: "/results",
    name: "运行结果",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/admin",
    name: "管理题库",
    component: AdminView,
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/none_authority",
    name: "ACCESS_DENY",
    component: NoAuthority,
    meta: {
      hideMenu: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
];
