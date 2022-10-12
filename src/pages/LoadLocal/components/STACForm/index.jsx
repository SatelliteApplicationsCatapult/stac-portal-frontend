import { useEffect, useState } from "react";
import { Button, FormLabel, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { returnTiffMeta } from "interface/gdal";
import { returnAdditionalMeta } from "pages/LoadLocal/loader/utils";
import Items from "./components/Items";
import Metadata from "./components/Metadata";
import STACJSON from "./components/STACJSON";

const STACForm = ({ groupedFiles, files }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [itemsMeta, setItemsMeta] = useState({});

  const [alreadyLoadedFiles, setAlreadyLoadedFiles] = useState([]);
  const [alreadyLoadedAdditionalMeta, setAlreadyLoadedAdditionalMeta] =
    useState([]);

  useEffect(() => {
    if (groupedFiles) {
      Object.keys(groupedFiles).forEach(async (key) => {
        groupedFiles[key].forEach(async (file) => {
          if (!alreadyLoadedFiles.includes(file.name)) {
            setAlreadyLoadedFiles((prev) => [...prev, file.name]);

            const tiffMeta = await returnTiffMeta(file.name);
            setItemsMeta((prev) => ({
              ...prev,
              [file.itemId]: {
                ...prev[file.itemId],
                [file.name]: tiffMeta,
              },
            }));
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

  // Check if all the tiffs in the item have been loaded
  const checkIfAllTiffsLoaded = (item) => {
    if (groupedFiles[item]) {
      console.log('Grouped items', groupedFiles[item]);
      
      // Check that all the keys inside the groupedFiles[item] are in the itemsMeta[item]
      const allTiffsLoaded = groupedFiles[item].every((file) => { // TODO this is bugged 
        return itemsMeta[item][file.name];
      });


      console.log('All tiffs loaded', allTiffsLoaded);
      return allTiffsLoaded;
    }

    return false;
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
                    {groupedFiles[key].length} files
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
                <MDTypography variant="h6" color="textSecondary">
                  Metadata
                </MDTypography>

                {/* <MDBox width="100%">
                  <Metadata selectedMeta={selectedMeta} />
                </MDBox> */}

                {/* Raw STAC JSON */}
                <MDBox width="100%">
                  {selectedItem && checkIfAllTiffsLoaded(selectedItem) ? (
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
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default STACForm;
