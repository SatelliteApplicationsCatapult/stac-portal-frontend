export const retrieveAllCollections = async () => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/collections`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.data) return data.data;
  return null;
};