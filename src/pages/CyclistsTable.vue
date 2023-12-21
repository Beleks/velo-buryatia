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
  router.push({ name: "Cyclist", params: { cyclistId: cyclist.id } });
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
  <div class="px-24 max-w-7xl m-auto">
    <div class="ml-4 mb-2 flex items-center">
      <div class="whitespace-nowrap mr-4">
        <!-- TODO: Показать элемент загрузки-->
        <span class="opacity-80">Участников за всё время: </span>{{ cyclists.length }}
      </div>
      <input
        type="text"
        class="px-4 bg-[#262628] h-10 outline-none border my-border-color placeholder:text-neutral-400 rounded focus:border-emerald-400 w-full flex items-center"
        placeholder="Введите ФИО участника"
        v-model="searchInput"
      />
    </div>
    <div class="border my-border-color rounded mb-4">
      <!-- bg-table-color -->
      <div class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80">
        <div class="flex">
          <!-- <div class="w-7 text-center mr-2">№</div> -->
          <div class="w-[400px]">Фамилия Имя Отчество</div>
          <div class="ml-2 w-[115px]">Кол-во участий</div>
        </div>
        <div></div>
      </div>
      <!-- border-b last:border-none -->
      <router-link
        v-if="cyclists.length"
        v-for="(cyclist, index) in visibleCyclists"
        :key="cyclist.id"
        :to="{ name: 'Cyclist_m', params: { cyclistId: cyclist.id } }"
        class="group flex items-center justify-between px-4 border-t my-border-color py-2 hover-table-item cursor-pointer"
        v-slot="{ href, route, navigate }"
      >
        <a :href="href" @click="navigate" class="flex">
          <div class="group-hover:underline cursor-pointer w-[400px]">
            {{ cyclist.lastname }} {{ cyclist.firstname }} {{ cyclist.middlename }}
          </div>
          <div class="ml-2 w-[115px] text-center">{{ cyclist.cnt }}</div>
        </a>
      </router-link>
      <div v-else class="text-center p-4">Загрузка...</div>
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

<style></style>
