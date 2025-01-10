import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useMainStore = defineStore("main", () => {
  // TODO: Вынести базовые настройки?
  // let apiOptions;

  let protocols = ref([
    // ID соревнования смотреть в БД, таблица events
    {
      name: "БВМ-2023",
      id: 3,
    },
    {
      name: "БВМ-2022",
      id: 1,
    },
    {
      name: "БВМ-2019",
      id: 2,
    },
    {
      name: "БВМ-2018",
      id: 4,
    },
    {
      name: "БВМ-2017",
      id: 5,
    },
    {
      name: "БВМ-2016",
      id: 6,
    },
    {
      name: "БВМ-2015",
      id: 7,
    },
    {
      name: "БВМ-2014",
      id: 8,
    },
  ]);

  async function getEvents() {
    return await axios.get("st/counts/ev_cyclists?tag_id=1");
  }

  async function getEventResults(eventId) {
    return await axios.get(`results/${eventId}`);
  }

  // TODO: Поменять название на participant?
  async function getCyclists() {
    return await axios.get(`st/list/ev_cyclists?tag_id=1`);
  }

  async function getCyclistsResults(cyclistId) {
    return await axios.get(`st/list/cyclist_events?tag_id=1&cyclist_id=${cyclistId}`);
  }

  return {
    protocols,
    getEvents,
    getEventResults,
    getCyclists,
    getCyclistsResults,
  };
});
