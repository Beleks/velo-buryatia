<script setup>
import { convertMsToTime } from "@/utils/utils.js";

// import _ from "lodash";
import InputSelect from "@/components/InputSelect.vue";
import ArrowSvg from "@/components/svg/ArrowSvg.vue";
import DocSvg from "@/components/svg/DocSvg.vue";

import { computed, ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

let distances = ref([]);
let typesBike = ref([]);
let groups = ref([]);

let selectedDistance = ref(null);
let selectedTypeBike = ref(null);
let selectedGroup = ref(null);
let isTotalTime = ref(false);

let event = ref({});
let results = ref([]);
let participants = ref([]);

let culcFilter = ref(false);

watch(
  () => selectedDistance.value,
  () => {
    typesBike.value = getTypesBike(participants.value, selectedDistance.value);
    if (culcFilter.value) {
      selectedTypeBike.value = typesBike.value[0];
    }
    changeStatus();
  }
);

watch(
  () => selectedTypeBike.value,
  () => {
    groups.value = getGroups(participants.value, selectedDistance.value, selectedTypeBike.value);
    if (culcFilter.value) {
      selectedGroup.value = groups.value[0];
    }
  }
);

watch(
  () => selectedGroup.value,
  () => {
    router.replace({
      name: route.name,
      query: {
        distance: selectedDistance.value?.id,
        bike: selectedTypeBike.value?.id,
        group: selectedGroup.value?.id,
      },
    });
  }
);

let eventId = computed(() => {
  return route.params.eventId;
});

let filteredParticipants = computed(() => {
  let filteredParticipants = participants.value.filter((participant) => {
    return (
      participant.distance.id === selectedDistance.value?.id &&
      participant.biketype.id === selectedTypeBike.value?.id &&
      participant.category.id === selectedGroup.value?.id
    );
  });

  return setPlaces(filteredParticipants);
});

let protocolName = computed(() => {
  return mainStore.protocols.find((protocol) => protocol.id === event.value.id).name;
});

function getDistances(participants) {
  let distances = [];

  participants.forEach((participant) => {
    if (!distances.some((distance) => participant.distance.id === distance.id)) {
      distances.push(participant.distance);
    }
  });

  return distances;
}

function getTypesBike(participants, selectedDistance) {
  let typesBike = [];

  let filteredByDistance = participants.filter((participant) => participant.distance.id === selectedDistance?.id);

  filteredByDistance.forEach((participant) => {
    if (!typesBike.some((biketype) => participant.biketype.id === biketype.id)) {
      typesBike.push(participant.biketype);
    }
  });

  return typesBike;
}

function getGroups(participants, selectedDistance, selectedTypeBike) {
  let groups = [];

  let filteredByDistanceAndBiketypes = participants.filter((participant) => {
    return participant.distance.id === selectedDistance?.id && participant.biketype.id === selectedTypeBike?.id;
  });

  filteredByDistanceAndBiketypes.forEach((participant) => {
    if (!groups.some((group) => participant.category.id === group.id)) {
      groups.push(participant.category);
    }
  });

  return groups;
}

function setPlaces(participants) {
  let placeNumber = 1;
  return participants.map((participant, index) => {
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
}

function culcDelay(resultMs) {
  if (!resultMs) {
    return;
  }

  let bestTimeMs = filteredParticipants.value[0].result;

  return `+ ${convertMsToTime(resultMs - bestTimeMs)}`;
}

function goToCyclist(participant) {
  return { name: "Cyclist", params: { cyclistId: participant.cyclist.id } }
}

function goBack() {
  router.back();
}

onMounted(() => {
  let query = route.query;

  mainStore.getEvents().then((response) => {
    // TODO: Нет метода для получения информации о соревновании (название, дата проведения) по его id. Поэтому такой костыль
    event.value = response.data.data.find((event) => event.id === eventId.value);
  });

  mainStore.getEventResults(eventId.value).then((response) => {
    participants.value = response.data.data.sort((cyclist_1, cyclist_2) => cyclist_1.result - cyclist_2.result);

    distances.value = getDistances(participants.value);
    if (!distances.value.find((distance) => distance.id === query.distance)) {
      selectedDistance.value = distances.value[0];
    } else {
      selectedDistance.value = distances.value.find((distance) => distance.id === query.distance);
    }

    typesBike.value = getTypesBike(participants.value, selectedDistance.value);
    if (!typesBike.value.find((typeBike) => typeBike.id === query.bike)) {
      selectedTypeBike.value = typesBike.value[0];
    } else {
      selectedTypeBike.value = typesBike.value.find((typeBike) => typeBike.id === query.bike);
    }

    // TODO: Поменять на category
    groups.value = getGroups(participants.value, selectedDistance.value, selectedTypeBike.value);
    if (!groups.value.find((group) => group.id === query.group)) {
      selectedGroup.value = groups.value[0];
    } else {
      selectedGroup.value = groups.value.find((group) => group.id === query.group);
    }
  });
});

// TODO:FIXME: Поменять название. Устанавливает в true, когда фильтры из пути применялись. Костыль !!
function changeStatus() {
  culcFilter.value = true;
}
</script>

<template>
  <div class="px-2 m-auto max-w-2xl">
    <template v-if="event.id">
      <div class="flex justify-between items-center mb-6 mx-2 select-none">
        <div @click="goBack()" class="stroke-neutral-400 hover:stroke-white cursor-pointer">
          <ArrowSvg/>
        </div>
        <span class="text-xl font-bold text-center mx-2">
          {{ event.name }}
        </span>
        <div class="opacity-0 cursor-default">
          <div>
            <ArrowSvg/>
          </div>
        </div>
      </div>
      <div class="mb-5 flex flex-col justify-between select-none">
        <div class="flex justify-between items-center mb-2">
          <div class="opacity-60 mr-3">Дистанция:</div>
          <InputSelect v-model="selectedDistance" :options="distances" v-slot="{ option }" :width="160">
            {{ option.name }}
          </InputSelect>
        </div>
        <div v-show="!isTotalTime" class="flex justify-between items-center mb-2">
          <div class="opacity-60 mr-3">Велосипед:</div>
          <InputSelect v-model="selectedTypeBike" :options="typesBike" v-slot="{ option }" :width="160">
            {{ option.name }}
          </InputSelect>
        </div>
        <div v-show="!isTotalTime" class="flex justify-between items-center mb-2">
          <div class="opacity-60 mr-3">Группа:</div>
          <InputSelect v-model="selectedGroup" :options="groups" :width="160" v-slot="{ option }">
            {{ option.name }}
          </InputSelect>
        </div>
        <a
          target="_blank"
          :href="`https://bm.cyclists03.ru/protocols/${protocolName}.pdf`"
          class="flex justify-center items-center h-[34px] border my-border-color rounded px-4 py-1 cursor-pointer bg-input-color transition ease-out hover:border-emerald-400"
        >
          <DocSvg class="mr-2"/>
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
            <div class="participant-max-width mr-4">
              <div>Фамилия Имя</div>
              <div class="font-normal opacity-50">№ | нп. | Команда</div>
            </div>
            <!-- <div class="w-40 mr-4">нп.</div> -->
            <!-- <div class="w-40 mr-4">Команда</div> -->
          </div>
          <div class="flex items-center">
            <div>
              <div class="w-24 text-end">Вермя</div>
              <div class="w-24 text-end opacity-50">Отставание</div>
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
                  first: participant.place === 1 && participant.place && participant.status === 2,
                  second: participant.place === 2 && participant.place && participant.status === 2,
                  third: participant.place === 3 && participant.place && participant.status === 2,
                },
                'text-lg font-bold w-7 h-7 flex justify-center items-center rounded-full mr-2',
              ]"
            >
              {{ participant.status === 2 ? participant.place : "-" }}
            </div>
            <!-- <div class="w-7 text-xs bg-my-color rounded text-center mr-2">
              {{ participant.number }}
            </div> -->
            <div class="participant-max-width mr-1 truncate">
              <router-link
                :to="goToCyclist(participant)"
                v-slot="{ href, route, navigate }"
              >
                <a
                  :href="href"
                  class="underline-offset-2 hover:text-emerald-400 group-hover:underline cursor-pointer"
                  @click="navigate"
                >
                  {{ participant.cyclist.lastname }} {{ participant.cyclist.firstname }}
                </a>
              </router-link>
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
            <div v-if="participant.status === 2" class="w-20 text-end">
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
        <ArrowSvg/>
      </div>
      <div>Нет результатов</div>
      <div class="opacity-0 cursor-default">
        <ArrowSvg/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.participant-max-width {
  // TODO: Считать и получать некоторые значения через JS
  // 16px - table padding
  // 16px - outside table padding
  // 96px - time column width
  // 36px - place column width
  width: calc(100vw - 16px - 16px - 96px - 36px - 16px);
}
</style>
