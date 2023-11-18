<script setup>
import VeloDarkSvg from "@/components/svg/VeloDarkSvg.vue";
import VeloColorSvg from "@/components/svg/VeloColorSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { useMainStore } from "@/stores/MainStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

let nothingIsSelected = computed(() => {
  return route.name == "Results";
});


</script>

<!-- TODO: Season поменять на event -->
<template>
  <RouterView></RouterView>
</template>

<style>
.first {
  background-color: #fee265;
  color: #242627;
  /* width: 36px; */
  /* height: 36px; */
  /* border-radius: 50px; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}

.second {
  background-color: #a9d3d8;
  color: #242627;
  /* width: 36px;
  height: 36px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center; */
}

.third {
  background-color: #a66f45;
  color: #242627;
}
</style>
