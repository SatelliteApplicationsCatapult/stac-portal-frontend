import React, {useEffect, useMemo, useState} from "react";

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
import {retrieveAllLoadStatuses} from "interface/loadstatuses";

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
        return row.catalog.name;
      },
      header: "Source Catalog",
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
      size: 10,
    },
    {
      accessorFn: (row) => {
        return row.updated_items_count;
      },
      header: "# Updated Items",
      size: 10,
    },
    {
      accessorFn: (row) => {
        // collections is either row.newly_stored_collections or row.updated_collections
        let newCollections = row.newly_stored_collections;
        let updatedCollections = row.updated_collections;
        let collections = newCollections.concat(updatedCollections);
        // remove empty and duplicate collections
        collections = collections.filter((item) => item);
        collections = [...new Set(collections)];
        return collections.join(", ");
      },
      header: "Collections",
      size: 100,
    },
    {
      accessorFn: (row) => {
        if (row.error_message) {
          const errorUrl = `${process.env.REACT_APP_PORTAL_BACKEND_URL}/status_reporting/loading_public_stac_records/${row.id}/`;
          return (
            <>
              <a href={errorUrl} target="_blank" rel="noreferrer">
                See Error
              </a>
            </>
          );
        }
        return "No Error";
      },
      header: "Error Message",
      size: 100,
    },
  ]);
  const columnOrder = ["Catalog"];
  return (
    <DashboardLayout>
      <DashboardNavbar/>
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
              rowClickAction={(row, table) => {
              }}
              rowsPerPage={20}
              title="Load Operations"
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer/>
    </DashboardLayout>
  );
};

export default LoadStatuses;
