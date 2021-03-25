import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4C6dI8f5a73LUCHFFqP62gIo9dkmLpVE",
  authDomain: "note-app-52d6e.firebaseapp.com",
  projectId: "note-app-52d6e",
  storageBucket: "note-app-52d6e.appspot.com",
  messagingSenderId: "437124447637",
  appId: "1:437124447637:web:0e840f94a56d7cf4d68a9c",
  measurementId: "G-RTG3H0D2FP"
};
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
