import axios from "axios";

const getAADToken = async () => {
  try {
    const instance = axios.create();

    // Get the Azure AD data from /.auth/me but dont crash if 404
    const response = await instance.get("/.auth/me", {
      validateStatus: (status) => status === 200 || status === 404,
    });

    // Check if the response is valid
    if (response.status === 200) {
      const { expires_on } = response.data[0];

      // If token expires in 5 minutes, get a new one
      if (expires_on - Date.now() / 1000 < 300) {
        await instance.get("/.auth/refresh");
      }

      const newTokenResponse = await instance.get("/.auth/me");
      const { id_token } = newTokenResponse.data[0];
      return id_token;
    }

    // Implies we are localhost
    if (response.status === 404) {
      return null;
    }
  } catch (e) {
    console.log("Error fetching AAD token:", e);
  }

  window.location.href = "/.auth/login/aad";
  return null;
};

const auth = async () => {
  axios.interceptors.request.use(async (config) => {
    const token = await getAADToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export { getAADToken, auth };
