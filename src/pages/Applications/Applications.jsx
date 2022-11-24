import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Layout components
import DashboardLayout from "layout/LayoutContainers/DashboardLayout";

const Applications = () => {
  return (
    <DashboardLayout>
      <MDBox >
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox>
                <MDTypography variant="h5">STAC Browser</MDTypography>
                <p>
                  STAC API Browser powered by{" "}
                  <a href="https://github.com/radiantearth/stac-browser">
                    Radiant Earth
                  </a>
                </p>
                <br />
                <MDButton
                  
                  onClick={async () => {
                    window.open(
                      process.env.REACT_APP_PORTAL_STAC_API_BROWSER_URL
                    );
                  }}
                >
                  Launch
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Applications;
