import { Button, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const STACForm = ({ groupedFiles }) => {
  return (
    <MDBox display="flex" border="1px solid #e0e0e0">
      <MDBox
        display="flex"
        flexDirection="column"
        width="30%"
        minWidth="450px"
        borderRight="1px solid #e0e0e0"
        borderBottom="1px solid #e0e0e0"
      >
        {/* Header */}
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid #e0e0e0"
        >
          <MDTypography variant="h6" color="textSecondary">
            Items
          </MDTypography>
        </MDBox>
        {groupedFiles &&
          Object.keys(groupedFiles).map((key) => {
            return (
              <MDBox
                key={key}
                mb={2}
                p={2}
                borderBottom="1px solid #e0e0e0"
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                width="100%"
                // Hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <MDTypography variant="h6">{key}</MDTypography>
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="body2" mr={1}>
                    {groupedFiles[key].length} files
                  </MDTypography>
                </MDBox>
              </MDBox>
            );
          })}
      </MDBox>
      <MDBox display="flex" flexDirection="column" width="70%" minWidth="450px">
        {/* Header  */}
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid #e0e0e0"
        >
          <MDTypography variant="h6" color="textSecondary">
            Form
          </MDTypography>
        </MDBox>
        {/* Generated Item Form */}
        <MDBox display="flex" flexDirection="column" width="100%" p={2}>
          <MDBox display="flex" flexDirection="column" width="100%" p={2}>
            <MDBox display="flex" flexDirection="column" width="100%">
              {/* Button for view RAW json */}
              <MDBox display="flex" width="100%" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "white!important",
                    backgroundColor: "#119F9A!important",
                  }}
                  onClick={() => {
                    console.log("View RAW JSON");
                  }}
                >
                  View RAW JSON
                </Button>
              </MDBox>
              <MDTypography variant="body2" mb={1}>
                Item ID
              </MDTypography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Item ID"
              />
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default STACForm;
