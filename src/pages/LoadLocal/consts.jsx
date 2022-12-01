const providers = {
  "DeliveryMetadata.xml": "Maxar",
};

export const metadataFileNames = Object.keys(providers);

export const manifestToProvider = (manifestName) => {
  const provider = providers[manifestName];
  if (!provider) {
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
