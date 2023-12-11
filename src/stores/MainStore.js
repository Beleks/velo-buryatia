import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useMainStore = defineStore("main", () => {
  // TODO: ?
  let apiOptions;
  // ?

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
      name: "БВМ-2014",
      id: 8,
    },
  ]);

  async function getEvents() {
    return await axios.get("st/counts/ev_cyclists?tag_id=1", apiOptions);
  }

  async function getEventResults(eventId) {
    apiOptions = {
      // headers: { Authorization: `Bearer ${mainStore.accessToken}` },
    };
    return await axios.get(`results/${eventId}`, apiOptions);
  }

  // TODO: Поменять на participant
  async function getCyclists() {
    apiOptions = {
      // headers: { Authorization: `Bearer ${mainStore.accessToken}` },
    };
    //apivelo.bielecki.ru/api/st/list/cyclist_events?tag_id=1&cyclist_id=121
    return await axios.get(`st/list/ev_cyclists?tag_id=1`, apiOptions);
  }

  async function getCyclistsResults(cyclistId) {
    apiOptions = {
      // headers: { Authorization: `Bearer ${mainStore.accessToken}` },
    };
    //apivelo.bielecki.ru/api/st/list/cyclist_events?tag_id=1&cyclist_id=121
    return await axios.get(`st/list/cyclist_events?tag_id=1&cyclist_id=${cyclistId}`, apiOptions);
  }

  return {
    protocols,
    getEvents,
    getEventResults,
    getCyclists,
    getCyclistsResults,
  };
});
