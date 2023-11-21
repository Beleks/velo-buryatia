<script setup>
import VeloDarkSvg from "@/components/svg/VeloDarkSvg.vue";
import VeloColorSvg from "@/components/svg/VeloColorSvg.vue";
import PeoplsSvg from "@/components/svg/PeoplsSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();
let seasons = ref([]);

let nothingIsSelected = computed(() => {
  return route.name == "Results";
});

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
      let bgStyle = `bg-gradient-${index}`;
      season.style = bgStyle;
      season.circles = getCirclesColor(index);
      return season;
    });
    console.log(seasons.value, "response");
  });
});
</script>
<template>
  <div class="flex max-w-[730px] mx-auto flex-wrap justify-between font-normal">
    <template v-if="seasons.length">
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
          <div class="flex items-center fill-white">
            <PeoplsSvg :size="26" class="mr-2" />
            {{ season.cyclists }}
          </div>
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
      <div class="w-[348px] h-[140px] rounded-lg border border-dashed flex justify-center items-center px-14">
        <div class="text-center">Скоро тут появятся результаты за другие года</div>
      </div>
    </template>
    <template v-else>
      <div class="flex w-full justify-center">Загрузка результатов...</div>
    </template>
  </div>
</template>
