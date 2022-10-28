import React, { useMemo, useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import { addPublicCatalog } from "interface/catalogs";

const AddPublicCatalog = () => {
  const [catalogName, setCatalogName] = useState("");
  const [catalogURL, setCatalogURL] = useState("");
  const [catalogDescription, setCatalogDescription] = useState("");
  const [catalogVersion, setCatalogVersion] = useState("1.0.0");
  useEffect(() => {}, []);

  const handleSubmit = async () => {
    try {
      let response = await addPublicCatalog(
        catalogName,
        catalogURL,
        catalogDescription,
        catalogVersion
      );
      window.alert("Catalog added successfully!");

      // Redirect to /my-catalog
      window.location.href = "/public-catalogs";
    } catch (error) {
      console.log("Error is: ", error);
      window.alert(error.response.data.message);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <MDBox sx={{ pt: 3 }}>
          <MDTypography variant="h4" color="textPrimary">
            Add Public Catalog
          </MDTypography>
          <br></br>
          <MDBox
            display="flex"
            flexDirection="column"
            width="30%"
            minWidth="450px"
          >
            <MDInput
              label="Catalog Name"
              placeholder="Enter catalog name"
              onChange={(event) => {
                setCatalogName(event.target.value);
              }}
              autoComplete="off"
              autoFocus={true}
              sx={{ mb: 2 }}
            />

            {/* Description */}
            <MDInput
              label="Catalog URL"
              placeholder="Enter catalog URL"
              onChange={(event) => {
                setCatalogURL(event.target.value);
              }}
              autoComplete="off"
              sx={{ mb: 2 }}
            />
            <MDInput
              label="Catalog Description"
              placeholder="Enter catalog description"
              onChange={(event) => {
                setCatalogDescription(event.target.value);
              }}
              autoComplete="off"
              sx={{ mb: 2 }}
            />
            <MDInput
              label="Catalog Version"
              placeholder="Enter catalog version"
              defaultValue="1.0.0"
              onChange={(event) => {
                setCatalogVersion(event.target.value);
              }}
              autoComplete="off"
              sx={{ mb: 2 }}
            />

            {/* Button */}
            <MDButton
              variant="contained"
              onClick={() => {
                // Set show loading
                // If input is empty
                if (
                  catalogName === "" ||
                  catalogURL === "" ||
                  catalogVersion === ""
                ) {
                  // alert("Please fill in required fields");
                  window.alert("Please fill in required fields");
                  return;
                }
                // validate catalog URL
                try {
                  new URL(catalogURL);
                } catch (error) {
                  window.alert("Please enter a valid URL");
                  return;
                }
                handleSubmit();
              }}
              sx={{
                width: "30%",
                mt: 2,
                backgroundColor: "#54A19A",
                color: "white!important",
                width: "100%",
                // On hover
                "&:hover": {
                  backgroundColor: "#66B08A",
                },
                "&:focus:not(:hover)": {
                  backgroundColor: "#66B08A",
                },
              }}
            >
              Create
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AddPublicCatalog;