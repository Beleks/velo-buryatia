<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

onBeforeMount(() => {
  width.value = window.innerWidth;
});

const router = useRouter();
const route = useRoute();

let width = ref(0);

watch(
  width,
  (newWidth, oldWidth) => {
    // console.log(oldWidth, "oldWidth");
    // console.log(newWidth, "newWidth");

    // let pathName = route.matched[0]?.name;
    // console.log(oldWidth >= 1200 && newWidth < 1200, "To Mobile");
    // console.log(oldWidth <= 1200 && newWidth > 1200, "To Desktop");

    if (oldWidth >= 1200 && newWidth < 1200) {
      router.replace({ name: "Mobile" });
    } else if (oldWidth <= 1200 && newWidth > 1200) {
      router.replace({ name: "Desktop" });
    } else if (newWidth < 1200) {
      router.replace({ name: "Mobile" });
    } else if (newWidth >= 1200) {
      router.replace({ name: "Desktop" });
    }
  },
  { immediate: false }
);

window.addEventListener("resize", updateWidth);

function updateWidth(e) {
  width.value = e.target.innerWidth;
}
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style >
html {
  background-color: #242627;
}
.my-border-color {
  border-color: #4d5155;
}
</style>
