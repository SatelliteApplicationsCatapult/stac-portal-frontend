// import auth from src/auth
import format from 'date-fns/format';
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

  console.log("endDate", endDate);
  console.log("parentCatalogId", parentCatalogId);
  console.log("collectionId", collectionId);
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
