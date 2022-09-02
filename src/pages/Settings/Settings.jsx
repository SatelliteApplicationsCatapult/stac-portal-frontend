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

// Text editor box

const Settings = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TextField
              placeholder="Paste STAC JSON here"
              multiline
              rows={35}
              margin="normal"
              fullWidth
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Settings;
