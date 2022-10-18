// import auth from src/auth
import format from "date-fns/format";
import axios from "axios";

export const retrieveAllCollections = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/stac`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};

export const callSelectiveIngester = async (
  parentCatalogId,
  collectionId,
  aoi,
  startDate,
  endDate
) => {
  // alert("Download");
  let startDateString = "..";
  if (startDate) {
    const startDateDateTime = new Date(startDate);
    startDateString = format(startDateDateTime, "yyyy-MM-dd");
    startDateString = startDateString + "T00:00:00Z";
    // TODO: upgrade date picker to datetime picker and use it here
  }
  let endDateString = "..";
  if (endDate) {
    const endDateDateTime = new Date(endDate);
    endDateString = format(endDateDateTime, "yyyy-MM-dd");
    endDateString = endDateString + "T00:00:00Z";
    // TODO: upgrade date picker to datetime picker and use it here
  }

  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/${parentCatalogId}/items/get`;
  const req_body = {
    update: true,
    bbox: aoi,
    datetime: `${startDateString}/${endDateString}`,
    collections: [collectionId],
  };
  // make axios post request to get the items
  axios.post(url, req_body).then((res) => {
    return res.data;
  });
};

export const getAllStoredSearchParameters = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  let storedSearchParameters = [];
  data.forEach((catalog) => {
    catalog.stored_search_parameters.forEach((parameter) => {
      parameter.parentCatalogName = catalog.name;
      let bbox = parameter.bbox;
      let newBbox = [
        bbox[0].toFixed(3),
        bbox[1].toFixed(3),
        bbox[2].toFixed(3),
        bbox[3].toFixed(3),
      ];
      parameter.bbox = newBbox;
      storedSearchParameters.push(parameter);
    });
  });
  return storedSearchParameters;
};

export const runStoredSearchParamUpdate = async (storedSearchParamId) => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/run_search_parameters/${storedSearchParamId}`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};

export const createNewCollection = async (collectionName) => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs`;
  const req_body = {
    name: collectionName,
  };
  const response = await axios({
    method: "POST",
    url: url,
    data: req_body,
  });
  const data = await response.data;
  return data;
};
