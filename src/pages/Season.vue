<script setup>
// TODO: Поменять Groups на Category
// TODO: Переименовать getTypesBike, ... -> getTypesBikeFilter, ...Filter?

import SeasonDesktopView from "@/pages/desktop/Season.vue"
import SeasonMobileView from "@/pages/mobile/Season.vue"

import { computed, ref, onMounted, watch, provide, readonly } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

const typeComponent = computed(() => {
  if (route.meta.typeView === 'Desktop') {
    return SeasonDesktopView;
  } else {
    return SeasonMobileView;
  }
});

let routeQueryParams = {}

const event = ref({
  // id: null,
  // name: '',
  // protocolLink: '',
})

const filters = ref({
  // TODO: selected: {} ?
  distances: {
    selected: null,
    options: []
  },
  typesBike: {
    selected: null,
    options: []
  },
  groups: {
    selected: null,
    options: []
  },
})

const allTypesBikeOption = { id: null, name: 'Общий зачёт' } // name: 'Все типы велосипедов'
const allGroupOption = { id: null, name: 'Общий зачёт' }

const participants = ref([]);

// TODO: Нужен ли computed ?
let eventId = computed(() => {
  return +route.params.eventId;
});
// ===

let filteredParticipants = computed(() => {
  const { distances, typesBike, groups } = filters.value

  let filteredByDistance = participants.value.filter((participant) => {
    return (
      participant.distance.id === distances.selected?.id
    );
  })

  // Выбран "общий зачёт" в списке велосипедов, в списке больше 1 элемента
  if (typesBike.selected?.id === allTypesBikeOption.id && typesBike.options.length > 1) {
    return setPlaces(filteredByDistance)
  }
  // Выбран "общий зачёт" в списке велосипедов + в списке групп
  if (typesBike.selected?.id === allTypesBikeOption.id && groups.selected?.id === allGroupOption.id) {
    return setPlaces(filteredByDistance)
  }

  let filteredByBiketype = filteredByDistance.filter((participant) => {
    return (
      participant.biketype.id === typesBike.selected?.id
    );
  })

  // Выбран "общий зачёт" в списке групп
  if (groups.selected?.id === allGroupOption.id) {
    return setPlaces(filteredByBiketype)
  }

  let filteredByGroup = filteredByBiketype.filter((participant) => {
    return (
      participant.category.id === groups.selected?.id
    );
  })

  return setPlaces(filteredByGroup)
});

function startWatchFilters() {
  watch(
    () => filters.value.distances.selected,
    () => {
      filters.value.typesBike = getTypesBike(participants.value, filters.value.distances.selected);
    }
  );
  watch(
    () => filters.value.typesBike,
    () => {
      filters.value.groups = getGroups(participants.value, filters.value.distances.selected, filters.value.typesBike.selected);
    },
    {
      deep: true
    }
  );
  watch(
    () => filters.value.groups,
    () => {

      router.replace({
        name: route.name,
        query: {
          distance: filters.value.distances.selected?.id,
          bike: filters.value.typesBike.selected?.id || 'all',
          group: filters.value.groups.selected?.id || 'all',
        },
      });
    },
    {
      deep: true
    }
  );
}

function getProtocolLink(eventId) {
  let protocolName = mainStore.protocols.find((protocol) => protocol.id === eventId).name;
  return `https://bm.cyclists03.ru/protocols/${protocolName}.pdf`;
}

function getDistances(participants, selectedValueId) {
  let selected
  let distances = [];

  participants.forEach((participant) => {
    if (!distances.some((distance) => participant.distance.id === distance.id)) {
      distances.push(participant.distance);
    }
  });

  selected = distances.find((distance) => distance.id === selectedValueId) || distances[0] || null

  return {
    selected,
    options: distances
  };

}

function getTypesBike(participants, selectedDistance, selectedValueId) {
  let selected
  // const uniqueBikeTypes = [allTypesBikeOption];
  const uniqueBikeTypes = [];
  uniqueBikeTypes.push({ ...allTypesBikeOption })

  participants.forEach((participant) => {
    if (participant.distance.id === selectedDistance.id) {
      if (!uniqueBikeTypes.some((bikeType) => bikeType.id === participant.biketype.id)) {
        uniqueBikeTypes.push(participant.biketype);
      }
    }
  });

  // Если в списке типов велосипеда нет опций кроме общего зачёта, то "Общий зачёт" -> "-"
  if (uniqueBikeTypes.length === 1 && uniqueBikeTypes[0].id === allTypesBikeOption.id) {
    uniqueBikeTypes[0].name = '-'
  }

  if (uniqueBikeTypes.length === 2) {
    const allTypesBikeOptionIndex = uniqueBikeTypes.findIndex((bikeType) => bikeType.id === allTypesBikeOption.id)
    uniqueBikeTypes.splice(allTypesBikeOptionIndex, 1)
  }

  selected = uniqueBikeTypes.find(bikeType => bikeType.id === selectedValueId) || uniqueBikeTypes[0] || null;

  return {
    selected,
    options: uniqueBikeTypes
  };

}

function getGroups(participants, selectedDistance, selectedTypeBike, selectedValueId) {
  let selected
  // Всегда ли будут группы?
  // const uniqueGroups = [allGroupOption];
  const uniqueGroups = [];
  uniqueGroups.push({ ...allGroupOption })

  participants.forEach((participant) => {
    if (participant.distance.id === selectedDistance.id && participant.biketype.id === selectedTypeBike.id) {
      if (!uniqueGroups.some((group) => group.id === participant.category.id)) {
        uniqueGroups.push(participant.category);
      }
    }
  });

  if (uniqueGroups.length === 2) {
    const allGroupOptionIndex = uniqueGroups.findIndex((group) => group.id === allGroupOption.id)
    uniqueGroups.splice(allGroupOptionIndex, 1)
  }

  selected = uniqueGroups.find((group) => group.id === selectedValueId) || uniqueGroups[0] || null;

  return {
    selected,
    options: uniqueGroups
  };
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

onMounted(() => {
  routeQueryParams = route.query;

  mainStore.getEvents().then((response) => {
    // TODO: Нет метода для получения информации о соревновании (название, дата проведения) по его id. Поэтому такой костыль
    let neededEvent = response.data.data.find((event) => event.id === eventId.value);
    event.value = {
      ...neededEvent,
      protocolLink: getProtocolLink(neededEvent.id),
    }
  });

  mainStore.getEventResults(eventId.value).then((response) => {
    participants.value = response.data.data.sort((cyclist_1, cyclist_2) => cyclist_1.result - cyclist_2.result);

    filters.value.distances = getDistances(participants.value, +routeQueryParams.distance);
    filters.value.typesBike = getTypesBike(participants.value, filters.value.distances.selected, +routeQueryParams.bike);
    filters.value.groups = getGroups(participants.value, filters.value.distances.selected, filters.value.typesBike.selected, +routeQueryParams.group);

    startWatchFilters()
  });
});

provide('filters', filters)
provide('filteredParticipants', readonly(filteredParticipants))
provide('event', readonly(event))
</script>

<template>
  <component :is="typeComponent"/>
</template>

<style></style>
