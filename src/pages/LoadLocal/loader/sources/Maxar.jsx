import Base from "./Base";
import axios from "axios";

export default class MaxarGenerator extends Base {
  constructor() {
    super();
    this._manifestFile = "DeliveryMetadata.xml";
    this._manifestJSON = null;
    this._additionalMeta = null;
    this._itemID = null;
  }

  async parseManifest() {
    // Get the files array
    const files = this._manifestJSON.getElementsByTagName("productFile");

    this.findItemID();

    // Get all tags of filename
    const filePaths = Array.from(files).map(
      (file) => file.getElementsByTagName("filename")[0].innerHTML
    );

    this._filesToDownload = filePaths.map((filePath) => {
      const file = this._files.find((file) => file.file.name === filePath);
      file.file.item = this._itemID;

      return {
        file: file.file,
        path: filePath,
      };
    });

  }

  async additionalMeta(files) {
    const metadataFiles = files.filter((file) =>
      file.name.endsWith("README.XML")
    );

    if (metadataFiles.length === 0) {
      return;
    }

    const downloadLink = this._generateDownloadLink(metadataFiles[0]);
    const response = await axios.get(downloadLink);

    const secondDownloadLink = this._generateDownloadLink({
      name: this._manifestFile,
    });
    const secondResponse = await axios.get(secondDownloadLink);

    this._additionalMeta = await response.data;

    // Also add second response to additional meta
    this._additionalMeta.message.delivery = await secondResponse.data;

    return this._parseAdditionalMeta();
  }

  // TODO: Maybe only use ones we need? For now, just use all of them
  _parseAdditionalMeta() {
    return this._additionalMeta;
  }

  findItemID() {
    // Go through the files
    const files = this._manifestJSON.getElementsByTagName("productFile");

    // Get the first file
    const firstFile = files[0];

    // Get the relative directry
    const relativeDirectory =
      firstFile.getElementsByTagName("relativeDirectory")[0].innerHTML;

    // Get the item ID
    const itemID = relativeDirectory.split("/")[0];

    this._itemID = itemID;
  }
}
