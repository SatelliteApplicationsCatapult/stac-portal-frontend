import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "layout/LayoutContainers/DashboardLayout";

import { useState } from "react";
import Iframe from "react-iframe";
import './style.scss'

const PrivateCollectionsSearcher = () => {
  return (
    <>
      <DashboardLayout>
        <MDBox
          pt={6}
          pb={3}
          style={{
            width: "100%",
            height: "83vh",
          }}
        >
          <Iframe
            src="https://ctplt-pda-rg-dev-stac-api-browser.azurewebsites.net/"
            width="100%"
            height="100%"
            frameBorder="0"
            id="stac-browser-iframe"
          />
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default PrivateCollectionsSearcher;
