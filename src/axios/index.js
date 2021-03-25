import axios from "axios";

let userData = localStorage.getItem("userData");
let userToken;
if (userData !== null) {
  userToken = JSON.parse(userData).token;
}
const ax = axios.create({
  baseURL: "http://localhost/project/mostak/api/",
  headers: { Authorization: "Bearer " + userToken }
});
ax.defaults.timeout = 10000;

export default ax;
