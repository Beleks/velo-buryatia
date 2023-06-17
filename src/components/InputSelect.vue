<script setup>
import { computed, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

import SimpleArrowSvg from "./svg/SimpleArrowSvg.vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  width: {
    type: [String, Number],
    default: () => "110",
  },
});

const emit = defineEmits(["input"]);

const target = ref(null);
const ignorEl = ref(null);

let dropdownMenuIsOpen = ref(false);
let selectedOption = ref(null);

let disable = computed(() => {
  return props.options.length < 2;
});

watch(
  selectedOption,
  () => {
    emit("input", selectedOption);
  },
  { immediate: true }
);
watch(
  () => props.options,
  () => {
    selectedOption.value = props.options[0];
  },
  { immediate: true }
);

onClickOutside(target, (event) => {
  // console.log(event.target, "event.target");
  // console.log([...ignorEl.value.children], "[...ignorEl.value.children]");
  // console.log([...ignorEl.value.children].includes(event.target), "ignorEl");

  // Не работает из-за "hover:"
  // console.log(
  //   event.target.closest(`.${[...ignorEl.value.classList].join(".")}`),
  //   "closest"
  // );
  //
  if (
    ignorEl.value ==
    event.target.closest(
      `.border.my-border-color.rounded.px-2.py-1.bg-input-color`
    )
  ) {
    return;
  }
  closeDropdownMenu(event);
});

function switchDropdownMenu() {
  if (disable.value) {
    return;
  }
  dropdownMenuIsOpen.value = !dropdownMenuIsOpen.value;
}

function closeDropdownMenu(event) {
  dropdownMenuIsOpen.value = false;
}

function selectOption(option) {
  selectedOption.value = option;
  closeDropdownMenu();
}
</script>

<template>
  <div class="">
    <div
      :style="{ width: `${width}px` }"
      class="border my-border-color rounded px-2 py-1 bg-input-color transition ease-out mr-6 flex justify-between items-center stroke-white"
      :class="[disable ? 'opacity-50' : 'hover:border-lime-400 cursor-pointer']"
      @click="switchDropdownMenu"
      ref="ignorEl"
    >
      <div>{{ selectedOption }}</div>
      <SimpleArrowSvg
        :class="[dropdownMenuIsOpen ? 'rotate-180' : '', 'transition ease-out']"
        :size="20"
      />
    </div>
    <div
      v-if="dropdownMenuIsOpen"
      :style="{ width: `${width}px` }"
      ref="target"
      class="absolute mt-2 border my-border-color rounded z-10 shadow-md flex flex-col overflow-hidden"
    >
      <span
        :class="[
          'px-2 py-1 cursor-pointer hover:text-lime-400',
          option == selectedOption
            ? 'bg-input-color-selected'
            : 'bg-input-color',
        ]"
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
      >
        {{ option }}
      </span>
    </div>
  </div>
</template>

<style>
</style>