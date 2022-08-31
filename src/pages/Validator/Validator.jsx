import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Box } from "@mui/system";
import { useState } from "react";

const Validator = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} pt={2}>
        <MDTypography variant="overline" gutterBottom>
          Use the Area Downloader to choose a date range and geographic area to
          download STAC data from.
        </MDTypography>
      </Grid>
      <Box pt={4} display="flex" justifyContent="space-between">
        <MDButton
          variant="contained"
          color="info"
          onClick={() => {
            navigator.clipboard.readText().then((text) => {
              // Paste into text field
              console.log(text);
              // get text field
              const textField = document.getElementById("text-field");
              textField.value = text;
            });
          }}
          startIcon={<Icon>content_paste</Icon>}
        >
          {" "}
          Paste from clipboard
        </MDButton>
        <MDButton
          variant="contained"
          color="primary"
          onClick={() => {}}
          startIcon={<Icon>task_alt</Icon>}
        >
          Validate JSON
        </MDButton>
      </Box>
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TextField
              id="text-field"
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

export default Validator;
