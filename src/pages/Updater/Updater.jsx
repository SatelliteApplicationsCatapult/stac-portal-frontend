import React, { useMemo, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses } from "@mui/material";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Interface
import {
  getAllStoredSearchParameters,
  runStoredSearchParamUpdate,
} from "interface/collections";

// Table
import Table from "components/Table";
import MDButton from "components/MDButton";

const Updater = () => {
  const [params, setParams] = useState([]);
  // Retrieve Collection Data
  useEffect(() => {
    async function getParams() {
      let data = await getAllStoredSearchParameters();
      setParams(data);
    }
    getParams();
  }, []);

  // Table Columns
  const paramsColumns = useMemo(() => [
    {
      accessorFn: (row) => {
        return row.parentCatalogName;
      },
      header: "Catalog",
      size: 200,
    },
    {
      accessorFn: (row) => {
        return row.collection;
      },
      header: "Collection",
      size: 180, //medium column
    },
    {
      accessorFn: (row) => {
        return row.bbox.join(", ");
      },
      header: "Spatial Extent",
      size: 100, //medium column
    },
    {
      accessorFn: (row) => {
        return row.datetime;
      },
      header: "Temporal Extent",
      size: 180, //medium column
    },
    {
      accessorFn: (row) => {
        return (
          <MDButton
            onClick={() => {
              runStoredSearchParamUpdate(row.id);
              alert(`Updating ${row.collection} from ${row.parentCatalogName}`);
            }}
          >
            Update
          </MDButton>
        );
      },
      header: "Update",
      size: 100, //medium column
    },
  ]);
  const columnOrder = [
    "Catalog",
    "Collection",
    "Spatial Extent",
    "Temporal Extent",
    "Update",
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4">Updater</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Table
              columns={paramsColumns}
              gray
              columnOrder={columnOrder}
              data={params}
              rowClickAction={(row, table) => {}}
              rowsPerPage={20}
              title="Search Parameters"
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Updater;
