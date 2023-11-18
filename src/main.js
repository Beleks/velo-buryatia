import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "@/router.js";
import axios from "axios";
import { useAccordion } from "vue3-rich-accordion";
// import "vue3-rich-accordion/accordion-library-styles.css";
//
import "../src/assets/accordion-styles.css";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(useAccordion);
app.mount("#app");
