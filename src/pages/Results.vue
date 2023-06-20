<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let nothingIsSelected = computed(() => {
  return route.name == "Results";
});

const seasons = [
  {
    name: "2022",
    title: "2022 XVV",
  },
  // {
  //   name: "2021",
  //   title: "2021 XVV",
  // },
  // {
  //   name: "2020",
  //   title: "2020 XVV",
  // },
];

function chooseSeason(season) {
  router.push({ name: "Season", params: { season: season.name } });
}
</script>

<template>
  <div v-if="nothingIsSelected">
    <div
      v-for="season in seasons"
      :key="season.name"
      @click="chooseSeason(season)"
      class="px-20 max-w-3xl m-auto text-center py-6 border-2 my-border-color mb-6 rounded hover:border-lime-400 hover:text-lime-400 transition ease-out cursor-pointer"
    >
      <div class="text-3xl">
        {{ season.title }}
      </div>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<style>
.hover-table-item:hover {
  background-color: hsla(0, 0%, 100%, 0.08);
}
.bg-table-color {
  background-color: rgba(49, 53, 56, 0.8);
}
.bg-my-color {
  background-color: rgba(49, 53, 56, 1);
}
.bg-input-color {
  background-color: #313538;
}
.bg-input-color-selected {
  background-color: #242628;
}
.first {
  background-color: #fee265;
  color: #242627;
  /* width: 36px; */
  /* height: 36px; */
  /* border-radius: 50px; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}
.second {
  background-color: #a9d3d8;
  color: #242627;
  /* width: 36px;
  height: 36px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center; */
}
.third {
  background-color: #a66f45;
  color: #242627;
}
</style>