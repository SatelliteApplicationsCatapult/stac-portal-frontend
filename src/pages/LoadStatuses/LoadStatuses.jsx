import React, { useMemo, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Table from "components/Table";
// import MDButton from "components/MDButton";
import { retrieveAllLoadStatuses } from "interface/loadstatuses";

const LoadStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    async function getStatuses() {
      let data = await retrieveAllLoadStatuses();
      console.log(data);
      setStatuses(data);
    }
    getStatuses();
  }, []);

  const paramsColumns = useMemo(() => [
    {
      accessorFn: (row) => {
        return row.id;
      },
      header: "#",
      size: 10,
    },
    {
      accessorFn: (row) => {
        return row.source_stac_api_url;
      },
      header: "Source",
      size: 200,
    },

    {
      accessorFn: (row) => {
        return row.time_started.split(".")[0];
      },
      header: "Time Started",
      size: 100,
    },
    {
      accessorFn: (row) => {
        if (row.time_finished === "None") {
          return "In Progress";
        }
        return row.time_finished.split(".")[0];
      },
      header: "Time Finished",
      size: 100, //medium column
    },
    {
      accessorFn: (row) => {
        return row.newly_stored_items_count;
      },
      header: "# New \nItems",
      size: 10
    },
    {
      accessorFn: (row) => {
        return row.updated_items_count;
      },
      header: "# Updated Items",
      size: 10
    },
    {
      accessorFn: (row) => {
        return row.newly_stored_collections.join(", ");
      },
      header: "New Collections",
      size: 100
    },
    {
      accessorFn: (row) => {
        return row.updated_collections.join(", ");
      },
      header: "Updated Collections",
      size: 100
    }
  ]);
  const columnOrder = ["Catalog"];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4">Load Operations</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Table
              columns={paramsColumns}
              gray
              columnOrder={columnOrder}
              data={statuses}
              rowClickAction={(row, table) => {}}
              rowsPerPage={20}
              title="Load Operations"
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default LoadStatuses;
