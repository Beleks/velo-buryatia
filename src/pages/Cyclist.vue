<script setup>
import { convertMsToTime } from "@/utils/utils.js";

// import InputSelect from "../components/InputSelect.vue";
import ArrowSvg from "../components/svg/ArrowSvg.vue";

import _ from "lodash";
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useCyclistsStore } from "@/stores/cyclistsStore";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const cyclistsStore = useCyclistsStore();
const mainStore = useMainStore();
const results = ref([]);

let emptyText = computed(() => {
  // TODO: "Загрузка..." "Нет такого велосипедиста" "Велосипедист не найден"
});
let cyclistId = computed(() => {
  return route.params.cyclistId;
});

// let cyclist = computed(() => {
//   let cyclist = _.cloneDeep(
//     cyclistsStore.cyclists.find((cyclist) => cyclistId.value == cyclist.id)
//   );

//   for (const key in mainStore.marathons) {
//     if (Object.hasOwnProperty.call(mainStore.marathons, key)) {
//       let result = mainStore.marathons[key].find((element) => {
//         return element.participants.find(
//           (participant) => participant?.id == cyclist.id
//         );
//       });

//       if (result) {
//         let cyclistResult = result.participants.find(
//           (participant) => participant?.id == cyclist.id
//         );

//         cyclist.results.push({
//           season: key,
//           distance: result.distance,
//           type: result.type,
//           group: cyclistResult.group,
//           place: cyclistResult.place,
//           number: cyclistResult.number,
//           time: cyclistResult.time,
//           team: cyclistResult.team,
//         });
//       }
//     }
//   }

//   return cyclist;
// });

function loadCyclistEvents() {
  let allEvents = [];
  mainStore.getEvents().then((response) => {
    allEvents = response.data.data;

    results.value.forEach((result) => {
      // TODO: Анимация загрузки
      console.log(allEvents, "allEvents");
      let foundEvent = allEvents.find((event) => result.event_id === event.id);
      console.log(foundEvent.start.slice(0, 4), "foundEvent");
      result.season = foundEvent.start.slice(0, 4);
      // TODO: Вытащить год из start

      mainStore.getEventResults(result.event_id).then((response) => {
        console.log(result.event_id, "result.event_id");
        console.log(response.data.data);
      });
    });
  });
}

function goBack() {
  router.back();
}

onMounted(() => {
  mainStore
    .getCyclistsResults(cyclistId.value)
    .then((response) => {
      console.log(response.data.data, "getCyclistsResults");
      results.value = response.data.data;
      loadCyclistEvents();
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="px-24 max-w-7xl m-auto">
    <template v-if="results[0]">
      <div class="flex justify-between items-center mb-4 mx-5 select-none">
        <div @click="goBack()" class="stroke-neutral-400 hover:stroke-white cursor-pointer">
          <ArrowSvg />
        </div>
        <div class="text-2xl font-extrabold">
          {{ results[0].lastname }} {{ results[0].firstname }} {{ results[0].middlename }}
        </div>
        <div class="opacity-0 cursor-default">
          <div>
            <ArrowSvg />
          </div>
        </div>
      </div>
      <div class="flex justify-center opacity-80 mb-6">
        <div>
          {{ results[0].count_name }}
          <span v-if="results[0].city_name">, {{ results[0].city_name }}</span>
        </div>
        <div class="ml-3" v-if="results[0].year">{{ results[0].year }} г.</div>
      </div>
      <div class="">
        <div class="border my-border-color rounded">
          <div class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80">
            <div class="flex items-center">
              <div class="w-12 h-7 mr-4 flex justify-center items-center">Сезон</div>
              <div class="w-12 mr-4">Место</div>
              <div class="w-20 text-center mr-4">Дистанция</div>
              <div class="w-32 mr-4">Тип велосипеда</div>
              <div class="w-32 mr-4">Группа</div>
              <div class="w-40 mr-4">Команда</div>
            </div>
            <div class="flex items-center">
              <div class="w-20 mr-2 text-end"></div>
              <div class="w-20 text-end">Время</div>
            </div>
          </div>
          <div
            class="flex items-center justify-between px-4 border-b last:border-none my-border-color py-2 hover-table-item"
            v-for="(result, index) in results"
            :key="index"
          >
            <div class="flex items-center">
              <div class="w-12 text-center mr-4 text-emerald-500">
                {{ result.season }}
              </div>
              <div class="w-12 flex justify-center mr-4">
                <span
                  :class="[
                    {
                      first: result.place == 1 && result.place,
                      second: result.place == 2 && result.place,
                      third: result.place == 3 && result.place,
                    },
                    'w-7 h-7 text-center text-lg font-bold flex justify-center items-center rounded-full',
                  ]"
                >
                  {{ result.place ? result.place : "-" }}
                </span>
              </div>
              <div class="w-20 rounded mr-4">
                {{ result.dist_name }}
              </div>

              <div class="w-32 mr-4">{{ result.bike_name ? result.bike_name : "-" }}</div>
              <div class="w-32 mr-4">{{ result.cat_name }}</div>

              <div class="w-40 mr-4">{{ result.team_name ? result.team_name : "-" }}</div>
            </div>
            <div class="flex items-center">
              <div class="w-20 mr-2 opacity-70 text-end">
                <!-- {{ index !== 0 ? culcDelay(participant.time) : "" }} -->
              </div>
              <div class="w-20 text-end">
                {{ result.status == 2 ? convertMsToTime(result.result) : "Сошёл" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else><div class="text-center">Нет такого велосипедиста</div></template>
  </div>
</template>

<style></style>
