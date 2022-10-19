import axios from "axios";

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
      // if time to expiry is less than 5 minutes, refresh the token
      if (timeToExpiry < 300000) {
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
      return config;
    } catch (error) {
      console.info("Auth details don't exist, probably localhosting the app");
      return config;
    }
  });
};

async function getAADToken(){
  try {
    const uninterceptedAxiosInstance = axios.create();
    let resp1 = await uninterceptedAxiosInstance.get("/.auth/me");
    let ad = resp1.data[0];
    let tokenExpiryString = ad.expires_on;
    let tokenExpiryDateTime = new Date(tokenExpiryString);
    let now = new Date();
    let timeToExpiry = tokenExpiryDateTime - now;
    // if time to expiry is less than 5 minutes, refresh the token
    if (timeToExpiry < 300000) {
      try {
      await uninterceptedAxiosInstance.get("/.auth/refresh");
      } catch (err) {
        return null;
      }
      let resp2 = await uninterceptedAxiosInstance.get("/.auth/me");
      ad = resp2.data[0];
    }
    let id_token = ad.id_token;
    return id_token;
  } catch (error) {
    console.info("Auth details don't exist, probably localhosting the app");
    return null;
  }
}

export { auth, getAADToken };