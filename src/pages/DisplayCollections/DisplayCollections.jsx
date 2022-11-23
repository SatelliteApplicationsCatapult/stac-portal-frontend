import React, {useEffect, useState} from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DownloadedCollections from "./components/DownloadedCollections";

import {retrieveAllCollections,} from "interface/collections";

const DisplayCollections = () => {
  const [downloadedCollections, setDownloadedCollections] = useState([]);
  useEffect(() => {
    async function getCollections() {
      let collectionsOnStac = await retrieveAllCollections();
      setDownloadedCollections(collectionsOnStac.collections);
    }

    getCollections();
  }, []);

  //get the list of header names from genericTableMemo
  return (
    <DashboardLayout>
      
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4">My Catalog</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <DownloadedCollections
              collections={downloadedCollections}
              setCollections={setDownloadedCollections}
            />
          </Grid>
        </Grid>
      </MDBox>
      
    </DashboardLayout>
  );
};

export default DisplayCollections;
