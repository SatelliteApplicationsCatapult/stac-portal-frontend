import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";

// Text editor box

const Applications = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDTypography variant="h4">Current Applications</MDTypography>
            <br />
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h5">STAC Browser</MDTypography>
                <p>
                  STAC API Browser powered by{" "}
                  <a href="https://github.com/radiantearth/stac-browser">
                    Radiant Earth
                  </a>
                </p>
                <br/>
                <MDButton
                  color="primary"
                  onClick={async () => {
                    window.open(process.env.REACT_APP_PORTAL_STAC_API_BROWSER_URL);
                  }}
                >
                  Launch
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <br />

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDTypography variant="h4">Potential applications</MDTypography>
            <p>
              This is a placeholder for potential future applications such as
              <li>
                <a href="https://projects.csopenportal.co.uk">
                  CommonSensing Open Portal
                </a>
              </li>
              <li>
                <a href="https://jupyter.org/hub">Jupyter Hub</a>
              </li>
            </p>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Applications;
