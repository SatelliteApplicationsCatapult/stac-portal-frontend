export class GenerateSTAC {
  constructor(metadata) {
    // Set metadata to a copy
    this.metadata = { ...metadata };
    this.staticVariables = {
      stac_version: "", // If not provided, defaults to latest
      stac_extensions: [], // If not provided, defaults to none
      id: "", // Item ID
      title: "", // Item title
      description: "", // Item description
      input_crs: "", //
      destination_crs: "",
      time_acquired: "",
    };
    this.groupedVariables = {
      proj_geom: [],
      wgs84_geom: [],
    };
    this.assets = [];
    this.additional = {};
    this.stacJSON = {};
  }

  async generate() {
    this.cleanMetadata();
    console.log("Generating STAC", this.metadata);
    console.log("Additional ::", this.additional);
    this.parseGroupedVariables();
    this.parseStaticVariables();
    this.parseAssets();
    this.parseAdditional();

    await this.sendToSTAC();

    return this.stacJSON;
  }

  parseGroupedVariables() {
    // Load grouped variables to work out stuff like bbox and time
    Object.keys(this.metadata).forEach((key) => {
      if (key === "additional") {
        return;
      }
      const { cornerCoordinates, wgs84Extent } = this.metadata[key];

      // Geometry
      const geom = cornerCoordinates;

      // Assign to grouped variables
      this.groupedVariables["proj_geom"].push(geom);
      this.groupedVariables["wgs84_geom"].push(wgs84Extent);
    });
  }

  parseStaticVariables() {
    Object.keys(this.metadata).forEach((key) => {
      const {
        bands,
        wgs84Extent,
        description,
        cornerCoordinates,
        coordinateSystem,
        ...rest
      } = this.metadata[key];

      if (key === "additional") {
        return;
      }

      // TODO: Move to additional
      const id = this.metadata.additional.id;
      const timeAcquired = this.metadata.additional.properties.acquired;

      const wkt = coordinateSystem.wkt;

      this.staticVariables["id"] = id;
      this.staticVariables["time_acquired"] = timeAcquired;
      this.staticVariables["wkt"] = wkt;
      this.staticVariables["url"] = description;
      this.staticVariables["provider"] = "Planet"; // TODO: Make this dynamic
    });
  }

  parseAssets() {
    Object.keys(this.metadata).forEach((key) => {
      console.log("Asset ::", key, this.metadata[key]);

      let asset = {};

      const {
        bands,
        description,
        geoTransform,
        size,
        driverLongName,
        ...rest
      } = this.metadata[key];

      if (key === "additional") {
        return;
      }

      asset["href"] = description;
      asset["transform"] = geoTransform;
      asset["shape"] = size;
      asset["type"] = driverLongName;
      asset["filename"] = key;

      // Convert bands to new format
      let eoBands = [];
      bands.forEach((band) => {
        eoBands.push({
          name: band.colorInterpretation,
          description: band.description,
          type: band.type,
          band: band.band,
          block: band.block,
        });
      });
      asset["bands"] = eoBands;

      // Add asset to assets array
      this.assets.push(asset);
    });
  }

  parseAdditional() {
    return;
  }

  generatePayload() {
    return {
      assets: this.assets,
      additional: this.additional,
      groupedVariables: this.groupedVariables,
      staticVariables: this.staticVariables,
    };
  }

  async sendToSTAC() {
    let url = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(url + "/stac_generator/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: this.generatePayload(),
      }),
    });
    const json = await response.json();
    // ensure its not a promise

    console.log("Success:", JSON.stringify(json));

    this.stacJSON = json;
  }

  cleanMetadata() {
    for (const key in this.metadata) {
      if (this.metadata[key].error) {
        delete this.metadata[key];
      }
    }

    if (this.metadata.additional) {
      this.additional = this.metadata.additional;
      // delete this.metadata.additional;
    }
  }
}
