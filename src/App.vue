<script setup>
import { onBeforeMount, onMounted, onBeforeUpdate, onActivated, ref, watch } from "vue";
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

<style>
html {
  background-color: #18181b;
  /* 242627*/
}
.bg-input-color {
  background-color: #313538;
}

.bg-input-color-selected {
  background-color: #242628;
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
  background: repeating-linear-gradient(90deg, #4d5155, #4d5155 6px, transparent 6px, transparent 12px);
}

.fill-svg-velo {
  fill: #4d5155;
}
.bg-gradient-0 {
  background: linear-gradient(261deg, #fb7185 /* Большой круг */ 6.96%, #f472b6 /* Маленький круг */ 56.96%);
}

.bg-gradient-1 {
  background: linear-gradient(261deg, #e879f9 6.96%, #c084fc 56.96%);
}

.bg-gradient-2 {
  background: linear-gradient(261deg, #a78bfa 6.96%, #818cf8 56.96%);
}

.hover-table-item:hover {
  background-color: hsla(0, 0%, 100%, 0.08);
}

.bg-table-color {
  background-color: rgba(49, 53, 56, 0.8);
}

.bg-my-color {
  background-color: rgba(49, 53, 56, 1);
}

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
