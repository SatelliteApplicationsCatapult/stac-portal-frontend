export class Planet {
  // set name
  constructor() {
    this.name = "Planet";
  }
  find(key, metadata) {
    if (key === "id") {
      try {
        return metadata.id;
      } catch (e) {
        return null;
      }
    }

    if (key === "time_acquired") {
      try {
        return metadata.properties.acquired;
      } catch (e) {
        return null;
      }
    }

    if (key === "provider") {
      return "Planet";
    }
  }
}
