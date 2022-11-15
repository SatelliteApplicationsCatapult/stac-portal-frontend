import Planet from "./sources/Planet";
import Maxar from "./sources/Maxar";

export const findProvider = async (
  stagedItems,
  setStagedItems,
  toDownload,
  setToDownload
) => {
  if (stagedItems.length === 0) {
    return;
  }

  const providers = [new Maxar(), new Planet()];

  for (let i = 0; i < providers.length; i += 1) {
    providers[i]._files = stagedItems;
    await providers[i].runChecks();
    if (providers[i]._filesToDownload) {
      console.log("filesToDownload", providers[i]._filesToDownload);
      setToDownload([...toDownload, ...providers[i]._filesToDownload]);

      setStagedItems((items) => {
        return items.filter((item) => {
          const files = !providers[i]._filesToDownload
            .map((file) => file.file.name)
            .includes(item.file.name);

          return files;
        });
      });

      console.log("To download", toDownload);

      return;
    }
  }
};

export const returnAdditionalMeta = async (files, key) => {
  const providers = [new Maxar(), new Planet()];
  for (let i = 0; i < providers.length; i += 1) {
    const meta = await providers[i].additionalMeta(files, key);
    if (meta && meta.message) {
      return meta.message;
    }
  }
};
