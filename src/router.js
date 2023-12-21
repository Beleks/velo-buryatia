import { createRouter, createWebHistory } from "vue-router";

function widthCheck(to) {
  let width = window.innerWidth;

  if (width < 1200) {
    return { name: `${to.name}_m`, params: to.params };
  }
}

function widthCheckM(to) {
  let width = window.innerWidth;

  if (width >= 1200) {
    return { name: `${to.name.slice(0, -2)}`, params: to.params };
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
        redirect: () => {
          return { name: "Events" };
        },
        children: [
          {
            name: "Events",
            path: "",
            component: () => import("@/pages/Events.vue"),
          },
          {
            name: "Season",
            path: ":eventId",
            component: () => import("@/pages/Season.vue"),
          },
        ],
      },
      {
        name: "About",
        path: "/about",
        component: () => import("@/pages/About.vue"),
      },
      // { Страница отчётов, отзывов
      //   name: "Reports",
      //   path: "/reports",
      //   component: () => import("@/pages/Reports.vue"),
      // },
      {
        name: "Cyclists",
        path: "cyclists",
        component: () => import("@/pages/Cyclists.vue"),
        redirect: () => {
          return { name: "CyclistsTable" };
        },
        children: [
          {
            name: "CyclistsTable",
            path: "",
            component: () => import("@/pages/CyclistsTable.vue"),
          },
          {
            name: "Cyclist",
            path: ":cyclistId",
            component: () => import("@/pages/Cyclist.vue"),
          },
        ],
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
        redirect: () => {
          return { name: "Events_m" };
        },
        children: [
          {
            name: "Events_m",
            path: "",
            component: () => import("@/pages/mobile/Events.vue"),
          },
          {
            name: "Season_m",
            path: ":eventId",
            component: () => import("@/pages/mobile/Season.vue"),
          },
        ],
      },
      {
        name: "About_m",
        path: "about",
        component: () => import("@/pages/mobile/About.vue"),
      },
      // {
      //   name: "Reports_m",
      //   path: "reports",
      //   component: () => import("@/pages/mobile/Reports.vue"),
      // },
      {
        name: "Cyclists_m",
        path: "cyclists",
        component: () => import("@/pages/mobile/Cyclists.vue"),
        redirect: () => {
          return { name: "CyclistsTable_m" };
        },
        children: [
          {
            name: "CyclistsTable_m",
            path: "",
            component: () => import("@/pages/mobile/CyclistsTable.vue"),
          },
          {
            name: "Cyclist_m",
            path: ":cyclistId",
            component: () => import("@/pages/mobile/Cyclist.vue"),
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
