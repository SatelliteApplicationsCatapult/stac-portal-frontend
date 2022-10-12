export class Maxar {
  find(key, metadata) {
    if (key === "id") {
      try {
        console.log("Looking for ID", metadata);
      } catch (e) {
        return null;
      }
    }

    if (key === "time_acquired") {
      try {
        return this.metadata.additional.acquired;
      } catch (e) {
        return null;
      }
    }
  }
}
