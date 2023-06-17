<script setup>
import InputSelect from "../components/InputSelect.vue";
import ArrowSvg from "../components/svg/ArrowSvg.vue";
import EyeOffSvg from "../components/svg/EyeOffSvg.vue";
import EyeSvg from "../components/svg/EyeSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

let selectedDistance = ref(null);
let selectedTypeByke = ref(null);
let selectedGroup = ref(null);

let selectedSeason = computed(() => {
  return route.params.season;
});

let seasonMarathon = computed(() => {
  return mainStore.marathons[selectedSeason.value];
});

let distances = computed(() => {
  let distances = [];

  seasonMarathon.value.forEach((element) => {
    if (!distances.includes(element.distance)) {
      distances.push(element.distance);
    }
  });

  return distances;
});

let typesBike = computed(() => {
  let typesBike = [];

  let filteredSeasonMarathon = seasonMarathon.value.filter(
    (marathon) => marathon.distance == selectedDistance.value
  );

  filteredSeasonMarathon.forEach((element) => {
    typesBike.push(element.type);
  });

  return typesBike;
});

let groups = computed(() => {
  let groups = [];

  let filteredSeasonMarathon = seasonMarathon.value.filter((marathon) => {
    return (
      marathon.distance == selectedDistance.value &&
      marathon.type == selectedTypeByke.value
    );
  });

  filteredSeasonMarathon[0]?.participants.forEach((element) => {
    if (!groups.includes(element.group)) {
      groups.push(element.group);
    }
  });

  return groups;
});

let participants = computed(() => {
  return seasonMarathon.value
    .find(
      (element) =>
        element.distance == selectedDistance.value &&
        element.type == selectedTypeByke.value
    )
    ?.participants.filter(
      (participant) => participant.group == selectedGroup.value
    );
  //
});

function selectDistance(distance) {
  selectedDistance.value = distance.value;
}

function selectTypeBike(type) {
  selectedTypeByke.value = type.value;
}

function selectGroup(group) {
  selectedGroup.value = group.value;
}

function culcDelay(sourceTime) {
  if (!sourceTime) {
    return;
  }

  let time = {};
  let bestTime = participants.value[0].time;
  let delay = {
    hour: 0,
    minute: 0,
    sec: 0,
  };

  Object.assign(time, sourceTime);

  delay.sec = () => {
    if (time.sec < bestTime.sec) {
      time.minute -= 1;
      time.sec += 60;
    }
    return time.sec - bestTime.sec < 10
      ? `0${time.sec - bestTime.sec}`
      : time.sec - bestTime.sec;
  };
  delay.minute = () => {
    if (time.minute < bestTime.minute) {
      time.hour -= 1;
      time.minute += 60;
    }
    return time.minute - bestTime.minute < 10
      ? `0${time.minute - bestTime.minute}`
      : time.minute - bestTime.minute;
  };
  delay.hour = time.hour - bestTime.hour;

  return `+ ${delay.hour}:${delay.minute()}:${delay.sec()}`;
}

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
    <template v-if="seasonMarathon">
      <div class="flex justify-between items-center mb-6 mx-6">
        <div
          :to="{ name: 'Results' }"
          @click="goBack()"
          class="stroke-white hover:stroke-lime-400 cursor-pointer"
        >
          <ArrowSvg />
        </div>
        <span class="text-2xl font-extrabold">
          Байкальский веломарафон {{ selectedSeason }}
        </span>
        <div class="opacity-0 cursor-default">Назад</div>
      </div>
      <div class="px-4 mb-5 flex justify-between">
        <div class="flex items-center">
          <div class="flex items-center">
            <div class="opacity-60 mr-3">Дистанция:</div>
            <InputSelect :options="distances" @input="selectDistance" />
          </div>
          <div class="flex items-center">
            <div class="opacity-60 mr-3">Тип велосипеда:</div>
            <InputSelect :options="typesBike" @input="selectTypeBike" />
          </div>
          <div class="flex items-center">
            <div class="opacity-60 mr-3">Группа:</div>
            <InputSelect :options="groups" @input="selectGroup" :width="160" />
          </div>
        </div>
        <div>
          <div
            class="border my-border-color rounded px-2 py-1 bg-input-color cursor-pointer hover:border-lime-400 transition ease-out"
          >
            <!-- Глаз svg -->
            <div
              class="opacity-40 flex justify-between items-center stroke-white"
            >
              <div v-if="true"><EyeOffSvg :size="20" /></div>
              <div v-else><EyeSvg :size="20" /></div>
              <div class="ml-2">Общий зачёт</div>
            </div>
          </div>
        </div>
      </div>
      <div class="border my-border-color rounded">
        <div
          class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80"
        >
          <div class="flex items-center">
            <div class="w-7 h-7 mr-4 flex justify-center items-center">#</div>
            <div class="w-7 text-center mr-2">№</div>
            <div class="w-60 mr-4">Имя Фамилия</div>
            <div class="w-40 mr-4">Город</div>
            <div class="w-40 mr-4">Команда</div>
          </div>
          <div class="flex items-center">
            <div class="w-20 mr-2 text-end"></div>
            <div class="w-20 text-end">Время</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between px-4 border-b last:border-none my-border-color py-2"
          v-for="(participant, index) in participants"
          :key="participant.place"
        >
          <div class="flex items-center">
            <div
              :class="[
                {
                  first: participant.place == 1,
                  second: participant.place == 2,
                  third: participant.place == 3,
                },
                'text-lg font-bold w-7 h-7 flex justify-center items-center rounded-full mr-4',
              ]"
            >
              {{ participant.place ? participant.place : "-" }}
            </div>
            <div class="w-7 text-xs bg-my-color rounded text-center mr-2">
              {{ participant.number }}
            </div>
            <div class="w-60 mr-4">{{ participant.name }}</div>
            <div class="w-40 mr-4">{{ participant.city }}</div>
            <div class="w-40 mr-4">-</div>
          </div>
          <div class="flex items-center">
            <div class="w-20 mr-2 opacity-70 text-end">
              {{ participant.place !== 1 ? culcDelay(participant.time) : "" }}
            </div>
            <div class="w-20 text-end">
              {{ participant.time ? formatTime(participant.time) : "Сошёл" }}
            </div>
          </div>
        </div>
      </div></template
    >
    <div v-else class="text-2xl font-extrabold text-center">
      Нет результатов
    </div>
  </div>
</template>

<style>
.bg-table-color {
  background-color: rgba(49, 53, 56, 0.8);
}
.bg-my-color {
  background-color: rgba(49, 53, 56, 1);
}
.bg-input-color {
  background-color: #313538;
}
.bg-input-color-selected {
  background-color: #242628;
}
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