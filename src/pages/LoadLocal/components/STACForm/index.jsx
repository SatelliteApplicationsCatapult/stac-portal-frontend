import { useEffect, useState } from "react";
import { Button, FormLabel, Icon, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { returnTiffMeta } from "interface/gdal";
import { returnAdditionalMeta } from "pages/LoadLocal/loader/utils";
import Items from "./components/Items";
import STACJSON from "./components/STACJSON";

const STACForm = ({ uploads, groupedFiles, files, groupedDownloads, itemsMeta, setItemsMeta }) => {
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
        groupedFiles[key].forEach(async (file) => {
          if (
            !loadingGDAL.includes(file.name) &&
            !loadedGDAL.includes(file.name)
          ) {
            setLoadingGDAL((prev) => [...prev, file.name]);

            const tiffMeta = await returnTiffMeta(file.name);
            setItemsMeta((prev) => ({
              ...prev,
              [file.itemId]: {
                ...prev[file.itemId],
                [file.name]: tiffMeta,
              },
            }));

            setLoadedGDAL((prev) => [...prev, file.name]);
            setGroupedLoadedGDAL((prev) => ({
              ...prev,
              [file.itemId]: [...(prev[file.itemId] || []), file.name],
            }));

            setLoadingGDAL((prev) => prev.filter((item) => item !== file.name));
          }
        });

        if (!alreadyLoadedAdditionalMeta.includes(key)) {
          const additionalMeta = await returnAdditionalMeta(groupedFiles[key]);
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
    <MDBox display="flex" border="1px solid #e0e0e0">
      <MDBox
        display="flex"
        flexDirection="column"
        width="30%"
        minWidth="300px"
        borderRight="1px solid #e0e0e0"
        borderBottom="1px solid #e0e0e0"
      >
        {/* Header */}
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid #e0e0e0"
        >
          <MDTypography variant="h6" color="textSecondary">
            Items
          </MDTypography>
        </MDBox>
        {groupedFiles &&
          Object.keys(groupedFiles).map((key) => {
            return (
              <MDBox
                key={key}
                p={2}
                borderBottom="1px solid #e0e0e0"
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                width="100%"
                flexWrap="wrap"
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
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="body2" mr={1}>
                    {/* Check the loadingGDAL array, if it contains any of the files in the item, show a spinner */}
                    {groupedFiles[key].some((file) =>
                      loadingGDAL.includes(file.name)
                    ) ? (
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
      <MDBox display="flex" flexDirection="column" width="70%">
        {/* Header  */}
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid #e0e0e0"
        >
          <MDTypography variant="h6" color="textSecondary">
            Data
          </MDTypography>
        </MDBox>
        {/* Generated Item Form */}
        <MDBox display="flex" flexDirection="column" width="100%" p={4}>
          {selectedItem ? (
            // If the selected item does not exist in the loadingGDAL array, show the form else show a spinner
            !checkIfItemIsBeingLoaded(selectedItem) ? (
              <MDBox display="flex" flexDirection="column" width="100%">
                <MDBox>
                  <Items
                    selectedMeta={selectedMeta}
                    items={groupedFiles && groupedFiles[selectedItem]}
                  />
                </MDBox>

                <MDBox>
                  {/* Header  */}
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="column"
                    p={2}
                    border="1px solid #e0e0e0"
                    marginBottom="10px"
                  >
                    {/* Raw STAC JSON */}
                    <MDBox width="100%">
                      {selectedItem &&
                      !checkIfItemIsBeingLoaded(selectedItem) ? (
                        <STACJSON
                          itemsMeta={itemsMeta}
                          setItemsMeta={setItemsMeta}
                          selectedItem={selectedItem}
                        />
                      ) : (
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          p={2}
                          border="1px solid #e0e0e0"
                          marginBottom="10px"
                        >
                          <MDTypography variant="h6" color="textSecondary">
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
                <MDTypography variant="h6" color="textSecondary">
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
              <MDTypography variant="h6" color="textSecondary"></MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default STACForm;
