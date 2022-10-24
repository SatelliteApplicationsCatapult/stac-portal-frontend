import axios from "axios";

export const retrieveAllPublicCatalogs = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};

export const syncAllPublicCatalogs = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/sync/`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};
