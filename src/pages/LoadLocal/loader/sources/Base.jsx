// Base Class for checking staged files to find and parse the relevant files to download
// This is the base class that will be extended by the other sources

export default class Base {
  constructor() {
    this._files = null;
    this._manifestFile = null;
    this._manifestJSON = null;
    this._filesToDownload = null;
  }

  // Check if the matching manifest file is present
  async checkForManifest() {
    const manifest = this._files.find(
      (file) => file.file.name === this._manifestFile
    );

    if (!manifest) {
      console.log("No manifest file found");
      return;
    }

    const reader = new FileReader();
    reader.readAsText(manifest.file);
    const manifestData = await new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });

    // If its a JSON file, parse it
    if (manifest.file.name.endsWith(".json")) {
      this._manifestJSON = JSON.parse(manifestData);
    }

    // If its an XML file, parse it
    if (manifest.file.name.endsWith(".xml")) {
      const parser = new DOMParser();
      this._manifestJSON = parser.parseFromString(manifestData, "text/xml");
    }

    console.log("Manifest data is", manifestData);

    console.log("Manifest JSON", this._manifestJSON);

    await this.parseManifest();

  }

  // Parse the manifest file
  async parseManifest() {
    return false;
  }

  // Automatically run checks when the class is instantiated
  async runChecks() {
    await this.checkForManifest();
  }

  async additionalMeta(files) {
    return false;
  }

  _generateDownloadLink(item, key) {
    const BASE_URL = process.env.REACT_APP_PORTAL_BACKEND_URL;
    const endpoint = "/file/stac_assets/";
    const url = `${BASE_URL}${endpoint}${key}_${item.name}/url/`;
    return url;
  }
}
