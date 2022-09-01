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
import DrawMap from "../../components/DrawMap";
import { useState } from "react";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

import authorsTableData from "./data/authorsTableData";
import projectsTableData from "./data/projectsTableData";


const LocalAPI = () => {
  const [AOI, setAOI] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { columns: pColumns, rows: pRows } = projectsTableData();


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Publically Available STAC Sources
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDTypography variant="overline" gutterBottom>
              Hide map unless button clicked
            </MDTypography>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
export default LocalAPI;
