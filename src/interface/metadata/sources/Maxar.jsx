export class Maxar {
  constructor() {
    this.name = "Maxar";
  }
  find(key, metadata) {
    if (key === "id") {
      try {
        return metadata.README.ORDERNO;
      } catch (e) {
        return null;
      }
    }

    if (key === "time_acquired") {
      try {
        return metadata.README.MEDIACREATIONDATE;
      } catch (e) {
        return null;
      }
    }

    if (key === "provider") {
      return "Planet";
    }
  }
}
