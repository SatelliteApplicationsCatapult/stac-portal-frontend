import axios from "axios";

const getAADToken = async () => {
  try {
    console.log("getAADToken");
    // Create axios instance
    const instance = axios.create();

    console.log("Created");

    // Get the Azure AD data from /.auth/me but dont crash if 404
    const response = await instance.get("/.auth/me", {
      validateStatus: (status) => status === 200 || status === 404,
    });

    console.log("Response from /.auth/me", response);

    // Check if the response is valid
    if (response.status === 200) {
      const { expires_on } = response.data[0];

      // If token expires in 5 minutes, get a new one
      if (expires_on - Date.now() / 1000 < 300) {
        await instance.get("/.auth/refresh");
      }

      // Get the new token
      const newTokenResponse = await instance.get("/.auth/me");
      // Get the id_token
      const { id_token } = newTokenResponse.data[0];

      // Return the new token
      return id_token;
    }

    // If the response is not valid, then navigate to the login page
  } catch (e) {
    console.info("Auth details don't exist, probably localhosting the app");
  }

  window.location.href = "/.auth/login/aad";

  return null;
};

async function auth() {
  axios.interceptors.request.use(async (config) => {
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
}

export { getAADToken, auth };
