import axios from "axios";

console.log("intercept module loaded");
const auth = () => {
  axios.interceptors.request.use((config) => {
    console.log("intercepted request");
    return config;
  });
};

export default auth;
