import Planet from "./sources/Planet";

export const findProvider = async (
  stagedItems,
  setStagedItems,
  toDownload,
  setToDownload
) => {
  if (stagedItems.length === 0) {
    return;
  }

  const providers = [new Planet(stagedItems, setStagedItems)];

  for (let i = 0; i < providers.length; i += 1) {
    providers[i]._files = stagedItems;
    await providers[i].runChecks();
    if (providers[i]._filesToDownload) {
      setStagedItems((items) => {
        return items.filter((item) => {
          const files = !providers[i]._filesToDownload
            .map((file) => file.file.name)
            .includes(item.file.name);

          return files;
        });
      });

      setToDownload([...toDownload, ...providers[i]._filesToDownload]);

      return;
    }
  }
};

export const returnAdditionalMeta = async (files) => {
  const providers = [new Planet()];
  for (let i = 0; i < providers.length; i += 1) {
    const meta = await providers[i].additionalMeta(files);
    if (meta && meta.message) {
      return meta.message;
    }
  }
};
