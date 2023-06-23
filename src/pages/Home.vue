<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

let menu = [
  {
    name: "About",
    title: "О марафоне",
    // Убрать после 25.06.23
  },
  // {
  //   name: "Reports",
  //   title: "Отчёты",
  //   // Убрать после 25.06.23
  // },
  // {
  //   name: "About",
  //   title: "FAQ",
  //   // Убрать после 25.06.23
  // },
  // {
  //   name: "",
  //   title: "Регистрация",
  //   // Убрать после 25.06.23
  //   disable: true,
  // },
  {
    name: "Results",
    title: "Результаты",
  },
];

const currentPathName = computed(() => {
  if (route.matched[1]) {
    return route.matched[1].name;
  }
});

function chooseMenuItem(pathName) {
  if (currentPathName.value !== pathName) {
    router.push({ name: pathName });
  }
}
</script>

<template>
  <div class="text-white font-sans font-semibold">
    <menu class="flex justify-center py-10">
      <div
        :class="[
          ' mr-10 last:mr-0 cursor-pointer',
          { ' text-emerald-400': currentPathName === item.name },
        ]"
        v-for="item in menu"
        :key="item.name"
      >
        <div @click="chooseMenuItem(item.name)" :to="item.name">
          {{ item.title }}
        </div>
      </div>
    </menu>
    <div class="mb-40">
      <router-view />
    </div>
    <footer class="footer-bg fixed bottom-0 w-full">Footer</footer>
  </div>
</template>

<style>
.footer-bg {
  background-color: #292b2d;
}
</style>
