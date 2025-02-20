<script setup>
import { convertMsToTime, culcDelay } from "@/utils/utils.js";

import InputSelect from "@/components/InputSelect.vue";
import ArrowSvg from "@/components/svg/ArrowSvg.vue";
import DocSvg from "@/components/svg/DocSvg.vue";

import { inject } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const filters = inject("filters");
const event = inject("event");

const filteredParticipants = inject('filteredParticipants')

function goToCyclist(participant) {
  return { name: "Cyclist", params: { cyclistId: participant.cyclist.id } }
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="px-24 max-w-7xl m-auto">
    <template v-if="event.id">
      <div class="flex justify-between items-center mb-6 mx-5">
        <div @click="goBack()" class="select-none stroke-neutral-400 hover:stroke-white cursor-pointer">
          <ArrowSvg/>
        </div>
        <span class="text-2xl font-extrabold"> {{ event.name }} </span>
        <div class="opacity-0 cursor-default">
          <ArrowSvg/>
        </div>
      </div>
      <div class="px-4 mb-5 flex justify-between select-none">
        <div class="flex items-center">
          <div class="flex items-center mr-6">
            <div class="opacity-60 mr-3">Дистанция:</div>
            <InputSelect
              v-model="filters.distances.selected"
              :options="filters.distances.options"
              v-slot="{ option }"
            >
              {{ option.name }}
            </InputSelect>
          </div>
          <div class="flex items-center mr-6">
            <div class="opacity-60 mr-3">Велосипед:</div>
            <InputSelect
              v-model="filters.typesBike.selected"
              :options="filters.typesBike.options"
              :width="160"
              v-slot="{ option }"
            >
              {{ option.name }}
            </InputSelect>
          </div>
          <div class="flex items-center mr-6">
            <div class="opacity-60 mr-3">Группа:</div>
            <InputSelect
              v-model="filters.groups.selected"
              :options="filters.groups.options"
              :width="160"
              v-slot="{ option }"
            >
              {{ option.name }}
            </InputSelect>
          </div>
        </div>
        <div>
          <a
            target="_blank"
            :href="event.protocolLink"
            class="flex items-center h-[34px] border my-border-color rounded px-4 py-1 cursor-pointer bg-input-color transition ease-out hover:border-emerald-400"
          >
            <DocSvg class="mr-2"/>
            Протокол
          </a>

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
      <div class="border my-border-color rounded mb-8 overflow-hidden">
        <div class="bg-table-color justify-between px-4 py-2 flex font-normal items-center opacity-80">
          <div class="flex items-center">
            <div class="w-7 h-7 mr-4 flex justify-center items-center">#</div>
            <div class="w-7 text-center mr-2">№</div>
            <div class="w-60 mr-4">Фамилия Имя</div>
            <div class="w-40 mr-4">нп.</div>
            <div class="w-56 mr-4">Команда</div>
          </div>
          <div class="flex items-center">
            <div class="w-20 mr-2 text-end"></div>
            <div class="w-20 text-end">Время</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between px-4 border-b last:border-none my-border-color py-2 hover-table-item group"
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
                'text-lg font-bold w-7 h-7 flex justify-center items-center rounded-full mr-4',
              ]"
            >
              {{ participant.status === 2 ? participant.place : "-" }}
            </div>
            <div
              :class="[participant.cyclist.male ? 'bg-my-color' : 'bg-fuchsia-200 text-black']"
              class="w-7 text-xs rounded text-center mr-2"
            >
              {{ participant.bip }}
            </div>
            <div class="w-60 mr-4">
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
            </div>
            <div class="w-40 mr-4">
              {{ participant.city.name ? participant.city.name : "-" }}
            </div>
            <div class="w-56 mr-4 truncate">
              {{ participant.team.name ? participant.team.name : "-" }}
            </div>
          </div>
          <div class="flex items-center">
            <div v-if="participant.status === 2" class="w-20 mr-2 opacity-70 text-end">
              {{ index !== 0 ? culcDelay(participant.result, filteredParticipants[0].result) : "" }}
            </div>
            <div v-if="participant.status === 2" class="w-20 text-end">
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
      <div>Загрузка...</div>
    </div>
  </div>
</template>

<style></style>
