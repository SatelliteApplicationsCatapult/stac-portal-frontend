import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Button, CircularProgress, Icon, TextField } from "@mui/material";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "./style.scss";
import { useState, useEffect } from "react";

// Components
import Dropzone from "./components/Dropzone";
import CollectionSelect from "./components/CollectionSelect";
import STACForm from "./components/STACForm";

// Utils
import { addItemsToCollection } from "interface/collections";

const LoadLocal = () => {
  const [files, setFiles] = useState([]);
  const [groupedFiles, setGroupedFiles] = useState();
  const [uploads, setUploads] = useState({});
  const [groupedDownloads, setGroupedDownloads] = useState({});
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [itemsMeta, setItemsMeta] = useState({});

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let filesGroupedByItemId = files.reduce((acc, file) => {
      if (file.itemId) {
        acc[file.itemId] = acc[file.itemId] || [];
        acc[file.itemId].push(file);
      }
      return acc;
    }, {});

    setGroupedFiles(filesGroupedByItemId);
  }, [files]);

  const publish = async () => {
    setShowLoading(true);
    await addItemsToCollection(selectedCollection, itemsMeta);
    setShowLoading(false);

    // Wait for 2 seconds and then redirect to collection
    setTimeout(() => {
      window.open(
        `https://ctplt-pda-rg-dev-stac-api-browser.azurewebsites.net/collections/${selectedCollection.id}`,
        "_blank"
      );
    }, 1500);

    // Navigate to https://ctplt-pda-rg-dev-stac-api-browser.azurewebsites.net/collections/{collectionId} in new tab
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/* Step 1 - Upload */}
          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <MDTypography variant="h5" color="textSecondary">
                Step 1 - Select Folder(s)
              </MDTypography>
              <MDTypography variant="body2" mb={2}>
                Drag and drop the folder containing the imagery files from your
                source provider e.g. Planet, Maxar etc.
              </MDTypography>
              {/* Drag and Drop */}
              <Dropzone
                files={files}
                setFiles={setFiles}
                uploads={uploads}
                setUploads={setUploads}
                groupedDownloads={groupedDownloads}
                setGroupedDownloads={setGroupedDownloads}
              />
            </Card>
          </Grid>

          {/* Step 4 - Choose Collection */}
          <Grid item xs={12}>
            <MDBox>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <MDTypography variant="h5" color="textSecondary">
                  Step 4 - Choose Collection
                </MDTypography>
                <MDTypography variant="body2" mb={2}>
                  Choose a collection to add your new STAC items to.
                </MDTypography>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  minWidth="450px"
                  alignItems="center"
                >
                  <CollectionSelect
                    selectedCollection={selectedCollection}
                    setSelectedCollection={setSelectedCollection}
                  />
                </MDBox>
              </Card>
            </MDBox>
          </Grid>

          {/* Step 5 - Create STAC Metadata */}
          <Grid item xs={12}>
            <MDBox>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <MDBox
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  minWidth="450px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h5" color="textSecondary">
                    Step 5 - View STAC Records
                  </MDTypography>
                  <Button
                    // Publish all files
                    onClick={publish}
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#54A19A",
                      color: "white!important",
                    }}
                    disabled={!selectedCollection}
                  >
                    Publish All
                  </Button>
                </MDBox>

                <MDTypography variant="body2" mb={2}>
                  View the newly created STAC records for each item.
                </MDTypography>
                <STACForm
                  uploads={uploads}
                  groupedFiles={groupedFiles}
                  files={files}
                  groupedDownloads={groupedDownloads}
                  itemsMeta={itemsMeta}
                  setItemsMeta={setItemsMeta}
                />
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      {/* Modal for loading */}
      {showLoading && (
        <MDBox
          className="modal"
          onClick={() => {
            //setShowLoading(false);
          }}
        >
          <MDBox
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Loading */}
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <CircularProgress
                  // BLue
                  sx={{
                    color: "#54A19A",
                  }}
                />
                <MDTypography variant="h5" color="textSecondary" mt={2}>
                  Publishing...
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      )}

      <Footer />
    </DashboardLayout>
  );
};

export default LoadLocal;
