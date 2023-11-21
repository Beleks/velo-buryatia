<script setup>
import { convertMsToTime } from "@/utils/utils.js";

import _ from "lodash";
import InputSelect from "../components/InputSelect.vue";
import ArrowSvg from "../components/svg/ArrowSvg.vue";
import EyeOffSvg from "../components/svg/EyeOffSvg.vue";
import EyeSvg from "../components/svg/EyeSvg.vue";

import { computed, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";
import { useCyclistsStore } from "@/stores/CyclistsStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();
const cyclistsStore = useCyclistsStore();

let selectedDistance = ref(null);
let selectedTypeByke = ref(null);
let selectedGroup = ref(null);
let isTotalTime = ref(false);

let event = ref({});
let results = ref([]);
let participants = ref([]);

let eventId = computed(() => {
  return route.params.eventId;
});

let filteredParticipants = computed(() => {
  return setPlaces(participants.value);
});

// let distances = computed(() => {
//   let distances = [];

//   seasonMarathon.value.forEach((element) => {
//     if (!distances.includes(element.distance)) {
//       distances.push(element.distance);
//     }
//   });

//   return distances;
// });

// let typesBike = computed(() => {
//   let typesBike = [];

//   let filteredSeasonMarathon = seasonMarathon.value.filter((marathon) => marathon.distance == selectedDistance.value);

//   filteredSeasonMarathon.forEach((element) => {
//     typesBike.push(element.type);
//   });

//   return typesBike;
// });

// let groups = computed(() => {
//   let groups = [];

//   let filteredSeasonMarathon = seasonMarathon.value.filter((marathon) => {
//     return marathon.distance == selectedDistance.value && marathon.type == selectedTypeByke.value;
//   });

//   filteredSeasonMarathon[0]?.participants.forEach((element) => {
//     if (!groups.includes(element.group)) {
//       groups.push(element.group);
//     }
//   });

//   return groups;
// });

// let participants = computed(() => {
//   if (isTotalTime.value) {
//     let participants = [];
//     let neededMarathons = seasonMarathon.value.filter((element) => element.distance == selectedDistance.value);

//     neededMarathons.forEach((element) => {
//       participants.push(_.cloneDeep(element.participants));
//     });

//     participants = participants.flat();

//     let descendedParticipants = participants.filter((element) => !element.place);

//     participants = participants
//       .filter((element) => element.place)
//       .sort((firstEl, secondEl) => {
//         if (firstEl.time.hour - secondEl.time.hour < 0) {
//           return -1;
//         } else if (firstEl.time.hour - secondEl.time.hour == 0) {
//           if (firstEl.time.minute - secondEl.time.minute < 0) {
//             return -1;
//           } else if (firstEl.time.minute - secondEl.time.minute == 0) {
//             return firstEl.time.sec - secondEl.time.sec;
//           } else {
//             return 1;
//           }
//         } else {
//           return 1;
//         }
//       });

//     for (let index = 0; index < participants.length; index++) {
//       if (index !== 0) {
//         if (
//           participants[index].time.hour == participants[index - 1].time.hour &&
//           participants[index].time.minute == participants[index - 1].time.minute &&
//           participants[index].time.sec == participants[index - 1].time.sec
//         ) {
//           participants[index].place = participants[index - 1].place;
//         } else {
//           participants[index].place = participants[index - 1].place + 1;
//         }
//       }
//     }

//     participants = participants.concat(descendedParticipants);

//     if (participants) {
//       for (let index = 0; index < participants.length; index++) {
//         participants[index].male = cyclistsStore.cyclists.find((cyclist) => cyclist.id === participants[index].id).male;
//       }
//     }

//     return participants;
//   } else {
//     let participants = _.cloneDeep(
//       seasonMarathon.value.find(
//         (element) => element.distance == selectedDistance.value && element.type == selectedTypeByke.value
//       )?.participants
//     );

//     if (participants) {
//       for (let index = 0; index < participants.length; index++) {
//         participants[index].male = cyclistsStore.cyclists.find((cyclist) => cyclist.id === participants[index].id).male;
//       }
//     }

//     return participants?.filter((participant) => participant.group == selectedGroup.value);
//   }
// });

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

  let bestTimeMs = participants.value[0].result;

  return `+ ${convertMsToTime(resultMs - bestTimeMs)}`;
}

function goToCyclist(cyclist) {
  // router.push({ name: "Cyclist", params: { cyclistId: cyclist.id } });
}

function goBack() {
  router.back();
}

onMounted(() => {
  mainStore.getEvents().then((response) => {
    // TODO: Нет метода для получения информации о соревновании (название, дата проведения) по его id. Поэтому такой костыль
    event.value = response.data.data.find((event) => event.id == eventId.value);
    console.log(response.data.data.find((event) => event.id == eventId.value));
  });

  mainStore.getEventResults(eventId.value).then((response) => {
    console.log(response.data.data, "response.data.data");
    participants.value = response.data.data.sort((cyclist_1, cyclist_2) => cyclist_1.result - cyclist_2.result);
  });
});
</script>

<template>
  <div class="px-24 max-w-7xl m-auto">
    <template v-if="event.id">
      <div class="flex justify-between items-center mb-6 mx-5 select-none">
        <div @click="goBack()" class="stroke-white hover:stroke-lime-400 cursor-pointer">
          <ArrowSvg />
        </div>
        <span class="text-2xl font-extrabold"> {{ event.name }} </span>
        <div class="opacity-0 cursor-default">
          <ArrowSvg />
        </div>
      </div>
      <div class="px-4 mb-5 flex justify-between select-none">
        <!-- <div class="flex items-center">
          <div class="flex items-center mr-6">
            <div class="opacity-60 mr-3">Дистанция:</div>
            <InputSelect :options="distances" @input="selectDistance" />
          </div>
          <div v-show="!isTotalTime" class="flex items-center mr-6">
            <div class="opacity-60 mr-3">Велосипед:</div>
            <InputSelect :options="typesBike" @input="selectTypeBike" />
          </div>
          <div v-show="!isTotalTime" class="flex items-center mr-6">
            <div class="opacity-60 mr-3">Группа:</div>
            <InputSelect :options="groups" @input="selectGroup" :width="160" />
          </div>
        </div> -->
        <div>
          <!-- <div
            class="border my-border-color rounded px-2 py-1 bg-input-color cursor-pointer hover:border-lime-400 transition ease-out"
            @click="switchTotalTime"
          >
            <div
              class="flex justify-between items-center"
              :class="[!isTotalTime ? 'stroke-white' : 'stroke-lime-400 text-lime-400']"
            >
              <div v-if="!isTotalTime">
                <EyeOffSvg :size="20" />
              </div>
              <div v-else>
                <EyeSvg :size="20" />
              </div>
              <div class="ml-2">Общий зачёт</div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="border my-border-color rounded mb-8">
        <div class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80">
          <div class="flex items-center">
            <div class="w-7 h-7 mr-4 flex justify-center items-center">#</div>
            <div class="w-7 text-center mr-2">№</div>
            <div class="w-60 mr-4">Фамилия Имя</div>
            <div class="w-40 mr-4">нп.</div>
            <div class="w-40 mr-4">Команда</div>
          </div>
          <div class="flex items-center">
            <div class="w-20 mr-2 text-end"></div>
            <div class="w-20 text-end">Время</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between px-4 border-b last:border-none my-border-color py-2 hover-table-item"
          v-for="(participant, index) in filteredParticipants"
          :key="index"
        >
          <div class="flex items-center">
            <div
              :class="[
                {
                  first: participant.place == 1 && participant.place,
                  second: participant.place == 2 && participant.place,
                  third: participant.place == 3 && participant.place,
                },
                'text-lg font-bold w-7 h-7 flex justify-center items-center rounded-full mr-4',
              ]"
            >
              {{ participant.place ? participant.place : "-" }}
            </div>
            <div
              :class="[participant.cyclist.male ? 'bg-my-color' : 'bg-fuchsia-200 text-black']"
              class="w-7 text-xs rounded text-center mr-2"
            >
              {{ participant.bip }}
            </div>
            <div class="w-60 mr-4">
              <a class="hover:underline cursor-pointer" @click="goToCyclist(participant)">
                {{ participant.cyclist.lastname }} {{ participant.cyclist.firstname }}
              </a>
            </div>
            <div class="w-40 mr-4">
              {{ participant.city.name ? participant.city.name : "-" }}
            </div>
            <div class="w-40 mr-4">
              {{ participant.team.name ? participant.team.name : "-" }}
            </div>
          </div>
          <div class="flex items-center">
            <div v-if="participant.status == 2" class="w-20 mr-2 opacity-70 text-end">
              {{ index !== 0 ? culcDelay(participant.result) : "" }}
            </div>
            <div v-if="participant.status == 2" class="w-20 text-end">
              {{ convertMsToTime(participant.result) }}
              <!-- {{ formatTime(participant.result) }} -->
            </div>
            <div v-else class="w-20 text-end">
              {{ participant.cyclist.male ? "Сошёл" : "Сошла" }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="flex justify-center items-center mb-6 mx-5 select-none">
      <!-- <div @click="goBack()" class="stroke-white hover:stroke-lime-400 cursor-pointer">
        <ArrowSvg />
      </div> -->
      <div>Загрузка...</div>
      <!-- <div class="opacity-0 cursor-default">
        <ArrowSvg />
      </div> -->
    </div>
  </div>
</template>

<style></style>
