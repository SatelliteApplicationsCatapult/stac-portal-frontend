import axios from "axios";

export const returnTiffMeta = async (fileName) => {
  let url = `${process.env.GDAL_INFO_API_ENDPOINT}/`;
  url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/gdal_info/`;

  fileName =
    "https://ctpltstacstrgdev.blob.core.windows.net/stac-items/" + fileName;

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
