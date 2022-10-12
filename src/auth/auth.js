import axios from "axios";
console.log("intercept module loaded");
async function auth() {
  axios.interceptors.request.use(async(config) => {
    try {
      const uninterceptedAxiosInstance = axios.create();
      let resp1 = await uninterceptedAxiosInstance.get("/.auth/me");
      let ad = resp1.data[0];
      let tokenExpiryString = ad.expires_on;
      let tokenExpiryDateTime = new Date(tokenExpiryString);
      let now = new Date();
      let timeToExpiry = tokenExpiryDateTime - now;
      console.log("time to expiry: " + timeToExpiry);
      // if time to expiry is less than 5 minutes, refresh the token
      if (timeToExpiry < 300000) {
        console.log("refreshing token");
        try {
        await uninterceptedAxiosInstance.get("/.auth/refresh");
        } catch (err) {
          return config;
        }
        let resp2 = await uninterceptedAxiosInstance.get("/.auth/me");
        ad = resp2.data[0];
      }

      let id_token = ad.id_token;
      config.headers.Authorization = `Bearer ${id_token}`;
      console.log("token added to request");
      return config;
    } catch (error) {
      console.log("Auth details don't exist, probably localhosting the app");
      return config;
    }
  });
};

export default auth;
