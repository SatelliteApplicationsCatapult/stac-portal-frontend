import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";

// STAC Portal components
import MDBox from "components/MDBox";


// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";


// Text editor box

const Settings = () => {
  return (
    <DashboardLayout>
      
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
      
    </DashboardLayout>
  );
};

export default Settings;
