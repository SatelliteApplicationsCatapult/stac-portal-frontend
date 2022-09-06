import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import MDAlert from "components/MDAlert";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";

// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Box } from "@mui/system";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

import "./Validator.scss";

const Validator = () => {
  const [validJSON, setValidJSON] = useState(null);
  const [validatorResponse, setValidatorResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertBox, setAlertBox] = useState({
    display: false,
    message: "",
    severity: "error",
    icon: "error",
  });

  const generateErrorMessage = (error) => {
    console.log(`Full Error: ${error}`);
    return `Error validating against schema version ${error.version}. ${error.error_type}: ${error.error_message}`;
  };

  const handleSubmit = () => {
    setAlertBox({ display: false, message: "", severity: "error" });
    setIsLoading(true);
    let textField = document.getElementById("text-field");
    fetch("http://localhost:5000/validate/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: textField.value,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        let resp = JSON.parse(data[0])[0];
        setValidJSON(resp.valid_stac);
        setValidatorResponse(resp);

        if (!resp.valid_stac) {
          openErrorSB();
          setAlertBox({
            display: true,
            message: generateErrorMessage(resp),
            severity: "error",
            icon: "error",
          });
        } else {
          openSuccessSB();
          setAlertBox({
            display: true,
            message: "Valid STAC",
            severity: "success",
            icon: "check_circle",
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setValidJSON(false);
        setValidatorResponse(err);
        setAlertBox({
          display: true,
          message: "Error: " + err,
          severity: "error",
          icon: "error",
        });
      });
  };

  // Success Toast Message
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Valid STAC"
      content="The JSON is a valid STAC"
      datetime="now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  // Error Toast Message
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="error"
      title="Invalid STAC"
      content="The JSON is not a valid STAC"
      datetime="now"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {renderSuccessSB}
      {renderErrorSB}
      <Grid item xs={12} pt={2}>
        <MDTypography variant="overline" gutterBottom>
          Use the Area Downloader to choose a date range and geographic area to
          download STAC data from.
        </MDTypography>
        {alertBox.display ? (
          <MDAlert color={alertBox.severity}>
            <Icon
              fontSize="small"
              sx={{
                mr: 3,
              }}
            >
              {alertBox.icon}
            </Icon>
            <MDTypography variant="overline" color="white">
              {alertBox.message}
            </MDTypography>
          </MDAlert>
        ) : null}
      </Grid>
      <Box pt={4} display="flex" justifyContent="space-between">
        <Box display="flex" width="100%">
          <MDButton
            variant="contained"
            color="info"
            sx={{ mr: 4 }}
            onClick={() => {
              navigator.clipboard.readText().then((text) => {
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
            color="info"
            disabled={isLoading}
            sx={{ mr: 4 }}
            onClick={() => {
              // export as json
              const textField = document.getElementById("text-field");
              const dataStr =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(textField.value);
              const downloadAnchorNode = document.createElement("a");
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", "stac.json");
              document.body.appendChild(downloadAnchorNode); // required for firefox
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
            startIcon={<Icon>save_alt</Icon>}
          >
            {" "}
            Export as JSON
          </MDButton>

          <MDButton
            variant="contained"
            color="info"
            sx={{ mr: 4 }}
            onClick={() => {
              const textField = document.getElementById("text-field");
              textField.value = "";
            }}
            startIcon={<Icon>clear</Icon>}
          >
            {" "}
            Clear
          </MDButton>
        </Box>
        <Box display="flex" width="100%" justifyContent="flex-end">
          <MDButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<Icon>task_alt</Icon>}
          >
            Validate STAC
          </MDButton>
        </Box>
      </Box>
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <TextField
              id="text-field"
              placeholder="Paste STAC JSON here"
              multiline
              rows={35}
              margin="normal"
              fullWidth
              onInput={() => {
                if (alertBox.display) {
                  setAlertBox({
                    display: false,
                    message: "",
                    severity: "error",
                  });
                }
              }}
              // className if validJson is true then green if it is false then red if it is null then white and another class that hides if isLoading is true
              className={`text-field ${
                validJSON === true
                  ? "valid"
                  : validJSON === false
                  ? "invalid"
                  : validJSON === null
                  ? "null"
                  : ""
              } ${isLoading ? "hide" : ""}`}
            />
            {isLoading && <CircularProgress />}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Validator;
