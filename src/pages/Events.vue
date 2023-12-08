<script setup>
import AlertSvg from "@/components/svg/AlertSvg.vue";
import PeoplsSvg from "@/components/svg/PeoplsSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();
let alertIsVisible = ref(true);
let seasons = ref([]);

function chooseEvent(event) {
  if (!event.disable) {
    router.push({ name: "Season", params: { eventId: event.id } });
  }
}

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

function acceptAlert() {
  localStorage.setItem("alertMessageIsAccept", 1);
  alertIsVisible.value = false;
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

if (localStorage.getItem("alertMessageIsAccept") == null) {
  localStorage.setItem("alertMessageIsAccept", 0);
} else if (localStorage.getItem("alertMessageIsAccept") == 1) {
  alertIsVisible.value = false;
}
</script>
<template>
  <div
    v-if="alertIsVisible"
    class="max-w-[730px] mx-auto border mb-8 border-yellow-400 rounded-lg flex justify-between px-4 py-5 items-center"
  >
    <div class="flex items-center">
      <div class="stroke-yellow-400 mr-4">
        <AlertSvg :size="32" />
      </div>
      <div class="text-yellow-400">
        <div class="text-base text-yellow-400 mb-1">Эти результаты являются обработкой бумажных протоколов</div>
        <div class="text-sm font-normal">Сообщите нам, если найдёте ошибку</div>
      </div>
    </div>
    <div
      class="bg-[#453C1A] px-7 py-2 rounded-lg text-yellow-400 cursor-pointer hover:bg-[#5C4E19] ease-in-out transition"
      @click="acceptAlert"
    >
      Хорошо
    </div>
  </div>

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
