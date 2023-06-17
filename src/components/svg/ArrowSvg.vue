<script setup>
const props = defineProps({
  size: {
    type: [String, Number],
    default: 28,
  },
  // strokeColor: {
  //   type: [String],
  //   default: "white",
  // },
});
</script>

<template>
  <div>
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 12H4M4 12L10 18M4 12L10 6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style>
/*  :stroke="strokeColor" */
</style>