import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";

// Interface
import { retrieveAllCollections } from "interface/collections";

const Updater = () => {
  const [collections, setCollections] = useState([]);

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
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4">Updata-h</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4">Collections</MDTypography>
                <MDTypography variant="body1">
                  {collections.map((collection) => (
                    <div>{collection.id}</div>
                  ))}
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Updater;
