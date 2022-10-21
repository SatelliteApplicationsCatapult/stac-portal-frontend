// import auth from src/auth
import format from "date-fns/format";
import axios from "axios";

export const retrieveAllCollections = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/stac/`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};

export const retrieveAllPublicCollections = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/collections/`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};

export const retrieveAllPrivateCollections = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/private_catalog/collections/`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};

export const deletePublicCollection = async (
  publicCatalogId,
  publicCollectionId
) => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/${publicCatalogId}/collections/${publicCollectionId}/`;
  const response = await axios({ method: "DELETE", url: url });
  const data = await response.data;
  return data;
};

export const deletePrivateCollection = async (privateCollectionId) => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/private_catalog/collections/${privateCollectionId}/`;
  const response = await axios({ method: "DELETE", url: url });
  const data = await response.data;
  return data;
}

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

  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/${parentCatalogId}/items/get/`;
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
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/`;
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
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/public_catalogs/run_search_parameters/${storedSearchParamId}/`;
  const response = await axios({ method: "GET", url: url });
  const data = await response.data;
  return data;
};

export const createNewCollection = async (collection) => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/private_catalog/collections/`;

  const collection_json = {
    type: "Collection",
    stac_version: "1.0.0",
    id: collection.id,
    description: collection.description,
    title: collection.id,
    license: "proprietary",
    extent: {
      spatial: {
        bbox: [[-180, -90, 180, 90]],
      },
      temporal: {
        interval: [["2020-01-01T00:00:00Z", "2022-12-31T23:59:59Z"]],
      },
    },
  };
  const response = await axios({
    method: "POST",
    url: url,
    data: collection_json,
  });
  const data = await response.data;
  return data;
};

export const addItemsToCollection = async (collection, items) => {
  // POST /private_catalog/collections/{collection_id}/items/
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/private_catalog/collections/${collection.id}/items/`;

  // Loop through items object
  Object.keys(items).forEach(async (key) => {
    // Get the item
    const item = items[key];

    const response = await axios({
      method: "POST",
      url: url,
      data: item.json,
    });
  });

  return true;
};
