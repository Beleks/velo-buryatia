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
  {
    name: "Cyclists",
    title: "Участники",
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
  <!-- font-semibold font-sans -->
  <div class="text-white font-semibold h-screen flex flex-col justify-between">
    <div>
      <menu class="flex justify-center py-10">
        <!-- text-emerald-400 -->
        <div
          :class="[' mr-10 last:mr-0 cursor-pointer', { 'text-emerald-400': currentPathName == item.name }]"
          v-for="item in menu"
          :key="item.name"
        >
          <router-link :to="{ name: item.name }" v-slot="{ href, route, navigate }">
            <a :href="href" @click="navigate">
              {{ item.title }}
            </a>
          </router-link>
        </div>
      </menu>
      <div class="mb-10">
        <router-view />
      </div>
    </div>
    <!-- fixed bottom-0 -->
    <footer class="bg-[#202022] w-full py-4 self-end end">
      <div class="mx-auto flex flex-col items-center">
        <div class="flex text-lg">
          <div class="w-[600px] mr-4">Директор соревнования: Гаськов Владимир</div>
          <div class="w-[270px]">Главный судья: Корсак Наталья</div>
        </div>
        <div class="mt-6 flex">
          <div class="w-[600px] text-sm opacity-50 mr-4">
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
              <a class="underline" target="_blank" rel="noreferrer noopener" href="https://baikalmarafon.ru/"
                >baikalmarafon.ru</a
              >
            </div>
            <div class="mt-2">
              Разработчики: Белецкий А. Белецкий В. |
              <a class="underline" href="https://t.me/av_belek" target="_blank" rel="noreferrer noopener"
                >Связаться с разработчиками</a
              >
            </div>
          </div>
          <div class="text-lg w-[270px]">
            <div>baikalmarafon.ru@gmail.com</div>
            <div class="mt-2">+7 (924) 650-31-46</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* .footer-bg {
  background-color: #202022;
} */
</style>
