import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";

const CollectionSelect = () => {
  const collections = [
    { label: "Collection 1", id: "1" },
    { label: "Collection 2", id: "2" },
    { label: "Collection 3", id: "3" },
  ];
  return (
    <>
      {/* Either select an existing selection or create a new one */}

      {/* First box is to choose existing collection using a dropdown which is searchable */}
      <MDBox display="flex" flexDirection="row" width="100%">
        <MDBox display="flex" flexDirection="column" mb={2} width="100%">
          <MDTypography variant="h6" color="textSecondary">
            Choose an existing collection
          </MDTypography>
          <MDTypography variant="body2" mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel
            leo sed enim placerat condimentum eu ac urna. Nam facilisis tempus
            semper.
          </MDTypography>
          <MDBox
            display="flex"
            flexDirection="column"
            width="30%"
            minWidth="450px"
          >
            <Autocomplete
              options={collections}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Choose Collection" />
              )}
            />
          </MDBox>
        </MDBox>

        {/* Arrow */}
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="20%"
        >
          <MDTypography
            variant="h6"
            sx={{
              color: "#119F9A",
            }}
          >
            OR
          </MDTypography>
        </MDBox>

        {/* Second box is to create a new collection */}
        <MDBox display="flex" flexDirection="column" mb={2} width="100%">
          <MDTypography variant="h6" color="textSecondary">
            Create a new collection
          </MDTypography>
          <MDTypography variant="body2" mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel
            leo sed enim placerat condimentum eu ac urna. Nam facilisis tempus
            semper.
          </MDTypography>
          <MDBox
            display="flex"
            flexDirection="column"
            width="30%"
            minWidth="450px"
          >
            {/* Open a modal with a form */}
            {/* Button */}
            <MDButton
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log("Create new collection");
              }}
              sx={{ width: "30%" }}
            >
              Create
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default CollectionSelect;
