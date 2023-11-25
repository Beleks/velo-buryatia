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

function setPlaces(participants) {
  let placeNumber = 1;
  let newArr = participants.map((participant, index) => {
    let handledParticipant = { ...participant };
    if (index === 0) {
      handledParticipant.place = placeNumber;
    } else {
      // TODO: Обработать случай если результат предыдущего больше
      if (participants[index - 1].result < participant.result) {
        placeNumber++;
        handledParticipant.place = placeNumber;
      } else if (participants[index - 1].result === participant.result) {
        handledParticipant.place = placeNumber;
      }
    }
    return handledParticipant;
  });

  return newArr;
}

function loadCyclistEvents() {
  let allEvents = [];
  mainStore.getEvents().then((response) => {
    allEvents = response.data.data;

    results.value.forEach((result) => {
      allEvents.forEach((event) => {
        if (event.id === result.event_id) {
          // Вытаскиваем год из start
          result.season = event.start.slice(0, 4);
        }
      });
    });

    results.value = results.value.sort((result_1, result_2) => {
      return result_2.season - result_1.season;
    });

    results.value.forEach((result) => {
      // TODO: Анимация загрузки

      mainStore.getEventResults(result.event_id).then((response) => {
        let relevantParticipants = response.data.data.filter(
          (participant) =>
            participant.category.id === result.category_id &&
            participant.distance.id === result.distance_id &&
            participant.biketype.id === result.biketype_id
        );
        result.place = setPlaces(relevantParticipants).find(
          (participant) => participant.cyclist.id === result.cyclist_id
        ).place;
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
                  {{ result.status == 2 ? result.place : "-" }}
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
