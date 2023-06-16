import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Home", path: "/", component: () => import("@/pages/Home.vue") },
  {
    name: "Results",
    path: "/results",
    component: () => import("@/pages/Results.vue"),
    children: [
      {
        name: "Season",
        path: ":season",
        component: () => import("@/pages/Season.vue"),
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
