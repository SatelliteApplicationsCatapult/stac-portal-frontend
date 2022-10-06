import { useEffect, useState } from "react";
import { Button, FormLabel, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { returnTiffMeta } from "interface/gdal";
import Items from "./components/Items";
import Metadata from "./components/Metadata";
import { Label } from "@mui/icons-material";

const STACForm = ({ groupedFiles }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [itemsMeta, setItemsMeta] = useState({});
  const [alreadyLoaded, setAlreadyLoaded] = useState([]);

  useEffect(() => {
    if (groupedFiles) {
      Object.keys(groupedFiles).forEach((key) => {
        groupedFiles[key].forEach(async (file) => {
          if (!alreadyLoaded.includes(file.name)) {
            setAlreadyLoaded((prev) => [...prev, file.name]);

            await returnTiffMeta(file.name).then((tiffMeta) => {
              setItemsMeta((prev) => ({
                ...prev,
                [file.itemId]: {
                  ...prev[file.itemId],
                  [file.name]: tiffMeta,
                },
              }));
            });
          }
        });
      });
    }
  }, [groupedFiles]);

  useEffect(() => {
    if (selectedItem) {
      setSelectedMeta(itemsMeta[selectedItem]);
    }
  }, [selectedItem, itemsMeta]);

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

                  // Hover color
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

                <MDBox width="100%">
                  <Metadata selectedMeta={selectedMeta} />
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
