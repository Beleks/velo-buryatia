import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "@/router.js";
import { useAccordion } from "vue3-rich-accordion";
// import "vue3-rich-accordion/accordion-library-styles.css";
//
import "../src/assets/accordion-styles.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(useAccordion);
app.mount("#app");
