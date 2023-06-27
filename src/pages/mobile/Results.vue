<script setup>
import VeloDarkSvg from "@/components/svg/VeloDarkSvg.vue";
import VeloColorSvg from "@/components/svg/VeloColorSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let nothingIsSelected = computed(() => {
  return route.name == "Results_m";
});

const seasons = [
  {
    name: "2023",
    title: "XVI Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_04.jpg", import.meta.url),
  },
  {
    name: "2022",
    title: "XV Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_01.jpg", import.meta.url),
  },
  {
    name: "2019",
    title: "XII Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_02.jpg", import.meta.url),
  },
  {
    name: "2018",
    title: "XI Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_03.jpg", import.meta.url),
  },
  {
    name: "2017",
    title: "X Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_08.jpg", import.meta.url),
  },
  {
    name: "2016",
    title: "IX Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_05.jpg", import.meta.url),
  },
  {
    name: "2015",
    title: "VIII Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_06.jpg", import.meta.url),
  },
  {
    name: "2014",
    title: "VII Байкальский веломарафон",
    disable: false,
    img: new URL("@/assets/bg_07.jpg", import.meta.url),
  },
];

function chooseSeason(season) {
  if (!season.disable) {
    router.push({ name: "Season_m", params: { season: season.name } });
  }
}
function goToCyclists() {
  router.push({ name: "Cyclists_m" });
}
</script>

<template>
  <div v-if="nothingIsSelected">
    <div
      @click="goToCyclists"
      class="m-auto border-2 my-border-color mb-4 mx-2 rounded transition ease-out relative cursor-pointer hover:border-emerald-400 hover:text-emerald-400 fill-svg-velo hover:fill-emerald-400"
    >
      <div class="text-center flex justify-center items-center py-5 px-5">
        <VeloDarkSvg />
        <div class="text-xl mx-4">Участники</div>
        <VeloDarkSvg />
      </div>
    </div>
    <hr class="dashed-2 mx-2 my-4" />
    <div
      v-for="season in seasons"
      :key="season.name"
      @click="chooseSeason(season)"
      class="m-auto border-2 my-border-color mb-4 mx-2 rounded transition ease-out relative"
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
      <div class="text-center py-5 px-5 text-xl sm:px-10">
        <div class="">{{ season.title }}</div>
        <div class="">{{ season.name }}</div>
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