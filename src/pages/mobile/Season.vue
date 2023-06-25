<script setup>
import _ from "lodash";
import InputSelect from "@/components/InputSelect.vue";
import ArrowSvg from "@/components/svg/ArrowSvg.vue";
import EyeOffSvg from "@/components/svg/EyeOffSvg.vue";
import EyeSvg from "@/components/svg/EyeSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

let selectedDistance = ref(null);
let selectedTypeByke = ref(null);
let selectedGroup = ref(null);
let isTotalTime = ref(false);

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
  if (isTotalTime.value) {
    let participants = [];
    let neededMarathons = seasonMarathon.value.filter(
      (element) => element.distance == selectedDistance.value
    );

    neededMarathons.forEach((element) => {
      participants.push(_.cloneDeep(element.participants));
    });

    participants = participants.flat();

    let descendedParticipants = participants.filter(
      (element) => !element.place
    );

    return participants
      .filter((element) => element.place)
      .sort((firstEl, secondEl) => {
        if (firstEl.time.hour - secondEl.time.hour < 0) {
          return -1;
        } else if (firstEl.time.hour - secondEl.time.hour == 0) {
          if (firstEl.time.minute - secondEl.time.minute < 0) {
            return -1;
          } else if (firstEl.time.minute - secondEl.time.minute == 0) {
            return firstEl.time.sec - secondEl.time.sec;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      })
      .concat(descendedParticipants);
  } else {
    let participants = _.cloneDeep(
      seasonMarathon.value.find(
        (element) =>
          element.distance == selectedDistance.value &&
          element.type == selectedTypeByke.value
      )?.participants
    );

    return participants?.filter(
      (participant) => participant.group == selectedGroup.value
    );
  }
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

  Object.assign(time, sourceTime);

  let delay = {
    hour: 0,
    minute: 0,
    sec: 0,
    calcHour() {
      this.hour = time.hour - bestTime.hour;
    },
    calcMinute() {
      if (time.minute < bestTime.minute) {
        time.hour -= 1;
        time.minute += 60;
      }
      this.minute =
        time.minute - bestTime.minute < 10
          ? `0${time.minute - bestTime.minute}`
          : time.minute - bestTime.minute;
    },
    calcSec() {
      if (time.sec < bestTime.sec) {
        time.minute -= 1;
        time.sec += 60;
      }
      this.sec =
        time.sec - bestTime.sec < 10
          ? `0${time.sec - bestTime.sec}`
          : time.sec - bestTime.sec;
    },
  };

  delay.calcSec();
  delay.calcMinute();
  delay.calcHour();

  return `+ ${delay.hour}:${delay.minute}:${delay.sec}`;
}

function switchTotalTime() {
  isTotalTime.value = !isTotalTime.value;
}

function formatTime(time) {
  // hour:minute:sec 00:00:00
  return `${time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}:${
    time.sec < 10 ? `0${time.sec}` : time.sec
  }`;
}

function goToCyclist(cyclist) {
  router.push({ name: "Cyclist_m", params: { cyclistId: cyclist.id } });
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="px-2 m-auto">
    <template v-if="seasonMarathon">
      <div class="flex justify-between items-center mb-6 mx-5 select-none">
        <div
          @click="goBack()"
          class="stroke-white hover:stroke-lime-400 cursor-pointer"
        >
          <ArrowSvg />
        </div>
        <span class="text-xl font-extrabold">
          {{ selectedSeason }}
        </span>
        <div class="opacity-0 cursor-default">
          <div>
            <ArrowSvg />
          </div>
        </div>
      </div>
      <div class="px-4 mb-5 flex flex-col justify-between select-none">
        <div class="flex justify-between items-center mb-2">
          <div class="opacity-60 mr-3">Дистанция:</div>
          <InputSelect
            :options="distances"
            @input="selectDistance"
            :width="160"
          />
        </div>
        <div
          v-show="!isTotalTime"
          class="flex justify-between items-center mb-2"
        >
          <div class="opacity-60 mr-3">Велосипед:</div>
          <InputSelect
            :options="typesBike"
            @input="selectTypeBike"
            :width="160"
          />
        </div>
        <div
          v-show="!isTotalTime"
          class="flex justify-between items-center mb-2"
        >
          <div class="opacity-60 mr-3">Группа:</div>
          <InputSelect :options="groups" @input="selectGroup" :width="160" />
        </div>
        <div
          class="border my-border-color rounded px-2 py-1 bg-input-color cursor-pointer hover:border-lime-400 transition ease-out"
          @click="switchTotalTime"
        >
          <div
            class="flex justify-center items-center"
            :class="[
              !isTotalTime
                ? 'opacity-40 stroke-white'
                : 'stroke-lime-400 text-lime-400',
            ]"
          >
            <div v-if="!isTotalTime"><EyeOffSvg :size="20" /></div>
            <div v-else><EyeSvg :size="20" /></div>
            <div class="ml-2">Общий зачёт</div>
          </div>
        </div>
      </div>
      <div class="border my-border-color rounded mb-8">
        <div
          class="bg-table-color justify-between px-2 py-2 flex font-normal items-center opacity-80"
        >
          <!-- items-center -->
          <div class="flex">
            <div class="w-7 h-7 flex justify-center items-center mr-2">#</div>
            <div class="w-7 text-center mr-2">№</div>
            <div class="w-40 mr-4">
              <div>Фамилия Имя</div>
              <div class="font-normal opacity-50">нп. | Команда</div>
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
          v-for="(participant, index) in participants"
          :key="index"
        >
          <div class="flex items-center">
            <div
              :class="[
                {
                  first: index == 0 && participant.place,
                  second: index == 1 && participant.place,
                  third: index == 2 && participant.place,
                },
                'text-lg font-bold w-7 h-7 flex justify-center items-center rounded-full mr-2',
              ]"
            >
              {{ participant.place ? index + 1 : "-" }}
            </div>
            <div class="w-7 text-xs bg-my-color rounded text-center mr-2">
              {{ participant.number }}
            </div>
            <div class="w-40 mr-4 truncate">
              <a
                class="hover:underline cursor-pointer"
                @click="goToCyclist(participant)"
              >
                {{ participant.name }}
              </a>
              <div class="flex text-sm font-normal opacity-70">
                <div class="mr-2">{{ participant.city }}</div>
                |
                <div class="ml-2">-</div>
              </div>
            </div>
            <!-- <div class="w-40 mr-4">{{ participant.city }}</div>
            <div class="w-40 mr-4">-</div> -->
          </div>
          <div class="flex flex-col items-center">
            <div class="w-20 text-end">
              {{ participant.time ? formatTime(participant.time) : "Сошёл" }}
            </div>
            <div class="w-20 font-normal opacity-70 text-end">
              {{ index !== 0 ? culcDelay(participant.time) : "" }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="text-2xl font-extrabold text-center">
      Нет результатов
    </div>
  </div>
</template>

<style>
</style>