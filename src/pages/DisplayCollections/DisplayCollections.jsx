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

import {
  retrieveAllPrivateCollections,
  deletePrivateCollection,
} from "interface/collections";
import MDButton from "components/MDButton";

const DisplayCollections = () => {
  const [privateCollections, setprivateCollections] = useState([]);
  useEffect(() => {
    async function getCollections() {
      let privateCollections = await retrieveAllPrivateCollections();
      console.log("Private data 1", privateCollections[0]);
      setprivateCollections(privateCollections);
    }
    getCollections();
  }, []);

  const genericTableMemo = [
    {
      accessorFn: (row) => {
        return row.id;
      },
      header: "Collection ID",
      size: 100,
    },
    {
      accessorFn: (row) => {
        return row.title;
      },
      header: "Title",
      size: 100,
    },
    {
      accessorFn: (row) => {
        // if row.description is longer than 80 chars then truncate it and add ...
        if (row.description.length > 80) {
          return row.description.substring(0, 80) + "...";
        }
        return row.description;
      },
      header: "Description",
      size: 100,
    },
    {
      accessorFn: (row) => {
        return row.temporal_extent_start.split(".")[0];
      },
      header: "Temporal Extent Start",
      size: 100,
    },
    {
      accessorFn: (row) => {
        return row.temporal_extent_end.split(".")[0];
      },
      header: "Temporal Extent End",
      size: 100,
    },
  ];

  const privateTableMemo = [
    {
      accessorFn: (row) => {
        return (
          <MDButton
            color="error"
            onClick={async () => {
              // ask the user are they sure they want to delete
              let confirmation = window.confirm(
                `Are you sure you want to delete ${row.id} collection?`
              );
              if (confirmation) {
                await deletePrivateCollection(row.id);
                let privateCollections = await retrieveAllPrivateCollections();
                setprivateCollections(privateCollections);
              }
            }}
          >
            Delete
          </MDButton>
        );
      },
      header: "Delete",
      size: 10,
    },
  ];


  Array.prototype.push.apply(privateTableMemo, genericTableMemo);
  const paramsColumnsPrivate = useMemo(() => privateTableMemo);
  //get the list of header names from genericTableMemo
  const headerNames = genericTableMemo.map((item) => item.header);
  const privateCollectionsTableColumnOrder = headerNames;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4">Collections</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <h5>Private Collections</h5>
            <Table
              columns={paramsColumnsPrivate}
              gray
              columnOrder={privateCollectionsTableColumnOrder}
              data={privateCollections}
              rowClickAction={(row, table) => {}}
              rowsPerPage={20}
              title="Private Collections"
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default DisplayCollections;