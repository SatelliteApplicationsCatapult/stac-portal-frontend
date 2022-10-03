// Planet extends Base

import Base from "./Base";

export default class Planet extends Base {
  constructor() {
    super();
    this._manifestFile = "manifest.json";
    this._manifestJSON = null;
    this._files = null;
  }

  async parseManifest() {
    // Get the files array
    const files = this._manifestJSON.files;

    // Get the file paths
    const filePaths = files.map((file) => file.path);

    // Get the file names
    const fileNames = filePaths.map((filePath) => {
      const splitPath = filePath.split("/");
      return splitPath[splitPath.length - 1];
    });

    this._filesToDownload = fileNames.map((fileName, index) => {
      const file = this._files.find((file) => file.file.name === fileName);
      file.file.item = files[index].annotations["planet/item_id"];
      
      return {
        file: file.file,
        path: filePaths[index],
      };
    });
  }
}
