<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";
import { useCyclistsStore } from "@/stores/CyclistsStore";

const router = useRouter();
const route = useRoute();
const cyclistsStore = useCyclistsStore();
const mainStore = useMainStore();

const cyclists = ref([]);
const visibleCyclists = computed(() => {
  // Сортировка по количеству участий от большего к меньшему
  // TODO: сделать дебаунс
  // let cyclists = cyclists.value;

  let searchValuesArr = [];
  let searchResult = cyclists.value;
  if (searchInput.value.length > 0) {
    // .split(" ")
    searchValuesArr = searchInput.value.trim().toLowerCase();
  }

  function searchByName(cyclist) {
    let cyclistName = [
      cyclist.lastname?.toLowerCase(),
      cyclist.firstname?.toLowerCase(),
      cyclist.middlename?.toLowerCase(),
    ].join(" ");

    // if (searchValuesArr.length == 1) {

    // }
    // if (searchValuesArr.searchParamsArr.length > 1) {
    //   searchValuesArr[0];
    // }
    return cyclistName.includes(searchValuesArr);
  }

  if (searchValuesArr.length > 0) {
    searchResult = cyclists.value.filter(searchByName);
  }

  return searchResult.sort((cyclist_1, cyclist_2) => cyclist_2.cnt - cyclist_1.cnt);
});
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

// let cyclists = computed(() => {
// let cyclists = cyclistsStore.cyclists
//   .filter((cyclist) => cyclist.name.toLowerCase().includes(searchInput.value.toLowerCase()))
//   .sort((first, second) => {
//     if (first.name.toLowerCase() < second.name.toLowerCase()) {
//       return -1;
//     }
//     if (first.name.toLowerCase() > second.name.toLowerCase()) {
//       return 1;
//     }
//     return 0;
//   });
// .slice(50 * activePage.value, 50 * (activePage.value + 1));
// return [];
// });

function goToCyclist(cyclist) {
  router.push({ name: "Cyclist_m", params: { cyclistId: cyclist.id } });
}

function goBack() {
  router.back();
}
onMounted(() => {
  mainStore.getCyclists().then((response) => {
    cyclists.value = response.data.data;
  });
});
</script>

<template>
  <div class="px-2 m-auto max-w-2xl">
    <div class="flex justify-center items-center mb-6 mx-5 select-none">
      <div><span class="opacity-80">Участников за всё время:</span> {{ cyclists.length }}</div>
    </div>
    <div class="mb-2 flex">
      <input
        type="text"
        class="px-4 bg-[#262628] placeholder:text-neutral-400 h-10 outline-hidden border my-border-color text-sm rounded-sm focus:border-emerald-400 w-full flex items-center"
        placeholder="Введите ФИО участника"
        v-model="searchInput"
      />
      <!-- <div
        class="ml-4 px-5 text-lime-400 bg-input-color flex items-center h-10 cursor-pointer border border-lime-400 hover:bg-lime-400 rounded-sm hover:text-black transition ease-in-out"
      >
        Поиск
      </div> -->
    </div>
    <div v-if="cyclists.length" class="border my-border-color rounded-sm mb-4">
      <div class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80">
        <div class="flex">
          <!-- <div class="w-7 text-center mr-2">№</div> -->
          <div>Фамилия Имя</div>
        </div>
        <div>
          <div class="text-right w-[60px]">Участий</div>
        </div>
      </div>
      <router-link
        v-for="(cyclist, index) in visibleCyclists"
        :key="cyclist.id"
        :to="{ name: 'Cyclist', params: { cyclistId: cyclist.id } }"
        class="flex items-center justify-between px-4 border-b last:border-none my-border-color py-2 hover-table-item cursor-pointer"
        v-slot="{ href, route, navigate }"
      >
        <div :href="href" @click="navigate" class="flex w-full justify-between">
          <div class="flex">
            <!-- <div class="w-7 text-center mr-2">{{ index + 1 }}</div> -->
            <div class="hover:underline cursor-pointer">{{ cyclist.lastname }} {{ cyclist.firstname }}</div>
          </div>
          <div>
            <div class="text-right w-[60px]">{{ cyclist.cnt }}</div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else class="text-center p-4">Загрузка...</div>
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

<style></style>
