import axios from "axios";

export const returnTiffMeta = async (fileName) => {
  let url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/gdal_info/`;
  fileName = process.env.REACT_APP_BLOB_URL + fileName;

  const response = await axios.post(
    url,
    {
      file_url: fileName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.data;
  return data;
};
