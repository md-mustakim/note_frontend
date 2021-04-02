import axios from "axios";
import router from "@/router";
let userData = localStorage.getItem("userDataNote");

const ax = axios.create({
  //baseURL: "https://api.holycareschool.com/api/",
  baseURL: "http://localhost/project/mostak/api/",
  headers: { Authorization: "Bearer " + userData }
});
ax.defaults.timeout = 10000;

ax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error) {
      console.warn("network error");
    }
    if (!error.response) {
      // network error
      router
        .push({
          name: "NoInternet"
        })
        .then(r => console.log("res" + r));
    }
    if (error.response.status === 401) {
      router
        .push({
          name: "Login"
        })
        .then(r => console.log("this res is" + r));
    }
    return Promise.reject(error);
  }
);

export default ax;
