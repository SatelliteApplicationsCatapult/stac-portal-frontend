import Base from "./Base";

export default class PlanetGenerator extends Base {
  constructor() {
    super();
    this._manifestFile = "manifest.json";
    this._manifestJSON = null;
    this._additionalMeta = null;
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

  // TODO: This is a hack to get the metadata.json file
  async additionalMeta(files) {
    const metadataFiles = files.filter((file) =>
      file.name.endsWith("metadata.json")
    );

    if (metadataFiles.length === 0) {
      return;
    }

    const downloadLink = this._generateDownloadLink(metadataFiles[0]);
    const response = await fetch(downloadLink);
    this._additionalMeta = await response.json();

    return this._parseAdditionalMeta();
  }

  // TODO: Maybe only use ones we need? For now, just use all of them
  _parseAdditionalMeta() {
    return this._additionalMeta;
  }
}
