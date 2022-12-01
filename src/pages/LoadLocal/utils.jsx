// Modules
import axios from "axios";

// Types
import { FileProps } from "./LoadLocal";

// Functions
import { manifestToProvider, providerToManifest } from "./consts";

export const readManifest = async (file: FileProps) => {
  // Async function to read the manifest file
  file.provider = manifestToProvider(file.originalName);

  // Set the file as started
  file.started = true;

  // Read the file, this can be an XML or JSON file
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => {
      file.content = e.target.result;

      // If XML, parse the XML
      if (file.originalName.endsWith(".xml")) {
        const parser = new DOMParser();
        file.data = parser.parseFromString(file.content, "text/xml");
      }

      // If JSON, parse the JSON
      if (file.originalName.endsWith(".json")) {
        file.data = JSON.parse(file.content);
      }

      resolve();
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
  reader.readAsText(file.blob);
  return promise;
};

export const processManifest = (file: FileProps, files: []) => {
  let associatedFiles, itemID;

  console.log("Processing manifest", file.originalName, file.provider);

  if (file.provider === "Maxar") {
    // Read the manifest and group the associated files
    const products = file.data.getElementsByTagName("productFile");
    const filePaths = Array.from(products).map(
      (file) => file.getElementsByTagName("filename")[0].innerHTML
    );
    const relativeDirectory =
      products[0].getElementsByTagName("relativeDirectory")[0].innerHTML;
    itemID = relativeDirectory.split("/")[0];

    // Get the associated files and Item ID
    associatedFiles = files.filter(
      (file) =>
        filePaths.includes(file.originalName) &&
        !file.started &&
        !file.name &&
        file.path.includes(itemID)
    );
  }

  if (file.provider === "Planet") {
    const filePaths = file.data.files.map((file) => {
      let path = file.path;
      // Get the last index after slash
      const index = path.lastIndexOf("/");
      // Get the substring after the last slash
      path = path.substring(index + 1);
      return path;
    });

    // Get the associated files and Item ID
    associatedFiles = files.filter(
      (file) =>
        filePaths.includes(file.originalName) && !file.started && !file.name
    );
    itemID = file.data.files[0].annotations["planet/item_id"];
  }

  associatedFiles.forEach((associatedFile) => {
    associatedFile.itemID = itemID;
    associatedFile.started = true;
    associatedFile.name = itemID + "_" + associatedFile.originalName;
    associatedFile.provider = file.provider;
  });

  console.log("Associated files", associatedFiles);

  // Same for the metadata file
  file.name = itemID + "_" + file.originalName;
  file.itemID = itemID;
};

export const uploadFile = async (file: FileProps) => {
  const sasToken = await axios.get(
    `${process.env.REACT_APP_PORTAL_BACKEND_URL}/file/sas_token/${file.name}/`
  );

  const endpoint = sasToken.data.endpoint; // https://ctpltstacstrgdev.blob.core.windows.net/stac-items/017078208010_01_017078208010_01_STRIP_SHAPE.shp?se=2022-11-30T10%3A46%3A25Z&sp=w&sv=2021-08-06&sr=b&sig=syJ6r02zkNNP6wDWNhx8NaVONyOL/N6M6P2IkEqKrhs%3D

  // Upload the file
  const response = await axios.put(endpoint, file.blob, {
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "x-ms-blob-content-disposition": "attachment",
      "content-type": "any",
    },
  });

  return response;
};

export const processTiff = async (file: FileProps) => {
  console.log("Processing tiff", file.name);
  let url = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/gdal_info/`;
  const fileName = process.env.REACT_APP_BLOB_URL + file.name;

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

export const groupFilesByID = (files) => {
  return files.reduce((acc, file) => {
    if (file.itemID) {
      // Create object
      const obj = {
        itemID: file.itemID,
        count: 1,
        files: [file],
        complete: true,
        provider: file.provider,
      };

      // Check if itemID already exists in accumulator
      const index = acc.findIndex((item) => item.itemID === file.itemID);
      // If it does, increment count and error is not true
      if (index !== -1 && !acc[index].error) {
        acc[index].count += 1;
        acc[index].files.push(file);
        // If any file.completed is false, set completed to false
        if (!file.complete) {
          acc[index].complete = false;
        }
      }

      // If it doesn't, add it to the accumulator
      else {
        acc.push(obj);
      }
      return acc;
    } else {
      return acc;
    }
  }, []);
};

// TODO: Check this function out, it's not wrong, just a lot of folders do actually not have the same count
export const checkItemCount = (files) => {
  console.log("Checking item count");
  if (files.provider === "Maxar") {
    const manifestFile = providerToManifest(files.provider);
    // Open the manifest file
    const manifest = files.files.find(
      (file) => file.name === files.itemID + "_" + manifestFile
    );
    // Find the amount of <productFile> tags
    const products = manifest.data.getElementsByTagName("productFile");
    const count = products.length + 1; // Extra one for the manifest file itself
    console.log(
      `Count compared to manifest: ${files.count} vs ${count} for ${files.itemID}`
    );
    return count === files.count;
  }
};

const readFromFile = async (file) => {
  const reader = new FileReader();
  const fileBlob = file.blob;
  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => {
      const content = reader.result;
      resolve(content);
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
  reader.readAsText(fileBlob);
  const readmeContent = await promise;
  return readmeContent;
};

export const generateSTAC = async (item) => {
  console.log("Generating Stac for", item.itemID);
  // Gather all files that gdalInfo is not null
  const filesWithGdalInfo = item.files.filter((file) => file.GDALInfo !== null);

  console.log("Files with gdal info", filesWithGdalInfo);

  // Read the geoms from the Tiffs (can be multiple)
  const projGeoms = filesWithGdalInfo.map(
    (file) => file.GDALInfo.cornerCoordinates
  );
  const wgs84Geoms = filesWithGdalInfo.map((file) => file.GDALInfo.wgs84Extent);

  // URL
  const url = filesWithGdalInfo.find(
    (file) => file.GDALInfo.description !== null
  ).GDALInfo.description;

  // WKT
  const wkt = filesWithGdalInfo.find(
    (file) => file.GDALInfo.coordinateSystem.wkt !== null
  ).GDALInfo.coordinateSystem.wkt;

  // Assets
  const assets = filesWithGdalInfo.map((file) => {
    const asset = {
      href: file.GDALInfo.description,
      transform: file.GDALInfo.geoTransform,
      shape: file.GDALInfo.size,
      type: file.GDALInfo.driverLongName,
      filename: file.name,
      bands: file.GDALInfo.bands.map((band) => {
        return {
          name: band.colorInterpretation,
          description: band.description,
          type: band.type,
          band: band.band,
          block: band.block,
        };
      }),
    };
    return asset;
  });

  // All other assets except the Tiffs
  const otherAssets = item.files.filter((file) => file.GDALInfo === null);

  /**
   * We can read some files from frontend, without having to make a request to the backend
   * Dependent on provider
   */
  // Time Acquired
  let timeAcquired;
  let additional;

  console.log("Item Provider", item.provider);

  if (item.provider === "Maxar") {
    // Read the Delivery
    const metadataFileName = providerToManifest(item.provider);
    const metadataFile = item.files.find(
      (file) => file.name === item.itemID + "_" + metadataFileName
    );
    const metadata = await readFromFile(metadataFile);

    // Parse to XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(metadata, "text/xml");
    timeAcquired = xml.getElementsByTagName("earliestAcquisitionTime")[0]
      .textContent;

    console.log("Time acquired", timeAcquired);

    // Parse the Readme.xml
    const readmeXML = item.files.find((file) =>
      file.name.includes("README.XML")
    );
    const readmeXMLContent = await readFromFile(readmeXML);
    const readmeXMLData = parser.parseFromString(readmeXMLContent, "text/xml");

    let additionalData = {
      cloudCover:
        readmeXMLData.getElementsByTagName("CLOUDCOVER")[0]?.textContent,
      sunElevation: xml.getElementsByTagName("sunElevation")[0].textContent,
      sunAzimuth: xml.getElementsByTagName("sunAzimuth")[0].textContent,
      offNadirAngle: xml.getElementsByTagName("offNadirAngle")[0].textContent,
    };

    additional = additionalData;
  }

  if (item.provider === "Planet") {
    // Find file that ends with {itemID}_metadata.json
    const metadataFileName = item.itemID + "_metadata.json";
    const metadataFile = item.files.find((file) =>
      file.name.includes(metadataFileName)
    );

    // Read the file
    const metadata = await readFromFile(metadataFile);

    // Parse to JSON
    const metadataJSON = JSON.parse(metadata);

    console.log("Metadata JSON", metadataJSON);

    timeAcquired = metadataJSON.properties.acquired;

    // TODO: Come back here later
    let additionalData = {
      cloudCover: metadataJSON.properties.cloud_cover,
      sunElevation: metadataJSON.properties.sun_elevation,
      sunAzimuth: metadataJSON.properties.sun_azimuth,
      offNadirAngle: metadataJSON.properties.view_angle,
      gsd: metadataJSON.properties.gsd,
    };

    additional = additionalData;
  }

  const payload = {
    assets: assets,
    groupedVariables: {
      proj_geom: projGeoms,
      wgs84_geom: wgs84Geoms,
    },
    staticVariables: {
      id: item.itemID,
      url: url,
      wkt: wkt,
      time_acquired: timeAcquired,
      provider: item.provider,
    },

    otherAssets: otherAssets,
    additional: additional,
  };

  let backend_url = process.env.REACT_APP_PORTAL_BACKEND_URL;
  let body = {
    metadata: payload,
  };
  const response = await axios.post(
    backend_url + "/stac_generator/",

    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.data;

  return json;
};
