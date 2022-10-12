export class Planet {
  find(key, metadata) {
    if (key === "id") {
      try {
        return metadata.additional.id;
      } catch (e) {
        return null;
      }
    }

    if (key === "time_acquired") {
      try {
        return metadata.additional.acquired;
      } catch (e) {
        return null;
      }
    }
  }
}
