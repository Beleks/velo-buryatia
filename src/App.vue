<script setup>
import { onBeforeMount, onMounted, onBeforeUpdate, onActivated, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {});

let width = ref(0);

watch(
  width,
  (newWidth, oldWidth) => {
    let pathName = route.matched[0]?.name;

    if (oldWidth >= 1200 && newWidth < 1200 && pathName !== "Mobile") {
      router.replace({ name: `${route.name}_m` });
    } else if (oldWidth <= 1200 && newWidth > 1200 && pathName !== "Desktop") {
      router.replace({ name: `${route.name.slice(0, -2)}` });
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
.bg-gradient-3 {
  background: linear-gradient(261deg, #38bdf8 6.96%, #38bdf8 56.96%);
}
.bg-gradient-4 {
  background: linear-gradient(261deg, #22d3ee 6.96%, #2dd4bf 56.96%);
}
.bg-gradient-5 {
  background: linear-gradient(261deg, #34d399 6.96%, #4ade80 56.96%);
}
.bg-gradient-6 {
  background: linear-gradient(261deg, #a3e635 6.96%, #facc15 56.96%);
}
.bg-gradient-7 {
  background: linear-gradient(261deg, #fbbf24 6.96%, #fb923c 56.96%);
}

.hover-table-item:hover {
  background-color: #222225;
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
.text-gradient {
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(90.41deg, #79ffdb 0%, #abff75 98.38%);
}

.faq-bg {
  background-color: #313538;
}

.ticket-bg {
  background-color: #313538;
}

.text-rotate {
  /* margin-top: 8rem; */
  margin-right: -4rem;
  margin-left: -1rem;
  transform: rotate(270deg);
  opacity: 0.3;
}

.border-dashed-color {
  border-color: #242627;
}

.circle-ticket {
}

.circle-ticket-top {
  width: 40px;
  height: 40px;
  background-color: #18181b;
  top: -20px;
  left: 186px;
}

.circle-ticket-bottom {
  width: 40px;
  height: 40px;
  background-color: #18181b;
  left: 186px;
  bottom: -20px;
}

.dark-bg {
  background-color: #4d5155;
}

.min-w-52 {
  min-width: 208px;
}

.my-button {
  border: 1px solid #79ffdb;
  color: #79ffdb;
  transition: all 0.3s ease-in-out;
}

.my-button:hover {
  border: 1px solid #34d399;
  color: #fff;
  background-color: #34d399;
}
</style>
