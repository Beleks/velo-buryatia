<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let isSeasonSelected = computed(() => {
  return !!route.params.season;
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
  <div v-if="!isSeasonSelected">
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
</style>