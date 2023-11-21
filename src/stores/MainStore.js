import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", () => {
  let apiOptions;
  // state, getters, actions
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
    getEvents,
    getEventResults,
    getCyclists,
    getCyclistsResults,
  };
});
