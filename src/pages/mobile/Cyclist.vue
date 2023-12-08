<script setup>
import { convertMsToTime } from "@/utils/utils.js";

// import InputSelect from "../components/InputSelect.vue";
import ArrowSvg from "@/components/svg/ArrowSvg.vue";

import _ from "lodash";
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useCyclistsStore } from "@/stores/cyclistsStore";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const cyclistsStore = useCyclistsStore();
const mainStore = useMainStore();
const pageIsLoading = ref(false);
const results = ref([]);

let emptyPageText = computed(() => {
  if (!pageIsLoading.value && !results.value[0]?.cyclist_id) {
    return "Велосипедист не найден";
  } else {
    return "Загрузка...";
  }
});

let cyclistId = computed(() => {
  return route.params.cyclistId;
});

function toEvent(eventId) {
  router.push({ name: "Season_m", params: { eventId } });
}

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

function loadCyclistEvents(cyclistEvents) {
  let allEvents = [];
  mainStore.getEvents().then((response) => {
    allEvents = response.data.data;

    cyclistEvents.forEach((result) => {
      allEvents.forEach((event) => {
        if (event.id === result.event_id) {
          // Вытаскиваем год из start
          result.season = event.start.slice(0, 4);
        }
      });
    });

    results.value = cyclistEvents.sort((result_1, result_2) => {
      return result_2.season - result_1.season;
    });

    pageIsLoading.value = false;

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
  pageIsLoading.value = true;

  mainStore
    .getCyclistsResults(cyclistId.value)
    .then((response) => {
      console.log(response.data.data, "getCyclistsResults");
      // results.value = response.data.data;
      loadCyclistEvents(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      pageIsLoading.value = false;
    })
    .finally(() => {
      // pageIsLoading.value = false;
    });
});
</script>

<template>
  <div class="px-2 max-w-7xl m-auto">
    <template v-if="results[0]">
      <div class="flex justify-between items-center mb-4 mx-2 select-none">
        <div @click="goBack()" class="stroke-neutral-400 hover:stroke-white cursor-pointer">
          <ArrowSvg />
        </div>
        <div class="text-xl mx-2 text-center font-extrabold">
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
          <div class="bg-table-color justify-between px-2 py-2 flex items-center opacity-80">
            <div class="flex items-center">
              <div class="w-12 h-7 mr-2 flex justify-center items-center">Сезон</div>
              <div class="w-7 h-7 flex justify-center items-center mr-2">#</div>
              <div class="w-36">
                <div>Дистанция</div>
                <div class="font-normal text-sm opacity-50">Группа</div>
              </div>
              <!-- <div class="w-32 mr-2">Тип велосипеда</div>
              <div class="w-32 mr-2">Группа</div> -->
              <!-- <div class="w-40 mr-2">Команда</div> -->
            </div>
            <div class="flex items-center">
              <!-- <div class="w-20 mr-2 text-end"></div> -->
              <div class="w-16 text-end">Время</div>
            </div>
          </div>
          <div
            class="flex items-center justify-between px-2 border-b last:border-none my-border-color py-2 hover-table-item"
            v-for="(result, index) in results"
            :key="index"
          >
            <div class="flex items-center">
              <div
                class="w-12 text-center cursor-pointer underline underline-offset-2 mr-2 text-emerald-500"
                @click="toEvent(result.event_id)"
              >
                {{ result.season }}
              </div>
              <div class="w-7 h-7 flex justify-center items-center mr-2">
                <span
                  v-if="result.place"
                  :class="[
                    {
                      first: result.place == 1 && result.place && result.status == 2,
                      second: result.place == 2 && result.place && result.status == 2,
                      third: result.place == 3 && result.place && result.status == 2,
                    },
                    'w-7 h-7 text-center text-lg font-bold flex justify-center items-center rounded-full',
                  ]"
                >
                  {{ result.status == 2 ? result.place : "-" }}
                </span>
                <div v-else class="animate-pulse">
                  <div class="w-7 h-7 bg-neutral-800 rounded-full"></div>
                </div>
              </div>
              <div class="rounded w-36 mr-2 truncate">
                <div>
                  {{ result.dist_name }}
                  <span>{{ result.bike_name ? result.bike_name : "" }}</span>
                </div>
                <div class="text-sm font-normal opacity-70">
                  {{ result.cat_name }}
                </div>
              </div>

              <!-- <div class="w-32 mr-4">{{ result.type ? result.type : "-" }}</div> -->
              <!-- <div class="w-32 mr-4">{{ result.group }}</div> -->

              <!-- <div class="w-40 mr-4">-</div> -->
            </div>
            <div class="flex items-center">
              <!-- <div class="w-20 mr-2 opacity-70 text-end"> -->
              <!-- {{ index !== 0 ? culcDelay(participant.time) : "" }} -->
              <!-- </div> -->

              <div v-if="result.status == 2" class="w-16 text-end">
                {{ convertMsToTime(result.result) }}
              </div>
              <div class="w-16 text-end" v-else>
                {{ result.male ? "Сошёл" : "Сошла" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else
      ><div class="text-center">{{ emptyPageText }}</div></template
    >
  </div>
</template>

<style></style>
