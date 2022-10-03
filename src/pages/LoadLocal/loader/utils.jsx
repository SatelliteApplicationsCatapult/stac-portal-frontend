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

  const providers = [new Planet()];

  for (let i = 0; i < providers.length; i += 1) {
    providers[i]._files = stagedItems;
    await providers[i].runChecks();
    if (providers[i]._filesToDownload) {
      // Remove the files that are already in the download queue
      setStagedItems((items) => {
        return items.filter(
          (item) =>
            !providers[i]._filesToDownload
              .map((file) => file.file.name)
              .includes(item.file.name)
        );
      });

      setToDownload([...toDownload, ...providers[i]._filesToDownload]);
      return;
    }
  }
};
