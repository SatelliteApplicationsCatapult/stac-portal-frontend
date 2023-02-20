const providers = {
  "DeliveryMetadata.xml": "Maxar",
  "manifest.json": "Planet",
  "item.json": "Stac",
};

export const metadataFileNames = Object.keys(providers);

export const isMetadata = (filename) => {
  if (providers[filename]) {
    return true;
  }

  if (filename.endsWith(".json")) {
    return true;
  }

  return false;
}

export const manifestToProvider = (manifestName) => {
  const provider = providers[manifestName];
  if (!provider) {
    if (manifestName.endsWith(".json")) {
      return providers["item.json"];
    }
    throw new Error(`Unknown provider for manifest ${manifestName}`);
  }

  return provider;
};

export const providerToManifest = (provider) => {
  const manifestName = Object.keys(providers).find(
    (key) => providers[key] === provider
  );
  if (!manifestName) {
    throw new Error(`Unknown manifest for provider ${provider}`);
  }

  return manifestName;
};
