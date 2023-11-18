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

  return {
    getEvents,
    getEventResults,
  };
});
