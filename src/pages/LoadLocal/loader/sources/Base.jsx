// Base Class for checking staged files to find and parse the relevant files to download
// This is the base class that will be extended by the other sources

export default class Base {
  constructor() {
    this._manifestFile = null;
    this._manifestJSON = null;
    this._files = null;
    this._filesToDownload = null;
  }

  // Check if the matching manifest file is present
  async checkForManifest() {
    const manifest = this._files.find(
      (file) => file.file.name === this._manifestFile
    );

    if (!manifest) {
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

    this._manifestJSON = JSON.parse(manifestData);
    await this.parseManifest();

    console.log('this._filesToDownload', this._filesToDownload);
  }

  // Parse the manifest file
  async parseManifest() {
    return false;
  }

  // Automatically run checks when the class is instantiated
  async runChecks() {
    await this.checkForManifest();
  }
}
