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
    name: "2023",
    title: "XVI Байкальский веломарафон 2023",
    disable: false,
    img: new URL("@/assets/bg_04.jpg", import.meta.url),
  },
  {
    name: "2022",
    title: "XV Байкальский веломарафон 2022",
    disable: false,
    img: new URL("@/assets/bg_01.jpg", import.meta.url),
  },
  {
    name: "2019",
    title: "XII Байкальский веломарафон 2019",
    disable: false,
    img: new URL("@/assets/bg_02.jpg", import.meta.url),
  },
  {
    name: "2018",
    title: "XI Байкальский веломарафон 2018",
    disable: false,
    img: new URL("@/assets/bg_03.jpg", import.meta.url),
  },
  {
    name: "2017",
    title: "X Байкальский веломарафон 2017",
    disable: false,
    img: new URL("@/assets/bg_08.jpg", import.meta.url),
  },
  {
    name: "2016",
    title: "IX Байкальский веломарафон 2016",
    disable: false,
    img: new URL("@/assets/bg_05.jpg", import.meta.url),
  },
  {
    name: "2015",
    title: "VIII Байкальский веломарафон 2015",
    disable: false,
    img: new URL("@/assets/bg_06.jpg", import.meta.url),
  },
  {
    name: "2014",
    title: "VII Байкальский веломарафон 2014",
    disable: false,
    img: new URL("@/assets/bg_07.jpg", import.meta.url),
  },
];

function chooseSeason(season) {
  if (!season.disable) {
    router.push({ name: "Season", params: { season: season.name } });
  }
}
</script>

<template>
  <div v-if="nothingIsSelected">
    <div
      v-for="season in seasons"
      :key="season.name"
      @click="chooseSeason(season)"
      class="max-w-3xl m-auto border-2 my-border-color mb-6 rounded transition ease-out relative"
      :class="[
        season.disable
          ? 'opacity-50'
          : 'hover:border-emerald-400 hover:text-emerald-400 cursor-pointer',
      ]"
    >
      <img
        v-if="!season.disable"
        class="absolute w-full h-full object-cover -z-10 opacity-10"
        :src="season.img"
        alt=""
      />
      <div class="text-center py-10 px-20">
        <div class="text-3xl">{{ season.title }}</div>
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