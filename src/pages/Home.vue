<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

let menu = [
  {
    name: "About",
    title: "О марафоне",
    // Убрать после 25.06.23
  },
  // {
  //   name: "Reports",
  //   title: "Отчёты",
  //   // Убрать после 25.06.23
  // },
  // {
  //   name: "About",
  //   title: "FAQ",
  //   // Убрать после 25.06.23
  // },
  // {
  //   name: "",
  //   title: "Регистрация",
  //   // Убрать после 25.06.23
  //   disable: true,
  // },
  {
    name: "Results",
    title: "Результаты",
  },
];

const currentPathName = computed(() => {
  if (route.matched[1]) {
    return route.matched[1].name;
  }
});

function chooseMenuItem(pathName) {
  if (currentPathName.value !== pathName) {
    router.push({ name: pathName });
  }
}
</script>

<template>
  <div
    class="text-white font-sans font-semibold h-screen flex flex-col justify-between"
  >
    <div>
      <menu class="flex justify-center py-10">
        <div
          :class="[
            ' mr-10 last:mr-0 cursor-pointer',
            { ' text-emerald-400': currentPathName === item.name },
          ]"
          v-for="item in menu"
          :key="item.name"
        >
          <div @click="chooseMenuItem(item.name)" :to="item.name">
            {{ item.title }}
          </div>
        </div>
      </menu>
      <div class="mb-10">
        <router-view />
      </div>
    </div>
    <!-- fixed bottom-0 -->
    <footer class="footer-bg w-full py-4 self-end end">
      <div class="px-24 max-w-7xl mx-auto flex flex-col">
        <div class="flex text-lg">
          <div class="w-1/2 mr-4">Директор соревнования: Гаськов Владимир</div>
          <div class="w-1/2">Главный судья: Корсак Наталья</div>
        </div>
        <div class="mt-6 flex">
          <div class="w-1/2 text-sm opacity-50 mr-4">
            <!-- <div>
              © 2022 г. Все права защищены. "Байкальский вело марафон - 2021"
            </div> -->
            <!-- <div class="mt-2">
              Любое использование материалов допускается только с согласия
              администрации сайта. При публикации или цитировании материалов
              прямая активная ссылка на www.baikalmarafon.ru обязательна.
            </div> -->
            <div class="mt-2">
              Данные были взяты с сайта
              <a
                class="underline"
                target="_blank"
                rel="noreferrer noopener"
                href="https://baikalmarafon.ru/"
                >https://baikalmarafon.ru/</a
              >
            </div>
            <div class="mt-2">
              Разработчики: Белецкий А. Белецкий В. |
              <a
                class="underline"
                href="https://t.me/av_belek"
                target="_blank"
                rel="noreferrer noopener"
                >Связаться с разработчиками</a
              >
            </div>
          </div>
          <div class="w-1/2 text-lg">
            <div>baikalmarafon.ru@gmail.com</div>
            <div class="mt-2">+7 (924) 650-31-46</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.footer-bg {
  background-color: #292b2d;
}
</style>
