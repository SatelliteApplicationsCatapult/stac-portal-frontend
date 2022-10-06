export const generateSTAC = async (metadata) => {
  // Clean metadata
  metadata = cleanMetadata(metadata);

  console.log("Metadata", metadata);

  // Assets
  let assets = [];

  // Grouped variables
  let groupedVariables = {
    geom: [],
    coordinateSystemWkt: [],
    crs: [],
  };

  // Load grouped variables to work out stuff like bbox and time
  Object.keys(metadata).forEach((key) => {
    const {
      bands,
      wgs84Extent,
      description,
      cornerCoordinates,
      coordinateSystem,
      ...rest
    } = metadata[key];

    // Geometry
    const geom = cornerCoordinates;
    const coordinateSystemWkt = coordinateSystem.wkt;

    // Assign to grouped variables
    groupedVariables["geom"].push(geom);
    //groupedVariables["coordinateSystemWkt"].push(coordinateSystemWkt);

  });

  // Loop through metadata object and create assets
  Object.keys(metadata).forEach((key) => {
    let asset = {};

    const { bands, description, geoTransform, size, driverLongName, ...rest } =
      metadata[key];

    asset["href"] = description;
    asset["transform"] = geoTransform;
    asset["shape"] = size;
    asset["type"] = driverLongName;

    // Convert bands to new format
    let eoBands = [];
    bands.forEach((band) => {
      eoBands.push({
        name: band.colorInterpretation,
        description: band.description,
      });
    });
    asset["bands"] = eoBands;

    // Add asset to assets array
    assets.push(asset);
  });

  // POST request
  const response = await fetch("http://localhost:5000/stac_generator/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      metadata: {
        assets: assets,
        ...groupedVariables,
      },
    }),
  });

  console.log("Response", response);
  return "lol";
};

const cleanMetadata = (metadata) => {
  // Loop through metadata object and remove if error key is present
  for (const key in metadata) {
    if (metadata[key].error) {
      delete metadata[key];
    }
  }
  return metadata;
};
