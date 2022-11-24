// React
import { useEffect, useState } from "react";

// Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Dropzone from "./components/Dropzone";
import CollectionSelect from "./components/CollectionSelect";
import STACForm from "./components/STACForm";

// @mui components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Button, CircularProgress } from "@mui/material";

// Layout components
import DashboardLayout from "layout/LayoutContainers/DashboardLayout";

// Styles
import "./style.scss"

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
        `${process.env.REACT_APP_PORTAL_STAC_API_BROWSER_URL}/collections/${selectedCollection.id}`,
        "_blank"
      );
    }, 1500);
  };

  return (
    <DashboardLayout>
      <MDBox>
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
              <MDTypography variant="h5">
                Step 1 - Select Folder(s)
              </MDTypography>
              <MDTypography variant="overline" mb={2}>
                Drag and drop the folder containing the imagery files from your
                source provider e.g. Planet, Maxar etc.
              </MDTypography>
              {/* Drag and Drop */}
              <Dropzone
                setFiles={setFiles}
                uploads={uploads}
                setUploads={setUploads}
                setGroupedDownloads={setGroupedDownloads}
              />
            </Card>
          </Grid>

          {/* Step 4 - Choose Collection */}
          <Grid
            item
            xs={12}
            style={{
              marginTop: "3rem",
            }}
          >
            <MDBox>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <MDTypography variant="h5">
                  Step 4 - Choose Collection
                </MDTypography>
                <MDTypography
                  variant="overline"
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  Choose a collection to add your new STAC items to.
                </MDTypography>
                <MDBox>
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
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    minWidth: "450px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <MDTypography variant="h5">
                    Step 5 - View STAC Records
                  </MDTypography>
                  <MDButton
                    onClick={publish}
                    buttonType="create"
                    disabled={!selectedCollection}
                  >
                    Publish All
                  </MDButton>
                </MDBox>

                <MDTypography
                  variant="overline"
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  View the newly created STAC records for each item.
                </MDTypography>
                <STACForm
                  groupedFiles={groupedFiles}
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
                <MDTypography variant="h5" mt={2}>
                  Publishing...
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </DashboardLayout>
  );
};

export default LoadLocal;
