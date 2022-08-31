import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Map
import DrawMap from "./components/DrawMap";
import { useState } from "react";
const AreaDownloader = () => {
  const [AOI, setAOI] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
            <MDBox height="20em">
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
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
export default AreaDownloader;
