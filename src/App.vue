<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onActivated,
  ref,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {});

// onMounted(() => {
//   let pathName = route.matched[0]?.name;
//   width.value = window.innerWidth;

//   // console.log(pathName, " pathName");
// });
// onBeforeUpdate(() => {
//   console.log("ssdfsdfdsf");
//   let pathName = route.matched[0]?.name;
//   console.log(pathName, "pathName");
// });

// onActivated(() => {
//   console.log("sfdsf");
//   let pathName = route.matched[0]?.name;
//   console.log(pathName, "pathName");
// });
let width = ref(0);

watch(
  width,
  (newWidth, oldWidth) => {
    // console.log(oldWidth, "oldWidth");
    // console.log(newWidth, "newWidth");

    let pathName = route.matched[0]?.name;
    // console.log(oldWidth >= 1200 && newWidth < 1200, "To Mobile");
    // console.log(oldWidth <= 1200 && newWidth > 1200, "To Desktop");

    if (oldWidth >= 1200 && newWidth < 1200 && pathName !== "Mobile") {
      router.replace({ name: "Mobile" });
    } else if (oldWidth <= 1200 && newWidth > 1200 && pathName !== "Desktop") {
      router.replace({ name: "Desktop" });
    }
    //  else if (newWidth < 1200 && pathName !== "Mobile") {
    //   console.log("3");
    //   router.replace({ name: "Mobile" });
    // } else if (newWidth >= 1200 && pathName !== "Desktop") {
    //   console.log("4");
    //   router.replace({ name: "Desktop" });
    // }
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
.dashed {
  border-bottom: dashed 1px #000000;
}
.dashed-2 {
  border: none;
  height: 2px;
  background: #4d5155;
  background: repeating-linear-gradient(
    90deg,
    #4d5155,
    #4d5155 6px,
    transparent 6px,
    transparent 12px
  );
}
.fill-svg-velo {
  fill: #4d5155;
}
</style>
