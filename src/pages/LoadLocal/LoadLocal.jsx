// React
import { useEffect, useState } from "react";

// Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Dropzone from "./components/Dropzone";
import CollectionSelect from "./components/CollectionSelect";
import STACTable from "./components/STACTable";

// @mui components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Layout components
import DashboardLayout from "layout/LayoutContainers/DashboardLayout";

// Styles
import "./style.scss";

// Constants
import { metadataFileNames } from "./consts";

// Utils
import {
  readManifest,
  processManifest,
  uploadFile,
  processTiff,
  groupFilesByID,
  checkItemCount,
  generateSTAC,
} from "./utils";

const LoadLocal = () => {
  const [files, setFiles] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState();
  const [errorFiles, setErrorFiles] = useState([]);
  const [stac, setStac] = useState({});

  useEffect(() => {
    const handleFileUpload = async (e) => {
      // Check for unprocessed metadata files
      const metafiles = files.filter(
        (file) => metadataFileNames.includes(file.originalName) && !file.started
      );

      if (!metafiles.length) {
        return;
      }

      // Read each metadata file
      const promises = metafiles.map((file) => {
        return readManifest(file);
      });
      // Resolve all promises
      await Promise.all(promises);

      // Process each metadata file and group associated files by item ID
      const processed = metafiles.map((file) => {
        return processManifest(file, files);
      });
      // Resolve all promises
      await Promise.all(processed);

      // Start the file upload and processing
      // Filter the files,, the other files should be marked as error
      files
        .filter((file) => file.itemID)
        // Remove any duplicate files if they have the same name
        .filter((file, index, self) => {
          // Mark the ones that get filtered out as error
          if (index !== self.findIndex((f) => f.name === file.name)) {
            console.log('Duplicate file found: ', file.name);
            file.error = true;
            file.errorMessage = "Duplicate file name";
            file.started = false;

            // Remove from files state
            files.splice(files.indexOf(file), 1);
            setErrorFiles([...errorFiles, file]);
          }

          return (
            index ===
            self.findIndex(
              (f) => f.name === file.name
            )
          );
        });

      // All files without an item ID are marked as error
      files
        .filter((file) => !file.itemID)
        .forEach((file) => {
          file.error = true;
          file.errorMessage = "No associated metadata file";
          file.started = false;

          // Remove from files state
          files.splice(files.indexOf(file), 1);
          setErrorFiles([...errorFiles, file]);
        });

      // Update the files
      setFiles([...files]);

      const uploadPromises = files.map(async (file) => {
        const response = await uploadFile(file);
        // Set complete to true

        // If file not a TIFF, mark as complete
        if (file.type === "image/tiff") {
          const response = await processTiff(file);
          file.complete = true;
          file.GDALInfo = response;
        } else {
          file.complete = true;
        }

        setFiles([...files]);
        return response;
      });

      // Resolve all promises with a progress bar
      await Promise.all(uploadPromises);

      // Now to generate the STAC with the items we have
      const items = groupFilesByID(files);
      Object.keys(items).forEach(async (itemID) => {
        const item = items[itemID];
        if (item.complete === true) {
          //if (checkItemCount(item)) {
          const stacJSON = await generateSTAC(item);

          console.log(item.itemID, "Generated STAC JSON", stacJSON);

          // Add itemID and stacJSON to stac state
          setStac((prev) => {
            return {
              ...prev,
              [item.itemID]: stacJSON,
            };
          });
          //}
        }
      });
    };

    handleFileUpload();
  }, [files]);

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

              <MDBox
                style={{
                  display: "flex",
                  height: "100%",
                  marginTop: "2em",
                }}
              >
                {/* Directory folder upload */}
                <MDBox
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {/* Dropzone */}
                  <Dropzone files={files} setFiles={setFiles} />
                </MDBox>
              </MDBox>
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
                  {/* <MDButton
                    onClick={publish}
                    buttonType="create"
                    disabled={!selectedCollection}
                  >
                    Publish All
                  </MDButton> */}
                </MDBox>

                <MDTypography
                  variant="overline"
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  View the newly created STAC records for each item.
                </MDTypography>
                <STACTable files={files} stac={stac} />
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

// Type for file props
export type FileProps = {
  // Basic file properties
  originalName: string,
  name: string,
  path: string,
  size: number,
  type: string,

  // Frontend attributes
  started: boolean,
  progress: number,
  complete: boolean,
  error: boolean,
  errorMessage: string,
  GDALInfo: Object,
  GDALProcessing: boolean,

  // Data attributes
  itemID: string,
  sasToken: string,
  blob?: Blob,
  data?: any,
  provider?: string,
};

export default LoadLocal;
