import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//iconfont引入
import "@/assets/css/icon.css";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
