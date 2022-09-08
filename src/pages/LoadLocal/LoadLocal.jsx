import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Button, TextField } from "@mui/material";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "./style.scss";
import { useState } from "react";

import UploaderForm from "./components/UploaderForm";

const LoadLocal = () => {
  const [files, setFiles] = useState([
    { name: "MYD14A2.A2022201.h35v10.061.2022215004639" },
    { name: "ESA_WorldCover_10m_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Polar_Bear_Mammals_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Antarctic_Sea_Ice_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Fish_Mammals_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Sea_Ice_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Pacific_Sea_Ice_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Southern_Ocean_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Southern_Ocean_2020_v100_S57W02_EPSG4326.tif" },
    { name: "January_2020_v100_S57W02_EPSG4326.tif" },
    { name: "February_2020_v100_S57W02_EPSG4326.tif" },
    { name: "March_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Post_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Pre_2020_v100_S57W02_EPSG4326.tif" },
    { name: "Ergonomic_2020_v100_S57W02_EPSG4326.tif" },
  ]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [data, setData] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default LoadLocal;
