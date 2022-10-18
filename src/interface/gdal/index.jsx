export const returnTiffMeta = async (fileName) => {
  // Ensure that file is an image TIF/png/jpeg etc. by converting to lowerase first
  const fileExtension = fileName.split(".").pop().toLowerCase();

  const allowedExtensions = ["tif", "tiff", "png", "jpg", "jpeg"];

  if (!allowedExtensions.includes(fileExtension)) {
    return null;
  }

  let url = `${process.env.GDAL_INFO_API_ENDPOINT}/`;
  url = "http://localhost:5000/gdal_info/";

  fileName =
    "https://ctpltstacstrgdev.blob.core.windows.net/stac-items/" + fileName;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file_url: fileName,
    }),
  });

  const data = await response.json();

  return data;
};
