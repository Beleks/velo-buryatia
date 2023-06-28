<script setup>
// import InputSelect from "../components/InputSelect.vue";
import ArrowSvg from "../components/svg/ArrowSvg.vue";

import _ from "lodash";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useCyclistsStore } from "@/stores/cyclistsStore";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const cyclistsStore = useCyclistsStore();
const mainStore = useMainStore();

function setId() {
  // mainStore.marathons;

  for (const key in mainStore.marathons) {
    // Берём имя участника с ВМ проверяем есть ли он в cyclistsStore
    // Если нет то добавляем его с id-ком предыушего + 1

    if (Object.hasOwnProperty.call(mainStore.marathons, key)) {
      mainStore.marathons[key].forEach((distance) => {
        distance.participants.forEach((participant) => {
          if (
            !cyclistsStore.cyclists.find(
              (cyclist) => participant.name == cyclist.name
            )
          ) {
            cyclistsStore.cyclists.push({
              id:
                cyclistsStore.cyclists[cyclistsStore.cyclists.length - 1].id +
                1,
              name: participant.name,
              birthdate: null,
              country: {
                name: null,
                title: participant.country,
              },
              city: participant.city,
              results: [],
            });
          }
        });
      });
    }
  }
}
// setId();

let cyclistId = computed(() => {
  return route.params.cyclistId;
});

let cyclist = computed(() => {
  let cyclist = _.cloneDeep(
    cyclistsStore.cyclists.find((cyclist) => cyclistId.value == cyclist.id)
  );

  for (const key in mainStore.marathons) {
    if (Object.hasOwnProperty.call(mainStore.marathons, key)) {
      let result = mainStore.marathons[key].find((element) => {
        return element.participants.find(
          (participant) => participant?.id == cyclist.id
        );
      });

      if (result) {
        let cyclistResult = result.participants.find(
          (participant) => participant?.id == cyclist.id
        );

        cyclist.results.push({
          season: key,
          distance: result.distance,
          type: result.type,
          group: cyclistResult.group,
          place: cyclistResult.place,
          number: cyclistResult.number,
          time: cyclistResult.time,
          team: cyclistResult.team,
        });
      }
    }
  }

  return cyclist;
});

function formatTime(time) {
  // hour:minute:sec 00:00:00
  return `${time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}:${
    time.sec < 10 ? `0${time.sec}` : time.sec
  }`;
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="px-24 max-w-7xl m-auto">
    <template v-if="cyclist">
      <div class="flex justify-between items-center mb-4 mx-5 select-none">
        <div
          @click="goBack()"
          class="stroke-white hover:stroke-lime-400 cursor-pointer"
        >
          <ArrowSvg />
        </div>
        <div class="text-2xl font-extrabold">
          {{ cyclist.name }}
        </div>
        <div class="opacity-0 cursor-default">
          <div>
            <ArrowSvg />
          </div>
        </div>
      </div>
      <div class="flex justify-center opacity-80 mb-6">
        <div class="mr-3">
          {{ cyclist.country.title }}
          <span v-if="cyclist.city">, {{ cyclist.city }}</span>
        </div>
        <div v-if="cyclist.birthdate">
          {{ cyclist.birthdate }}
        </div>
      </div>
      <div class="">
        <div class="border my-border-color rounded">
          <div
            class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80"
          >
            <div class="flex items-center">
              <div class="w-12 h-7 mr-4 flex justify-center items-center">
                Сезон
              </div>
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
            v-for="(result, index) in cyclist.results"
            :key="index"
          >
            <div class="flex items-center">
              <div class="w-12 text-center mr-4 text-green-500">
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
                {{ result.distance }}
              </div>

              <div class="w-32 mr-4">{{ result.type ? result.type : "-" }}</div>
              <div class="w-32 mr-4">{{ result.group }}</div>

              <div class="w-40 mr-4">-</div>
            </div>
            <div class="flex items-center">
              <div class="w-20 mr-2 opacity-70 text-end">
                <!-- {{ index !== 0 ? culcDelay(participant.time) : "" }} -->
              </div>
              <div class="w-20 text-end">
                {{ result.time ? formatTime(result.time) : "Сошёл" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>Нет такого велосипедиста</template>
  </div>
</template>

<style>
</style>