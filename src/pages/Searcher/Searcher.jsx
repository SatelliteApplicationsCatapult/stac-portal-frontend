import React, { useMemo, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Map
import DrawMap from "../../components/DrawMap";
// Table
import Tabs from "components/Tabs";

import DownloadedCollections from "./components/DownloadedCollections";
import PublicCollections from "./components/PublicCollections";

import { retrieveAllCollections } from "interface/collections";

const Searcher = () => {
  const [AOI, setAOI] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [collections, setCollections] = useState([]);

  // Retrieve Collection Data
  useEffect(() => {
    async function getCollections() {
      let resp = await retrieveAllCollections();
      if (resp && resp.collections) {
        setCollections(resp.collections);
      }
    }
    getCollections();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Tabs
              tabs={[
                {
                  label: "Downloaded Collections",
                  component: (
                    <DownloadedCollections
                      collections={collections}
                      setCollections={setCollections}
                    />
                  ),
                },
                {
                  label: "Public Collections",
                  component: (
                    <PublicCollections
                      collections={collections}
                      setCollections={setCollections}
                    />
                  ),
                },
              ]}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
export default Searcher;
