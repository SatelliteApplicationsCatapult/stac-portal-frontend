export const retrieveAllCollections = async () => {
  // backend url
  const url = `${process.env.REACT_APP_BACKEND_URL}/collections`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
