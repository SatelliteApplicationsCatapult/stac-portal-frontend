import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Button, Icon, TextField } from "@mui/material";

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

const LoadLocal = () => {
  const [files, setFiles] = useState([]);
  const [groupedFiles, setGroupedFiles] = useState();

  useEffect(() => {
    let filesGroupedByItemId = files.reduce((acc, file) => {
      // if itemId is not undefined
      if (file.itemId) {
        acc[file.itemId] = acc[file.itemId] || [];
        acc[file.itemId].push(file);
      }
      return acc;
    }, {});

    console.log("Grouped Files", groupedFiles);

    setGroupedFiles(filesGroupedByItemId);

    // 
  }, [files]);

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                vel leo sed enim placerat condimentum eu ac urna. Nam facilisis
                tempus semper.
              </MDTypography>
              {/* Drag and Drop */}
              <Dropzone files={files} setFiles={setFiles} />
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  vel leo sed enim placerat condimentum eu ac urna. Nam
                  facilisis tempus semper.
                </MDTypography>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  minWidth="450px"
                  alignItems="center"
                >
                  <CollectionSelect />
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
                <MDTypography variant="h5" color="textSecondary">
                  Step 5 - Create STAC Metadata
                </MDTypography>
                <MDTypography variant="body2" mb={2}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  vel leo sed enim placerat condimentum eu ac urna. Nam
                  facilisis tempus semper.
                </MDTypography>
                <STACForm groupedFiles={groupedFiles} />
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default LoadLocal;
