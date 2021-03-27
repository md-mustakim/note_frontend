import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.config.productionTip = false;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

library.add(faSave);

Vue.component("font-awesome-icon", FontAwesomeIcon);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
