import Base from "./Base";
import axios from "axios";

export default class PlanetGenerator extends Base {
  constructor() {
    super();
    this._manifestFile = "manifest.json";
    this._manifestJSON = null;
    this._additionalMeta = null;
    this._itemID = null;

  }

  async parseManifest() {
    // Get the files array
    const files = this._manifestJSON.files;

    // Get the file paths
    const filePaths = files.map((file) => file.path);
    filePaths.unshift(this._manifestFile);

    // Get the file names
    const fileNames = filePaths.map((filePath) => {
      const splitPath = filePath.split("/");
      return splitPath[splitPath.length - 1];
    });

    this.findItemID();

    this._filesToDownload = fileNames.map((fileName, index) => {
      const file = this._files.find((file) => file.file.name === fileName);
      file.file.item = this._itemID;
      return {
        file: file.file,
        path: filePaths[index],
      };
    });
  }

  // TODO: This is a hack to get the metadata.json file
  async additionalMeta(files, key) {
    console.log("Key to planet is", key);
    const metadataFiles = files.filter((file) =>
      file.name.endsWith(key + "_metadata.json")
    );

    if (metadataFiles.length === 0) {
      return;
    }

    const downloadLink = this._generateDownloadLink(metadataFiles[0], key);
    const response = await axios.get(downloadLink);
    this._additionalMeta = await response.data;

    return this._parseAdditionalMeta();
  }

  // TODO: Maybe only use ones we need? For now, just use all of them
  _parseAdditionalMeta() {
    return this._additionalMeta;
  }

  findItemID() {
    let itemId = this._manifestJSON.files[0].annotations["planet/item_id"];
    this._itemID = itemId;
  }

}

