import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios/index";
import { BToast } from "bootstrap-vue";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: null,
    test: "data pass",
    header: {
      title: "Note Management System"
    },
    footer: {
      items: [
        {
          name: "Home",
          output: "Home"
        },
        {
          name: "categoryCreate",
          output: "Add Category"
        }
      ]
    }
  },
  mutations: {
    saveUserData(state, payload) {
      state.userData = payload;
    }
  },
  actions: {
    RETRIEVE_TOKEN: () => {
      let userData = localStorage.getItem("userDataNote");
      let userToken;
      if (userData !== null) {
        userToken = JSON.parse(userData).token;
      }
      return userToken;
    },

    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/userLogin.php", payload)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              if (res.data.status) {
                console.log("got res");
                let userDataString = JSON.stringify(res.data.token);
                let pureToken = userDataString.slice(1, -1);
                localStorage.setItem("userDataNote", pureToken);
                commit("saveUserData", res.data);
                resolve(true);
              } else {
                reject(res.data.message);
              }
            } else {
              reject("Rejected" + res.status);
            }
          })
          .catch(e => {
            console.log(e);
            reject(e);
          });
      });
    },
    LOGOUT: () => {
      return new Promise((resolve, reject) => {
        resolve(true);
        localStorage.removeItem("userDataNote");
        let statusOf = localStorage.getItem("userDataNote");
        if (statusOf.length !== 0) {
          reject(false);
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    ALERT: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(payload.message, {
          title: payload.title,
          autoHideDelay: 4000,
          variant: payload.variant,
          appendToast: payload.append || false
        });
        let voice = new SpeechSynthesisUtterance(payload.message);
        window.speechSynthesis.speak(voice);
        resolve(true);
        if (payload.length === 0) {
          reject("Data empty");
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    YEAR_NAME: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .get("file_year.php?id=" + payload.year + "&year_name")
          .then(res => {
            resolve(res.data.data.fy_name);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    CLIENT: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/client.php?client_id=" + payload.id + "&view_client_small")
          .then(res => {
            let clientTable = res.data.data;
            let returnData = {
              id: clientTable.id,
              profession:
                clientTable.profession === 1
                  ? "Government"
                  : "Salaried-Private",
              professionId: clientTable.profession,
              name: clientTable.name,
              tin_number: clientTable.tin_number
            };
            resolve(returnData);
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  },
  modules: {}
});
