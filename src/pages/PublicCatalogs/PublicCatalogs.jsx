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
import MDButton from "components/MDButton";
import CustomWidthTooltip from "components/Tooltip/CustomWidthTooltip";

import Table from "components/Table";
import { retrieveAllPublicCatalogs,syncAllPublicCatalogs } from "interface/catalogs";
import {
  retrieveAllPublicCollections,
  deletePublicCollection,
  
} from "interface/collections";
const PublicCatalogs = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [publicCollections, setpublicCollections] = useState([]);
  useEffect(() => {
    async function getAll() {
      let data = await retrieveAllPublicCatalogs();
      let publicCollections = await retrieveAllPublicCollections();
      setCatalogs(data);
      setpublicCollections(publicCollections);
    }
    getAll();
  }, []);
  const catalogsColumns = useMemo(() => [
    {
      accessorFn: (row) => {
        return row.name;
      },
      header: "Catalog Name",
      size: 100,
    },
    {
      accessorFn: (row) => {
        // Add a tooltip that shows the full description
        return (
          <CustomWidthTooltip
            title={row.description}
            disableTouchListener={false}
            disableFocusListener={false}
            enterDelay={1000}
          >
            <div>{row.description.substring(0,120) + "..."}</div>
          </CustomWidthTooltip>
        );
      },
      header: "Description",
      size: 100, //medium column
    },
    {
      accessorFn: (row) => {
        return row.added_on.split(".")[0];
      },
      header: "Added On",
      size: 100,
    },
  ]);

  const genericTableMemo = [
    {
      accessorFn: (row) => {
        // Add a tooltip that shows the full description
        return (
          <CustomWidthTooltip
            title={row.id}
            disableTouchListener={false}
            disableFocusListener={false}
            enterDelay={1000}
          >
            <div>{row.id.substring(0,40) + "..."}</div>
          </CustomWidthTooltip>
        );
      },
      header: "Collection ID",
      size: 100, //medium column
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
        // Add a tooltip that shows the full description
        return (
          <CustomWidthTooltip
            title={row.description}
            disableTouchListener={false}
            disableFocusListener={false}
            enterDelay={1000}
          >
            <div>{row.description.substring(0,80) + "..."}</div>
          </CustomWidthTooltip>
        );
      },
      header: "Description",
      size: 100, //medium column
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

  const publicTableMemo = [
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
                await deletePublicCollection(row.parent_catalog, row.id);
                let publicCollections = await retrieveAllPublicCollections();
                setpublicCollections(publicCollections);
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
  Array.prototype.push.apply(publicTableMemo, genericTableMemo);
  const paramsColumnsPublic = useMemo(() => publicTableMemo);
  const publicCollectionsTableColumnOrder = genericTableMemo.map(
    (item) => item.header
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <h5>Syncronise with STAC Index</h5>
            <p>
              Running this operation will synchronise list of your public
              catalogs and collections with STAC Index.
            </p>
            <br></br>
            <MDButton color="primary" onClick={async () => {
              await syncAllPublicCatalogs();
              window.alert("Syncronisation operation started. Please wait for a few minutes and refresh the page to see the updated list of catalogs and collections.");
            }}>
              Syncronise
            </MDButton>
          </Grid>
          <Grid item xs={12}>
            <h5>Public Catalogs</h5>
            <Table
              columns={catalogsColumns}
              gray
              data={catalogs}
              rowClickAction={(row, table) => {}}
              rowsPerPage={20}
              title="Load Operations"
            />
          </Grid>
          <Grid item xs={12}>
            <h5>Public Collections</h5>
            <Table
              columns={paramsColumnsPublic}
              gray
              columnOrder={publicCollectionsTableColumnOrder}
              data={publicCollections}
              rowClickAction={(row, table) => {}}
              rowsPerPage={20}
              title="Public Collections"
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default PublicCatalogs;
