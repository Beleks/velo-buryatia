<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

let menu = [
  {
    name: "",
    title: "О марафоне",
    // Убрать после 25.06.23
    disable: true,
  },
  {
    name: "",
    title: "Отчёты",
    // Убрать после 25.06.23
    disable: true,
  },
  {
    name: "",
    title: "FAQ",
    // Убрать после 25.06.23
    disable: true,
  },
  {
    name: "",
    title: "Регистрация",
    // Убрать после 25.06.23
    disable: true,
  },
  {
    name: "Results",
    title: "Результаты",
    disable: false,
  },
];

const currentPathName = computed(() => {
  if (route.matched[1]) {
    console.log(route.matched, "route.matched");
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
          ' mr-10 last:mr-0',
          item.disable ? 'opacity-10' : ' cursor-pointer',
          { ' text-lime-400': currentPathName === item.name },
        ]"
        v-for="item in menu"
        :key="item.name"
      >
        <div @click="chooseMenuItem(item.name)" :to="item.name">
          {{ item.title }}
        </div>
      </div>
    </menu>
    <router-view />
  </div>
</template>

<style>
</style>
