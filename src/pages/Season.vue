<script setup>
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

const event = ref({
  // id: null,
  // name: '',
  // protocolLink: '',
})

const filtres = ref({
  distances: [],
  typesBike: [],
  groups: []
})

const selectedDistance = ref(null);
const selectedTypeBike = ref(null);
const selectedGroup = ref(null);

const participants = ref([]);

// Для чего?
const culcFilter = ref(false);

watch(
  () => selectedDistance.value,
  () => {
    filtres.value.typesBike = getTypesBike(participants.value, selectedDistance.value);
    if (culcFilter.value) {
      selectedTypeBike.value = filtres.value.typesBike[0];
    }
    changeStatus();
  }
);

watch(
  () => selectedTypeBike.value,
  () => {
    filtres.value.groups = getGroups(participants.value, selectedDistance.value, selectedTypeBike.value);
    if (culcFilter.value) {
      selectedGroup.value = filtres.value.groups[0];
    }
  }
);

watch(
  () => selectedGroup.value,
  () => {
    router.replace({
      name: route.name,
      query: {
        distance: selectedDistance.value?.id,
        bike: selectedTypeBike.value?.id,
        group: selectedGroup.value?.id,
      },
    });
  }
);
// TODO: Нужен ли computed ?
let eventId = computed(() => {
  return +route.params.eventId;
});

let filteredParticipants = computed(() => {
  let filteredParticipants = participants.value.filter((participant) => {
    return (
      participant.distance.id === selectedDistance.value?.id &&
      participant.biketype.id === selectedTypeBike.value?.id &&
      participant.category.id === selectedGroup.value?.id
    );
  });

  return setPlaces(filteredParticipants);
});

function getProtocolLink(eventId) {
  let protocolName = mainStore.protocols.find((protocol) => protocol.id === eventId).name;
  return `https://bm.cyclists03.ru/protocols/${protocolName}.pdf`;
}

function getDistances(participants) {
  let distances = [];

  participants.forEach((participant) => {
    if (!distances.some((distance) => participant.distance.id === distance.id)) {
      distances.push(participant.distance);
    }
  });

  return distances;
}

function getTypesBike(participants, selectedDistance) {
  const uniqueBikeTypes = [{ id: null, name: 'Общий зачёт' }];

  participants.forEach((participant) => {
    if (participant.distance.id === selectedDistance.id) {
      if (!uniqueBikeTypes.some((bikeType) => bikeType.id === participant.biketype.id)) {
        uniqueBikeTypes.push(participant.biketype);
      }
    }
  });

  return uniqueBikeTypes;
}

function getGroups(participants, selectedDistance, selectedTypeBike) {
  const uniqueGroups = [{ id: null, name: 'Общий зачёт' }];

  participants.forEach((participant) => {
    if (participant.distance.id === selectedDistance.id && participant.biketype.id === selectedTypeBike.id) {
      if (!uniqueGroups.some((group) => group.id === participant.category.id)) {
        uniqueGroups.push(participant.category);
      }
    }
  });

  return uniqueGroups;
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
  let query = route.query;

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

    filtres.value.distances = getDistances(participants.value);
    if (!filtres.value.distances.find((distance) => distance.id === query.distance)) {
      selectedDistance.value = filtres.value.distances[0];
    } else {
      selectedDistance.value = filtres.value.distances.find((distance) => distance.id === query.distance);
    }

    filtres.value.typesBike = getTypesBike(participants.value, selectedDistance.value);
    if (!filtres.value.typesBike.find((typeBike) => typeBike.id === query.bike)) {
      selectedTypeBike.value = filtres.value.typesBike[0];
    } else {
      selectedTypeBike.value = filtres.value.typesBike.find((typeBike) => typeBike.id === query.bike);
    }

    // TODO: Поменять на category
    filtres.value.groups = getGroups(participants.value, selectedDistance.value, selectedTypeBike.value);
    if (!filtres.value.groups.find((group) => group.id === query.group)) {
      selectedGroup.value = filtres.value.groups[0];
    } else {
      selectedGroup.value = filtres.value.groups.find((group) => group.id === query.group);
    }
  });
});

// TODO:FIXME: Поменять название. Устанавливает в true, когда фильтры из пути применялись. Костыль !!
function changeStatus() {
  culcFilter.value = true;
}

provide('filtres', readonly(filtres))
provide('selectedDistance', selectedDistance)
provide('selectedTypeBike', selectedTypeBike)
provide('selectedGroup', selectedGroup)
provide('filteredParticipants', readonly(filteredParticipants))
provide('event', readonly(event))
</script>

<template>
  <component :is="typeComponent"/>
</template>

<style></style>
