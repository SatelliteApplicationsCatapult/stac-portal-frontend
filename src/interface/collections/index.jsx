export const retrieveAllCollections = async () => {
  const url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/stac/`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
