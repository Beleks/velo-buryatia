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
    <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.9997 12.0003V17.3336M15.9997 22.667H16.013M14.1534 5.18927L3.18692 24.1314C2.57865 25.1821 2.27451 25.7074 2.31946 26.1386C2.35867 26.5146 2.5557 26.8564 2.86151 27.0787C3.21212 27.3336 3.81913 27.3336 5.03317 27.3336H26.9662C28.1802 27.3336 28.7872 27.3336 29.1378 27.0787C29.4437 26.8564 29.6407 26.5146 29.6799 26.1386C29.7248 25.7074 29.4207 25.1821 28.8124 24.1314L17.8459 5.18927C17.2398 4.14238 16.9368 3.61894 16.5414 3.44314C16.1965 3.28979 15.8028 3.28979 15.4579 3.44314C15.0626 3.61894 14.7595 4.14239 14.1534 5.18927Z"
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
