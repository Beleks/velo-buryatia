<script setup>
import { computed, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

import SimpleArrowSvg from "./svg/SimpleArrowSvg.vue";

const props = defineProps({
  label: {
    type: Array,
    default: () => {
      return ["name"];
    },
  },
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Object,
    // default ?
  },
  width: {
    type: [String, Number],
    default: () => "110",
  },
});

const emit = defineEmits(["input", "update:modelValue"]);

const target = ref(null);
const ignorEl = ref(null);

let dropdownMenuIsOpen = ref(false);
let selectedOption = ref(null);

let disable = computed(() => {
  return props.options.length < 2;
});

watch(
  () => props.modelValue,
  () => {
    selectedOption.value = props.modelValue;
  },
  { immediate: true }
);

onClickOutside(target, (event) => {
  // Не работает из-за "hover:"
  // console.log(
  //   event.target.closest(`.${[...ignorEl.value.classList].join(".")}`),
  //   "closest"
  // );
  //
  // TODO: Пересмотреть получение элемента?
  if (ignorEl.value == event.target.closest(`.border.my-border-color.rounded.px-2.py-1.bg-input-color`)) {
    return;
  }
  closeDropdownMenu();
});

function switchDropdownMenu() {
  if (disable.value) {
    return;
  }
  dropdownMenuIsOpen.value = !dropdownMenuIsOpen.value;
}

function closeDropdownMenu() {
  dropdownMenuIsOpen.value = false;
}

function selectOption(option) {
  selectedOption.value = option;
  emit("update:modelValue", selectedOption.value);
  closeDropdownMenu();
}
</script>

<template>
  <div class="">
    <div
      :style="{ width: `${width}px` }"
      class="h-[34px] border my-border-color rounded px-2 py-1 bg-input-color transition ease-out flex justify-between items-center stroke-white"
      :class="[disable ? 'opacity-50' : 'hover:border-emerald-400 cursor-pointer']"
      @click="switchDropdownMenu"
      ref="ignorEl"
    >
      <div>{{ props.modelValue?.[label[0]] }}</div>
      <SimpleArrowSvg :class="[dropdownMenuIsOpen ? 'rotate-180' : '', 'transition ease-out']" :size="20" />
    </div>
    <div
      v-if="dropdownMenuIsOpen"
      :style="{ width: `${width}px` }"
      ref="target"
      class="absolute mt-2 border my-border-color rounded z-10 shadow-md flex flex-col overflow-hidden"
    >
      <span
        :class="[
          'px-2 py-1 cursor-pointer hover:text-emerald-400',
          option?.id == selectedOption?.id ? 'bg-input-color-selected' : 'bg-input-color',
        ]"
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
      >
        <slot :option="option"></slot>
      </span>
    </div>
  </div>
</template>

<style></style>
