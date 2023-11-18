<script setup>
import VeloDarkSvg from "@/components/svg/VeloDarkSvg.vue";
import VeloColorSvg from "@/components/svg/VeloColorSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

let nothingIsSelected = computed(() => {
  return route.name == "Results";
});

let seasons = ref([
  // {
  //   name: "2023",
  //   title: "XVI Байкальский веломарафон 2023",
  //   disable: false,
  //   img: new URL("@/assets/bg_04.jpg", import.meta.url),
  // },
  // {
  //   name: "2022",
  //   title: "XV Байкальский веломарафон 2022",
  //   disable: false,
  //   img: new URL("@/assets/bg_01.jpg", import.meta.url),
  // },
  // {
  //   name: "2019",
  //   title: "XII Байкальский веломарафон 2019",
  //   disable: false,
  //   img: new URL("@/assets/bg_02.jpg", import.meta.url),
  // },
  // {
  //   name: "2018",
  //   title: "XI Байкальский веломарафон 2018",
  //   disable: false,
  //   img: new URL("@/assets/bg_03.jpg", import.meta.url),
  // },
  // {
  //   name: "2017",
  //   title: "X Байкальский веломарафон 2017",
  //   disable: false,
  //   img: new URL("@/assets/bg_08.jpg", import.meta.url),
  // },
  // {
  //   name: "2016",
  //   title: "IX Байкальский веломарафон 2016",
  //   disable: false,
  //   img: new URL("@/assets/bg_05.jpg", import.meta.url),
  // },
  // {
  //   name: "2015",
  //   title: "VIII Байкальский веломарафон 2015",
  //   disable: false,
  //   img: new URL("@/assets/bg_06.jpg", import.meta.url),
  // },
  // {
  //   name: "2014",
  //   title: "VII Байкальский веломарафон 2014",
  //   disable: false,
  //   img: new URL("@/assets/bg_07.jpg", import.meta.url),
  // },
]);

function chooseEvent(event) {
  if (!event.disable) {
    router.push({ name: "Season", params: { eventId: event.id } });
  }
}
// function goToCyclists() {
//   router.push({ name: "Cyclists" });
// }

function getCirclesColor(index) {
  // index - всегда должен быть целым числом
  const value = index % 10;

  let circles = {
    small: "",
    big: "",
  };

  switch (value) {
    case 0:
      circles.small = "bg-pink-400";
      circles.big = "bg-rose-400";
      break;
    case 1:
      circles.small = "bg-purple-400";
      circles.big = "bg-fuchsia-400";
      break;
    case 2:
      circles.small = "bg-indigo-400";
      circles.big = "bg-violet-400";
      break;
    default:
      break;
  }

  return circles;
}

onMounted(() => {
  mainStore.getEvents().then((response) => {
    seasons.value = response.data.data.map((season, index) => {
      console.log(index);
      let bgStyle = `bg-gradient-${index}`;
      season.style = bgStyle;
      season.circles = getCirclesColor(index);
      return season;
    });
    console.log(seasons.value, "response");
  });
});
</script>

<!-- TODO: Season поменять на event -->
<template>
  <div class="flex max-w-[730px] mx-auto flex-wrap justify-between font-normal">
    <div
      v-for="(season, index) in seasons"
      :key="season.name"
      @click="chooseEvent(season)"
      :class="[
        season.disable ? 'opacity-50' : 'cursor-pointer',
        'mb-8 rounded-lg relative overflow-hidden group bg-[#202022]',
      ]"
    >
      <div
        class="w-[344px] m-0.5 h-[136px] rounded-lg py-3 px-3 flex flex-col justify-between absolute z-10 bg-[#202022]"
      >
        <div class="text-xl w-[250px]">{{ season.name }}</div>
        <div class="">{{ season.cyclists }}</div>
      </div>
      <div
        :class="['w-[348px] h-[140px] transition-opacity ease-out opacity-0 group-hover:opacity-100', season.style]"
      ></div>
      <div
        :class="['rounded-full h-[128px] w-[128px] absolute z-10 right-[-37px] top-[90px]', season.circles.big]"
      ></div>
      <div
        :class="['rounded-full h-[100px] w-[100px] absolute z-10 right-[57px] top-[105px]', season.circles.small]"
      ></div>
    </div>
  </div>
</template>

<style>
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
