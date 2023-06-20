import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/:pathMatch(.*)*", component: () => import("@/pages/NotFound.vue") },
  {
    name: "Desktop",
    path: "/",
    redirect: () => {
      return { name: "Results" };
    },
    component: () => import("@/pages/Home.vue"),
    children: [
      {
        name: "Results",
        path: "results",
        component: () => import("@/pages/Results.vue"),
        children: [
          {
            name: "Season",
            path: ":season",
            component: () => import("@/pages/Season.vue"),
          },
          {
            name: "Cyclist",
            path: "cyclist/:cyclistId",
            component: () => import("@/pages/Cyclist.vue"),
          },
        ],
      },
    ],
  },

  // { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
