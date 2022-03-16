import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index"; //路由
import store from "./store/index"; //全局数据

import themes from "./themes/index"; //全局组件
import VueAxios from "vue-axios"; //包裹axios
import axios from "./axios/index"; //数据请求库

import "@varlet/ui/es/styles/elevation.css";

const app = createApp(App);

//通过循环按需引入ui组件
for (let i = 0; i < themes.length; i++) {
    app.use(themes[i]);
}

app.use(router).use(VueAxios, axios.init()).use(store).mount("#app");
