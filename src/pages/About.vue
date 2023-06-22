<script setup>
import MainMapSvg from "../components/svg/MainMapSvg.vue";
import DistenceSvg from "../components/svg/DistenceSvg.vue";
import FanySvg from "../components/svg/FanySvg.vue";
import OzeroSvg from "../components/svg/OzeroSvg.vue";
import PeoplsSvg from "../components/svg/PeoplsSvg.vue";
import ServiceSvg from "../components/svg/ServiceSvg.vue";
import VeloDarkSvg from "../components/svg/VeloDarkSvg.vue";
import VeloColorSvg from "../components/svg/VeloColorSvg.vue";
import DocSvg from "../components/svg/DocSvg.vue";

import { AccordionList, AccordionItem } from "vue3-rich-accordion";

import SimpleArrowSvg from "../components/svg/SimpleArrowSvg.vue";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function toReports() {
  router.push({ name: "Reports" });
}
</script>

<template>
  <div class="px-12 max-w-7xl mx-auto">
    <div class="fixed -z-30 opacity-5 right-2">
      <VeloDarkSvg :size="1000" />
    </div>
    <div
      class="text-3xl font-extrabold uppercase text-center text-gradient mt-14 mb-10"
    >
      Байкальский ВелоМарафон
    </div>
    <div class="flex items-center">
      <MainMapSvg />
      <div class="ml-4 text-xl font-extrabold">
        <div class="mb-14">
          Самое статусное велосоревнование от Сибири и до Камчатки
        </div>
        <div class="mb-14">
          Максимальная дистанция <span class="text-emerald-400">260 км</span>
        </div>
        <div>
          Более <span class="text-emerald-400">1000</span> участников с разных
          регионов
        </div>
      </div>
    </div>
    <div class="mt-14 mb-14">
      <div class="flex mb-10">
        <div class="mr-8">
          <div><OzeroSvg /></div>
        </div>
        <div>
          <div class="text-xl font-bold">
            ТРАССА ВДОЛЬ ВОСТОЧНОГО ПОБЕРЕЖЬЯ БАЙКАЛА
          </div>
          <div class="font-normal">
            Такой красоты вы нигде больше не увидите. Только представь себе, как
            едешь на велосипеде вдоль побережья Байкала… морской ветерок бодрит,
            а свежий воздух наполняет энергией.
          </div>
        </div>
      </div>
      <div class="flex mb-10">
        <div class="mr-8">
          <div><ServiceSvg /></div>
        </div>
        <div>
          <div class="text-xl font-bold">УДОБНЫЙ СЕРВИС</div>
          <div class="font-normal">
            Можете не переживать о том, как добраться до места, где жить, чем
            питаться. За 10 лет организаторы продумали всё до мелочей. Просто
            выбираете удобный для вас пакет и наслаждаетесь отдыхом.
          </div>
        </div>
      </div>
      <div class="flex mb-10">
        <div class="mr-8">
          <div><PeoplsSvg /></div>
        </div>
        <div>
          <div class="text-xl font-bold">25 ВОЗРАСТНЫХ ГРУПП</div>
          <div class="font-normal">
            Можете быть уверены, что будучи даже новичком вы можете победить.
            Здесь всё чётко – равный соревнуются с равным. Есть даже отдельные
            группы для школьников и пенсионеров.
          </div>
        </div>
      </div>
      <div class="flex mb-10">
        <div class="mr-8">
          <div><DistenceSvg /></div>
        </div>
        <div>
          <div class="text-xl font-bold">ДИСТАНЦИИ ДЛЯ ВСЕХ</div>
          <div class="font-normal">
            10 различных дистанций от 100 метров до 260 км. Каждый найдёт свою!
          </div>
        </div>
      </div>
      <div class="flex mb-10">
        <div class="mr-8">
          <div><FanySvg /></div>
        </div>
        <div>
          <div class="text-xl font-bold">
            ИНТЕРЕСНАЯ РАЗВЛЕКАТЕЛЬНАЯ ПРОГРАММА
          </div>
          <div class="font-normal">
            После велогонки вас ждут дискотека на берегу Байкала, пионерский
            костёр, песни под гитару, игры, конкурсы. Сюда даже можно приехать
            просто в качестве болельщика – своеобразный «Тур выходного дня».
          </div>
        </div>
      </div>
    </div>
    <div class="px-20 mb-14">
      <div class="ticket-bg rounded-3xl h-72 max-w-4xl m-auto flex">
        <div
          class="flex items-center border-r-2 border-dashed border-dashed-color h-full pl-10 relative min-w-52"
        >
          <div><VeloDarkSvg :size="80" /></div>
          <div class="absolute circle-ticket-bottom rounded-3xl"></div>
          <div class="absolute circle-ticket-top rounded-3xl"></div>
          <div class="text-rotate">
            <span class="mr-8">XVI 2023</span>
            <span>XVI 2023</span>
          </div>
        </div>
        <div class="px-6 py-3 flex flex-col justify-between w-full">
          <div>
            <div
              class="flex text-2xl text-gradient font-extrabold uppercase tracking-wide"
            >
              Baikal Marathon XVI 2023
              <VeloColorSvg class="ml-4" />
            </div>
            <div class="opacity-50 mt-4 mb-2">Дистанции | масстарт</div>
            <div>
              <span class="px-4 rounded-xl dark-bg mr-2">260 км</span>
              <span class="px-4 rounded-xl dark-bg mr-2">200 км</span>
              <span class="px-4 rounded-xl dark-bg mr-2">100 км</span>
              <span class="px-4 rounded-xl dark-bg mr-2">40 км</span>
              <span class="px-4 rounded-xl dark-bg mr-2">2 км</span>
              <span class="px-4 rounded-xl dark-bg">1 км</span>
            </div>
            <div class="opacity-50 mt-4 mb-2">Велосипед</div>
            <div>
              <span class="px-4 rounded-xl dark-bg mr-2">МТБ</span>
              <span class="px-4 rounded-xl dark-bg">Roadbike</span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="select-none opacity-0">Подробнее</div>
            <div
              class="my-button px-8 py-2 rounded-3xl text-xl uppercase cursor-pointer"
            >
              Подробнее
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center text-center underline cursor-pointer mt-2"
      >
        <span class="mr-2 opacity-70 hover:opacity-100">Положение</span
        ><DocSvg />
      </div>
    </div>
    <div class="mb-12">
      <div class="font-bold text-gradient text-center mb-8 text-xl">Отчёты</div>
      <div>
        <div>
          <div>img</div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div
        class="text-center underline cursor-pointer opacity-70 hover:opacity-100"
        @click="toReports"
      >
        Показать больше
      </div>
    </div>
    <div class="mb-12">
      <div class="font-bold text-gradient text-center mb-8 text-xl">
        Партнёры
      </div>
      <div class="flex justify-around items-center">
        <img
          src="../assets/image-2.png"
          alt="Не удалось загрузить картинку :("
        />
        <img
          src="../assets/image-3.png"
          alt="Не удалось загрузить картинку :("
        />
        <img
          src="../assets/image-4.png"
          alt="Не удалось загрузить картинку :("
        />
        <img
          src="../assets/image-5.png"
          alt="Не удалось загрузить картинку :("
        />
      </div>
    </div>
    <div>
      <div
        class="font-bold text-gradient text-center mb-8 text-xl stroke-white"
      >
        FAQ
      </div>
      <AccordionList openMultipleItems>
        <AccordionItem>
          <template #summary>Стартовый номер остается участнику ?</template>
          <template #icon
            ><SimpleArrowSvg class="stroke-white" :size="20"
          /></template>
          <div>
            Стартовый № не в ходит в оплату изготовление на деньги стартового
            взноса. Он печатается на деньги бюджета соревнований.
            <br />

            Стартовый взнос оплачивает затраты (бейджек участника, наклейка для
            маркировки велосипеда, карта маршрута, программа, мешок для вещей,
            медицинское сопровождение, питание на дистанции, транспортировка
            велосипеда до места старта, питание и проживание волонтёров,
            организаторов).
            <br />

            Еcли мы будем дарить стартовый № то нам придётся поднимать стартовый
            взнос на 10%.
          </div>
        </AccordionItem>
        <AccordionItem>
          <template #summary>
            Как с обеспечением скорой медицинской помощи ?
          </template>
          <template #icon>
            <SimpleArrowSvg class="stroke-white" :size="20" />
          </template>
          <div>
            Медицинское сопровождения это первая задача которую мы решаем каждый
            год. Мы пишим письмо в мин. здрав РБ они согласовывают с ФК
            диспансером, к сожалению они больше напрягают чем помогают. (все
            участники должны пройти их медосмотр). Но мы тесно работаем с мин.
            здрав РБ они пишут приказ по районам для дежурств на дорогах
            населённых пунктах бригады скорой помощи. Также с нами в автобусе
            едет медицинский работник.
          </div>
        </AccordionItem>
        <AccordionItem>
          <template #summary>
            Как получить стартовый пакет на БВМ бесплатно ?
          </template>
          <template #icon>
            <SimpleArrowSvg class="stroke-white" :size="20" />
          </template>
          <div>
            Стать чемпионом «Золотой дистанции».
            <br />
            Все победители Байкальского Веломарафона на 260 км получают статус
            VIP.
            <br />
            Что это даёт? Бесплатное участие (пожизненно). Как в качестве
            спортсмена, так и болельщика!
          </div>
        </AccordionItem>
        <AccordionItem>
          <template #summary>
            Сколько будет пунктов питания и где они будут располагаться ?
          </template>
          <template #icon>
            <SimpleArrowSvg class="stroke-white" :size="20" />
          </template>
          <div>
            Расположение пункта питания/питья Отдалённость от г. Улан-Удэ (в
            км.)
            <br />
            начиная с 9км. л. «Огонёк»
            <br />
            1 Река Манжеевка 109 км.
            <br />
            2 Река Безымянная 179 км.
            <br />
            3 Площадка для отдыха водителей 212 км.
            <br />
            4 Финиш п. Усть-Баргузин ул. Ленина 24 колледж 260км.
          </div>
        </AccordionItem>
      </AccordionList>
    </div>
  </div>
</template>

<style>
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
  background-color: #242627;
  top: -20px;
  left: 186px;
}
.circle-ticket-bottom {
  width: 40px;
  height: 40px;
  background-color: #242627;
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