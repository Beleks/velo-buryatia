import { createRouter, createWebHistory } from "vue-router";

function widthCheck(to) {
  let width = window.innerWidth;

  if (width < 1200) {
    return { name: "Mobile" };
  }
}

function widthCheckM(to) {
  let width = window.innerWidth;

  if (width >= 1200) {
    return { name: "Desktop" };
  }
}

const routes = [
  { path: "/:pathMatch(.*)*", component: () => import("@/pages/NotFound.vue") },
  {
    name: "Desktop",
    path: "/",
    beforeEnter: [widthCheck],
    redirect: () => {
      return { name: "About" };
    },
    component: () => import("@/pages/Home.vue"),
    children: [
      {
        name: "Results",
        path: "results",
        component: () => import("@/pages/Results.vue"),
        children: [
          {
            name: "Cyclists",
            path: "cyclists",
            component: () => import("@/pages/Cyclists.vue"),
          },
          {
            name: "Season",
            path: ":season",
            component: () => import("@/pages/Season.vue"),
          },
          {
            name: "Cyclist",
            path: "cyclists/:cyclistId",
            component: () => import("@/pages/Cyclist.vue"),
          },
        ],
      },
      {
        name: "About",
        path: "/about",
        component: () => import("@/pages/About.vue"),
      },
      {
        name: "Reports",
        path: "/reports",
        component: () => import("@/pages/Reports.vue"),
      },
    ],
  },
  {
    name: "Mobile",
    path: "/m",
    beforeEnter: [widthCheckM],
    redirect: () => {
      return { name: "Results_m" };
    },
    component: () => import("@/pages/mobile/Home.vue"),
    children: [
      {
        name: "Results_m",
        path: "results",
        component: () => import("@/pages/mobile/Results.vue"),
        children: [
          {
            name: "Cyclists_m",
            path: "cyclists",
            component: () => import("@/pages/mobile/Cyclists.vue"),
          },
          {
            name: "Season_m",
            path: ":season",
            component: () => import("@/pages/mobile/Season.vue"),
          },
          {
            name: "Cyclist_m",
            path: "cyclists/:cyclistId",
            component: () => import("@/pages/mobile/Cyclist.vue"),
          },
        ],
      },
      {
        name: "About_m",
        path: "about",
        component: () => import("@/pages/mobile/About.vue"),
      },
      {
        name: "Reports_m",
        path: "reports",
        component: () => import("@/pages/mobile/Reports.vue"),
      },
    ],
  },
  {
    name: "Admin",
    path: "/admin",
    component: () => import("@/pages/Admin.vue"),
  },
  // { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
