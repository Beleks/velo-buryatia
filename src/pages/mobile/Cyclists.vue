<script setup>
import ArrowSvg from "@/components/svg/ArrowSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";
import { useCyclistsStore } from "@/stores/CyclistsStore";

const router = useRouter();
const route = useRoute();
const cyclistsStore = useCyclistsStore();

let searchInput = ref("");
let activePage = ref(0);
// let qtyPages = computed(() => {
//   let pages = [];
//   for (
//     let index = 0;
//     index < Math.ceil(cyclistsStore.cyclists.length / 50);
//     index++
//   ) {
//     pages.push(index + 1);
//   }
//   return pages;
// });

let cyclists = computed(() => {
  let cyclists = cyclistsStore.cyclists
    .filter((cyclist) =>
      cyclist.name.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    .sort((first, second) => {
      if (first.name.toLowerCase() < second.name.toLowerCase()) {
        return -1;
      }
      if (first.name.toLowerCase() > second.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  // .slice(50 * activePage.value, 50 * (activePage.value + 1));
  return cyclists;
});

function goToCyclist(cyclist) {
  router.push({ name: "Cyclist_m", params: { cyclistId: cyclist.id } });
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="px-2 m-auto">
    <div class="flex justify-between items-center mb-6 mx-5 select-none">
      <div
        @click="goBack()"
        class="stroke-white hover:stroke-lime-400 cursor-pointer"
      >
        <ArrowSvg />
      </div>
      <div class="text-2xl font-extrabold">Участники</div>
      <div class="opacity-0 cursor-default">
        <ArrowSvg />
      </div>
    </div>
    <div class="mb-2 flex">
      <input
        type="text"
        class="px-4 bg-input-color h-10 outline-none border my-border-color text-sm rounded focus:ring-lime-400 focus:border-lime-400 w-full flex items-center"
        placeholder="Поиск велосипедистов"
        v-model="searchInput"
      />
      <!-- <div
        class="ml-4 px-5 text-lime-400 bg-input-color flex items-center h-10 cursor-pointer border border-lime-400 hover:bg-lime-400 rounded hover:text-black transition ease-in-out"
      >
        Поиск
      </div> -->
    </div>
    <div class="border my-border-color rounded mb-4">
      <div
        class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80"
      >
        <div class="flex">
          <div class="w-5 text-center mr-2">№</div>
          <div>Фамилия Имя</div>
        </div>
        <div></div>
      </div>
      <div
        v-for="(cyclist, index) in cyclists"
        :key="cyclist.id"
        @click="goToCyclist(cyclist)"
        class="flex items-center justify-between px-4 border-b last:border-none my-border-color py-2 hover-table-item cursor-pointer"
      >
        <div class="flex">
          <div class="w-5 text-center mr-2">{{ index + 1 }}</div>
          <div class="hover:underline cursor-pointer">
            {{ cyclist.name }}
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div class="flex justify-center">
      <!-- <div
        v-for="page in qtyPages"
        :key="page"
        class="py-2 px-4 cursor-pointer"
        :class="[page == activePage + 1 ? 'text-lime-400' : '']"
      >
        {{ page }}
      </div> -->
    </div>
  </div>
</template>