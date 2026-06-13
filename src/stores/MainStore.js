import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main", () => {
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

  return {
    protocols,
  };
});
