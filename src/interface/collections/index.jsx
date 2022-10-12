// import auth from src/auth

import axios from "axios";

export const retrieveAllCollections = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/stac/`;
  const response = await axios.get(url);
  const data = await response.data;
  return data;
};
