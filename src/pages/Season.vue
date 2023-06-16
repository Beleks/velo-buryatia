<script setup>
import InputSelect from "../components/InputSelect.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";

// const router = useRouter();
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
    distances.push(element.distance);
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
</script>

<template>
  <div class="px-24 max-w-7xl m-auto">
    <div class="flex justify-between items-center mb-6 mx-6">
      <router-link :to="{ name: 'Results' }"> Назад </router-link>
      <span class="text-2xl font-extrabold">
        Байкальский веломарафон {{ selectedSeason }}
      </span>
      <div class="opacity-0 cursor-default" :to="{ name: 'Results' }">
        Назад
      </div>
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
          <span class="opacity-40">Общий зачёт</span>
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
              { first: index == 0, second: index == 1, third: index == 2 },
              'text-lg font-bold w-7 h-7 flex justify-center items-center rounded-full mr-4',
            ]"
          >
            {{ index + 1 }}
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
            {{ participant.delay }}
          </div>
          <div class="w-20 text-end">
            {{ participant.time ? participant.time : "Сошёл" }}
          </div>
        </div>
      </div>
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