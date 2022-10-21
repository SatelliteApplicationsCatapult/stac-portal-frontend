import axios from 'axios';

export const returnTiffMeta = async (fileName) => {
  // Ensure that file is an image TIF/png/jpeg etc. by converting to lowerase first
  const fileExtension = fileName.split(".").pop().toLowerCase();

  const allowedExtensions = ["tif", "tiff", "png", "jpg", "jpeg"];

  if (!allowedExtensions.includes(fileExtension)) {
    return null;
  }

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
