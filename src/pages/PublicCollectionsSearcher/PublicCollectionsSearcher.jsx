import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DrawMap from "../../components/DrawMap";
import PublicCollections from "./components/PublicCollections";
import {retrieveAllCollections} from "interface/collections";

const PublicCollectionsSearcher = () => {
  const [AOI, setAOI] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [downloadedCollections, setDownloadedCollections] = useState([]);
  const [publicCollections, setPublicCollections] = useState([]);

  // Retrieve Collection Data
  useEffect(() => {
    async function getCollections() {
      let resp = await retrieveAllCollections();
      if (resp && resp.collections) {
        setDownloadedCollections(resp.collections);
      }
    }

    getCollections();
  }, []);

  return (
    <DashboardLayout>
      
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDTypography variant="overline" gutterBottom>
              Use the Area Downloader to choose a date range and geographic area
              to download STAC data from.
            </MDTypography>
          </Grid>

          <Grid item xs={12}>
            <MDBox>
              <DrawMap
                AOI={AOI}
                setAOI={setAOI}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                publicCollections={publicCollections}
                setPublicCollections={setPublicCollections}
                downloadedCollections={downloadedCollections}
                setDownloadedCollections={setDownloadedCollections}
                rowClickAction={(row, table) => {
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <PublicCollections
                collections={publicCollections}
                setCollections={setPublicCollections}
                AOI={AOI}
                startDate={startDate}
                endDate={endDate}
                rowClickAction={(row, table) => {
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      
    </DashboardLayout>
  );
};
export default PublicCollectionsSearcher;
