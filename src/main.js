import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

// 统一全局配置 axios 的 基础路径
axios.defaults.baseURL = "http://101.96.128.94:9999/mfresh/data/";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// 注册全局过滤器
import { date } from "./filters";
Vue.filter("date", date);

// 全局加载 swiper 模块
// npm i swiper@^5 vue-awesome-swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");