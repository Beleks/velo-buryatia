<script setup>
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

let eventId = computed(() => {
  return route.params.eventId;
});

let event = ref([]);

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

// function culcDelay(sourceTime) {
//   if (!sourceTime) {
//     return;
//   }

//   let time = {};
//   let bestTime = participants.value[0].time;

//   Object.assign(time, sourceTime);

//   let delay = {
//     hour: 0,
//     minute: 0,
//     sec: 0,
//     calcHour() {
//       this.hour = time.hour - bestTime.hour;
//     },
//     calcMinute() {
//       if (time.minute < bestTime.minute) {
//         time.hour -= 1;
//         time.minute += 60;
//       }
//       this.minute =
//         time.minute - bestTime.minute < 10 ? `0${time.minute - bestTime.minute}` : time.minute - bestTime.minute;
//     },
//     calcSec() {
//       if (time.sec < bestTime.sec) {
//         time.minute -= 1;
//         time.sec += 60;
//       }
//       this.sec = time.sec - bestTime.sec < 10 ? `0${time.sec - bestTime.sec}` : time.sec - bestTime.sec;
//     },
//   };

//   delay.calcSec();
//   delay.calcMinute();
//   delay.calcHour();

//   return `+ ${delay.hour}:${delay.minute}:${delay.sec}`;
// }

// function switchTotalTime() {
//   isTotalTime.value = !isTotalTime.value;
// }

// function formatTime(time) {
//   // hour:minute:sec 00:00:00
//   return `${time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}:${
//     time.sec < 10 ? `0${time.sec}` : time.sec
//   }`;
// }

// function goToCyclist(cyclist) {
//   router.push({ name: "Cyclist", params: { cyclistId: cyclist.id } });
// }

function goBack() {
  router.back();
}

onMounted(() => {
  mainStore.getEventResults(eventId.value).then((response) => {
    console.log(response.data.data, "response");
  });
});
</script>

<template>
  <div class="px-24 max-w-7xl m-auto">
    <template v-if="event">
      <div class="flex justify-between items-center mb-6 mx-5 select-none">
        <div @click="goBack()" class="stroke-white hover:stroke-lime-400 cursor-pointer">
          <ArrowSvg />
        </div>
        <span class="text-2xl font-extrabold"> {{  }} </span>
        <div class="opacity-0 cursor-default">
          <ArrowSvg />
        </div>
      </div>
      <div class="px-4 mb-5 flex justify-between select-none">
        <div class="flex items-center">
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
        </div>
        <div>
          <div
            class="border my-border-color rounded px-2 py-1 bg-input-color cursor-pointer hover:border-lime-400 transition ease-out"
            @click="switchTotalTime"
          >
            <div
              class="flex justify-between items-center"
              :class="[!isTotalTime ? 'stroke-white' : 'stroke-lime-400 text-lime-400']"
            >
              <div v-if="!isTotalTime"><EyeOffSvg :size="20" /></div>
              <div v-else><EyeSvg :size="20" /></div>
              <div class="ml-2">Общий зачёт</div>
            </div>
          </div>
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
          v-for="(participant, index) in participants"
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
              :class="[participant.male ? 'bg-my-color' : 'bg-fuchsia-200 text-black']"
              class="w-7 text-xs rounded text-center mr-2"
            >
              {{ participant.number }}
            </div>
            <div class="w-60 mr-4">
              <a class="hover:underline cursor-pointer" @click="goToCyclist(participant)">
                {{ participant.name }}
              </a>
            </div>
            <div class="w-40 mr-4">
              {{ participant.city ? participant.city : "-" }}
            </div>
            <div class="w-40 mr-4">
              {{ participant.team ? participant.team : "-" }}
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-20 mr-2 opacity-70 text-end">
              {{ index !== 0 ? culcDelay(participant.time) : "" }}
            </div>
            <div v-if="participant.time" class="w-20 text-end">
              {{ formatTime(participant.time) }}
            </div>
            <div v-else class="w-20 text-end">
              {{ participant.male ? "Сошёл" : "Сошла" }}
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
