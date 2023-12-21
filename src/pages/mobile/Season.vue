<script setup>
import { convertMsToTime } from "@/utils/utils.js";

import _ from "lodash";
import InputSelect from "@/components/InputSelect.vue";
import ArrowSvg from "@/components/svg/ArrowSvg.vue";
import DocSvg from "@/components/svg/DocSvg.vue";

import { computed, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";
import { useCyclistsStore } from "@/stores/CyclistsStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();
const cyclistsStore = useCyclistsStore();

let distances = ref([]);

let selectedDistance = ref(null);
let selectedTypeByke = ref(null);
let selectedGroup = ref(null);
let isTotalTime = ref(false);

let event = ref({});
let results = ref([]);
let participants = ref([]);

let protocolName = computed(() => {
  return mainStore.protocols.find((protocol) => protocol.id === event.value.id).name;
});
let eventId = computed(() => {
  return route.params.eventId;
});

let filteredParticipants = computed(() => {
  let filteredParticipants = participants.value.filter((participant) => {
    return (
      participant.distance.name == selectedDistance.value &&
      participant.biketype.name == selectedTypeByke.value &&
      participant.category.name == selectedGroup.value
    );
  });

  return setPlaces(filteredParticipants);
});

let typesBike = computed(() => {
  let typesBike = [];

  let filteredByDistance = participants.value.filter(
    (participant) => participant.distance.name === selectedDistance.value
  );

  filteredByDistance.forEach((participant) => {
    if (!typesBike.includes(participant.biketype.name)) {
      typesBike.push(participant.biketype.name);
    }
  });

  return typesBike;
});

// TODO: Поменять на category
let groups = computed(() => {
  let groups = [];

  let filteredByDistanceAndBiketypes = participants.value.filter((participant) => {
    return participant.distance.name === selectedDistance.value && participant.biketype.name === selectedTypeByke.value;
  });

  filteredByDistanceAndBiketypes.forEach((participant) => {
    if (!groups.includes(participant.category.name)) {
      groups.push(participant.category.name);
    }
  });

  return groups;
});

function getDistances(participants) {
  let distances = [];

  participants.forEach((participant) => {
    if (!distances.includes(participant.distance.name)) {
      distances.push(participant.distance.name);
    }
  });

  return distances;
}

function selectDistance(distance) {
  selectedDistance.value = distance.value;
}

function selectTypeBike(type) {
  selectedTypeByke.value = type.value;
}

function selectGroup(group) {
  selectedGroup.value = group.value;
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

function culcDelay(resultMs) {
  if (!resultMs) {
    return;
  }

  let bestTimeMs = filteredParticipants.value[0].result;

  return `+ ${convertMsToTime(resultMs - bestTimeMs)}`;
}

function goToCyclist(participant) {
  router.push({ name: "Cyclist_m", params: { cyclistId: participant.cyclist.id } });
}

function goBack() {
  router.back();
}

onMounted(() => {
  mainStore.getEvents().then((response) => {
    // TODO: Нет метода для получения информации о соревновании (название, дата проведения) по его id. Поэтому такой костыль
    event.value = response.data.data.find((event) => event.id == eventId.value);
  });

  mainStore.getEventResults(eventId.value).then((response) => {
    participants.value = response.data.data.sort((cyclist_1, cyclist_2) => cyclist_1.result - cyclist_2.result);
    distances.value = getDistances(participants.value);
  });
});
</script>

<template>
  <div class="px-2 m-auto max-w-2xl">
    <template v-if="event.id">
      <div class="flex justify-between items-center mb-6 mx-2 select-none">
        <div @click="goBack()" class="stroke-neutral-400 hover:stroke-white cursor-pointer">
          <ArrowSvg />
        </div>
        <span class="text-xl font-bold text-center mx-2">
          {{ event.name }}
        </span>
        <div class="opacity-0 cursor-default">
          <div>
            <ArrowSvg />
          </div>
        </div>
      </div>
      <div class="mb-5 flex flex-col justify-between select-none">
        <div class="flex justify-between items-center mb-2">
          <div class="opacity-60 mr-3">Дистанция:</div>
          <InputSelect :options="distances" @input="selectDistance" :width="160" />
        </div>
        <div v-show="!isTotalTime" class="flex justify-between items-center mb-2">
          <div class="opacity-60 mr-3">Велосипед:</div>
          <InputSelect :options="typesBike" @input="selectTypeBike" :width="160" />
        </div>
        <div v-show="!isTotalTime" class="flex justify-between items-center mb-2">
          <div class="opacity-60 mr-3">Группа:</div>
          <InputSelect :options="groups" @input="selectGroup" :width="160" />
        </div>
        <a
          target="_blank"
          :href="`https://bm.cyclists03.ru/protocols/${protocolName}.pdf`"
          class="flex justify-center items-center h-[34px] border my-border-color rounded px-4 py-1 cursor-pointer bg-input-color transition ease-out hover:border-emerald-400"
        >
          <DocSvg class="mr-2" />
          Протокол
        </a>
        <!-- <div
          class="border my-border-color rounded px-2 py-1 bg-input-color cursor-pointer hover:border-lime-400 transition ease-out"
          @click="switchTotalTime"
        >
          <div
            class="flex justify-center items-center"
            :class="[!isTotalTime ? 'stroke-white' : 'stroke-lime-400 text-lime-400']"
          >
            <div v-if="!isTotalTime"><EyeOffSvg :size="20" /></div>
            <div v-else><EyeSvg :size="20" /></div>
            <div class="ml-2">Общий зачёт</div>
          </div>
        </div> -->
      </div>
      <div class="border my-border-color rounded mb-8">
        <div class="bg-table-color justify-between px-2 py-2 flex font-normal items-center opacity-80">
          <!-- items-center -->
          <div class="flex">
            <div class="w-7 h-7 flex justify-center items-center mr-2">#</div>
            <!-- <div class="w-7 text-center mr-2">№</div> -->
            <div class="w-48 mr-4">
              <div>Фамилия Имя</div>
              <div class="font-normal opacity-50">№ | нп. | Команда</div>
            </div>
            <!-- <div class="w-40 mr-4">нп.</div> -->
            <!-- <div class="w-40 mr-4">Команда</div> -->
          </div>
          <div class="flex items-center">
            <div>
              <div class="w-22 text-end">Вермя</div>
              <div class="w-22 text-end opacity-50">Отставание</div>
            </div>
            <!-- <div class="w-20 mr-2 text-end"></div>
            <div class="w-20 text-end">Время</div> -->
          </div>
        </div>
        <div
          class="flex items-center justify-between px-2 border-b last:border-none my-border-color py-2 hover-table-item"
          v-for="(participant, index) in filteredParticipants"
          :key="index"
        >
          <div class="flex items-center">
            <div
              :class="[
                {
                  first: participant.place == 1 && participant.place && participant.status == 2,
                  second: participant.place == 2 && participant.place && participant.status == 2,
                  third: participant.place == 3 && participant.place && participant.status == 2,
                },
                'text-lg font-bold w-7 h-7 flex justify-center items-center rounded-full mr-4',
              ]"
            >
              {{ participant.status == 2 ? participant.place : "-" }}
            </div>
            <!-- <div class="w-7 text-xs bg-my-color rounded text-center mr-2">
              {{ participant.number }}
            </div> -->
            <div class="w-48 mr-1 truncate">
              <a class="hover:underline cursor-pointer" @click="goToCyclist(participant)">
                {{ participant.cyclist.lastname }} {{ participant.cyclist.firstname }}
              </a>
              <div class="flex items-center text-sm font-normal">
                <div
                  :class="[participant.cyclist.male ? 'bg-my-color' : 'bg-fuchsia-200 text-black']"
                  class="min-w-7 text-xs rounded text-center mr-2 px-1"
                >
                  {{ participant.bip }}
                </div>
                |
                <div class="mx-2 opacity-70">
                  {{ participant.city.name ? participant.city.name : "-" }}
                </div>
                |
                <div class="ml-2 truncate opacity-70">
                  {{ participant.team.name ? participant.team.name : "-" }}
                </div>
              </div>
            </div>
            <!-- <div class="w-40 mr-4">{{ participant.city }}</div>
            <div class="w-40 mr-4">-</div> -->
          </div>
          <div class="flex flex-col items-center">
            <div v-if="participant.status == 2" class="w-20 text-end">
              {{ convertMsToTime(participant.result) }}
            </div>
            <div class="w-20 text-end" v-else>
              {{ participant.cyclist.male ? "Сошёл" : "Сошла" }}
            </div>
            <div class="w-20 font-normal opacity-70 text-end">
              {{ index !== 0 ? culcDelay(participant.result) : "" }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="flex justify-between items-center mb-6 mx-5 select-none">
      <div @click="goBack()" class="stroke-white hover:stroke-lime-400 cursor-pointer">
        <ArrowSvg />
      </div>
      <div>Нет результатов</div>
      <div class="opacity-0 cursor-default">
        <ArrowSvg />
      </div>
    </div>
  </div>
</template>

<style></style>
