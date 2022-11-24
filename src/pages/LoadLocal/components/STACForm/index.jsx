import { useEffect, useState } from "react";
import { Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { returnTiffMeta } from "interface/gdal";
import { returnAdditionalMeta } from "pages/LoadLocal/loader/utils";
import Items from "./components/Items";
import STACJSON from "./components/STACJSON";

const STACForm = ({
  groupedFiles,
  groupedDownloads,
  itemsMeta,
  setItemsMeta,
  files,
  uploads,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMeta, setSelectedMeta] = useState(null);

  const [loadingGDAL, setLoadingGDAL] = useState([]);
  const [loadedGDAL, setLoadedGDAL] = useState([]);
  const [groupedLoadedGDAL, setGroupedLoadedGDAL] = useState({});

  const [alreadyLoadedAdditionalMeta, setAlreadyLoadedAdditionalMeta] =
    useState([]);

  useEffect(() => {
    if (groupedFiles) {
      Object.keys(groupedFiles).forEach(async (key) => {
        await groupedFiles[key].forEach(async (file) => {
          if (
            !loadingGDAL.includes(file.name) &&
            !loadedGDAL.includes(file.name)
            // !isItemStillBeingDownloaded(file.name)
          ) {
            setLoadingGDAL((prev) => [...prev, file.name]);

            const fileExtension = file.name.split(".").pop().toLowerCase();
            const allowedExtensions = ["tif", "tiff", "png", "jpg", "jpeg"];

            if (allowedExtensions.includes(fileExtension)) {
              console.log("Loading GDAL for", file);
              const filename = file.itemId + "_" + file.name;
              const tiffMeta = await returnTiffMeta(filename);
              setItemsMeta((prev) => ({
                ...prev,
                [file.itemId]: {
                  ...prev[file.itemId],
                  [file.name]: tiffMeta,
                },
              }));
            } else {
              // Add the other files to the itemsMeta
              groupedFiles[key].forEach((file) => {
                // Push to a key called "otherAssets" array to the itemsMeta if it doesn't exist
                if (!itemsMeta[file.itemId]) {
                  itemsMeta[file.itemId] = {
                    otherAssets: [],
                  };
                }
                if (!itemsMeta[file.itemId].otherAssets) {
                  itemsMeta[file.itemId].otherAssets = [];
                }
                const fileMeta = {
                  name: file.itemId + "_" + file.name,
                  size: file.size,
                  type: file.type,
                };
                // Push the file to the otherAssets array if it doesn't exist
                if (
                  !itemsMeta[file.itemId].otherAssets.find(
                    (asset) => asset.name === file.name
                  )
                ) {
                  itemsMeta[file.itemId].otherAssets.push(fileMeta);
                }

                // Set the itemsMeta
                setItemsMeta((prev) => ({
                  ...prev,
                  [file.itemId]: {
                    ...prev[file.itemId],
                    otherAssets: itemsMeta[file.itemId].otherAssets,
                  },
                }));
              });
            }

            setLoadedGDAL((prev) => [...prev, file.name]);
            setGroupedLoadedGDAL((prev) => ({
              ...prev,
              [file.itemId]: [...(prev[file.itemId] || []), file.name],
            }));

            setLoadingGDAL((prev) => prev.filter((item) => item !== file.name));
          }
        });

        if (!alreadyLoadedAdditionalMeta.includes(key)) {
          const additionalMeta = await returnAdditionalMeta(
            groupedFiles[key],
            key
          );
          if (additionalMeta) {
            setAlreadyLoadedAdditionalMeta((prev) => [...prev, key]);
            setItemsMeta((prev) => ({
              ...prev,
              [key]: {
                ...prev[key],
                additional: additionalMeta,
              },
            }));
          }
        }
      });
    }
  }, [groupedFiles]);

  const checkIfItemIsBeingLoaded = (item) => {
    if (groupedDownloads[item] && groupedLoadedGDAL[item]) {
      // If groupedfiles and groupedDownloads are the same length, then we are done loading
      if (groupedFiles[item].length !== groupedDownloads[item].length) {
        return true;
      }

      // Check that these two have the same amount of tiffs
      const groupedLoadedGDALTiffCount = groupedLoadedGDAL[item].filter(
        (file) =>
          file.endsWith(".tif") ||
          file.endsWith(".tiff") ||
          file.endsWith(".TIF") ||
          file.endsWith(".TIFF")
      ).length;

      // Grouped loaded GDAL tiff count
      const groupedDownloadsTiffCount = groupedDownloads[item].filter(
        (file) =>
          file.path.endsWith(".tif") ||
          file.path.endsWith(".tiff") ||
          file.path.endsWith(".TIF") ||
          file.path.endsWith(".TIFF")
      ).length;

      if (groupedDownloadsTiffCount === groupedLoadedGDALTiffCount) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (selectedItem) {
      setSelectedMeta(itemsMeta[selectedItem]);
    }
  }, [selectedItem, itemsMeta]);

  // If no selected item, select the first one
  useEffect(() => {
    if (!selectedItem) {
      if (Object.keys(itemsMeta).length > 0) {
        setSelectedItem(Object.keys(itemsMeta)[0]);
      }
    }
  }, [itemsMeta]);

  return (
    <MDBox
      style={{
        display: "flex",
        border: "1px solid #e0e0e0",
      }}
    >
      <MDBox
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          minWidth: "300px",
          borderRight: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {/* Header */}
        <MDBox
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <MDTypography variant="h6" >
            Items
          </MDTypography>
        </MDBox>
        {groupedFiles &&
          Object.keys(groupedFiles).map((key) => {
            return (
              <MDBox
                key={key}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedItem === key
                      ? "rgba(0, 0, 0, 0.04)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },

                  "&:hover h6": {
                    color: "rgb(17,159,154)",
                  },
                  "&:hover p": {
                    color: "rgb(17,159,154)",
                  },
                }}
                style={{
                  padding: "2em",
                  borderBottom: "1px solid #e0e0e0",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "100%",
                  flexWrap: "wrap",
                  cursor: "pointer",
                  backgroundColor:
                    selectedItem === key
                      ? "rgba(0, 0, 0, 0.04)"
                      : "transparent",
                }}
                onClick={() => setSelectedItem(key)}
              >
                <MDTypography
                  variant="h6"
                  sx={{
                    color: selectedItem === key ? "rgb(17,159,154)" : "black",
                  }}
                >
                  {key}
                </MDTypography>
                <MDBox
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MDTypography variant="body2" mr={1}>
                    {/* Check if item is being loaded */}
                    {checkIfItemIsBeingLoaded(key) ? (
                      <Icon
                        sx={{
                          color: "rgb(17,159,154)",
                          animation: "spin 1s linear infinite",
                        }}
                      >
                        loop
                      </Icon>
                    ) : (
                      // Show amount of files
                      <MDTypography variant="body2" mr={1}>
                        {groupedFiles[key].length} Items
                      </MDTypography>
                    )}
                  </MDTypography>
                </MDBox>
              </MDBox>
            );
          })}
      </MDBox>
      <MDBox
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          minWidth: "300px",
        }}
      >
        {/* Header  */}
        <MDBox
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <MDTypography variant="h6" >
            Data
          </MDTypography>
        </MDBox>
        {/* Generated Item Form */}
        <MDBox
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "2em",
          }}
        >
          {selectedItem ? (
            // If the selected item does not exist in the loadingGDAL array, show the form else show a spinner
            !checkIfItemIsBeingLoaded(selectedItem) ? (
              <MDBox
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <MDBox>
                  <Items
                    selectedMeta={selectedMeta}
                    items={groupedFiles && groupedFiles[selectedItem]}
                  />
                </MDBox>

                <MDBox>
                  {/* Header  */}
                  <MDBox
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "2em",
                      border: "1px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    {/* Raw STAC JSON */}
                    <MDBox
                      style={{
                        width: "100%",
                      }}
                    >
                      {selectedItem &&
                      !checkIfItemIsBeingLoaded(selectedItem) ? (
                        <STACJSON
                          itemsMeta={itemsMeta}
                          setItemsMeta={setItemsMeta}
                          selectedItem={selectedItem}
                        />
                      ) : (
                        <MDBox
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            padding: "2em",
                            border: "1px solid #e0e0e0",
                            marginBottom: "10px",

                          }}
                        >
                          <MDTypography variant="h6" >
                            Loading...
                          </MDTypography>
                        </MDBox>
                      )}
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            ) : (
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                p={2}
                marginBottom="10px"
              >
                <MDTypography variant="h6" >
                  Generating STAC Metadata for {selectedItem}
                </MDTypography>
              </MDBox>
            )
          ) : (
            <MDBox
              display="flex"
              flexDirection="column"
              p={2}
              marginBottom="10px"
            >
              <MDTypography variant="h6" ></MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default STACForm;
