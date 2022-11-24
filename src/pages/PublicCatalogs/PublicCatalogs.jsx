import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// STAC Portal components
import MDBox from "components/MDBox";

import AddPublicCatalog from "./components/AddPublicCatalog/AddPublicCatalog";

// Layout components
import DashboardLayout from "layout/LayoutContainers/DashboardLayout";

import MDButton from "components/MDButton";
import CustomWidthTooltip from "components/Tooltip/CustomWidthTooltip";
import CloudSyncIcon from "@mui/icons-material/CloudSync";

import Table from "components/Table";
import {
  retrieveAllPublicCatalogs,
  syncAllPublicCatalogs,
} from "interface/catalogs";
import { retrieveAllPublicCollections } from "interface/collections";
import MDTypography from "components/MDTypography";

const PublicCatalogs = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [publicCollections, setpublicCollections] = useState([]);
  useEffect(() => {
    async function getData() {
      let data = await retrieveAllPublicCatalogs();
      let publicCollections = await retrieveAllPublicCollections();
      setCatalogs(data);
      setpublicCollections(publicCollections);
    }

    getData();
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
            <div>{row.description.substring(0, 120) + "..."}</div>
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
        return row.catalog.name;
      },
      header: "Catalog Name",
      size: 100,
    },
    {
      accessorFn: (row) => {
        return row.id;
      },
      header: "Collection ID",
      size: 200, //medium column
    },
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
            <div>{row.title.substring(0, 40) + "..."}</div>
          </CustomWidthTooltip>
        );
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
            <div>{row.description.substring(0, 80) + "..."}</div>
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

  const publicTableMemo = [];
  Array.prototype.push.apply(publicTableMemo, genericTableMemo);
  const paramsColumnsPublic = useMemo(() => publicTableMemo);
  const publicCollectionsTableColumnOrder = genericTableMemo.map(
    (item) => item.header
  );

  return (
    <DashboardLayout>
      <MDBox>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MDTypography variant="h4" >
                Synchronise with STAC Index
              </MDTypography>
              <MDTypography variant="overline" >
                Running this operation will synchronise list of your public
                catalogs and collections with STAC Index.
              </MDTypography>

              <br></br>

              <MDButton
                buttonType="update"
                onClick={async () => {
                  await syncAllPublicCatalogs();
                  window.alert(
                    "Synchronization operation started. Please wait for a few minutes and refresh the page to see the updated list of catalogs and collections."
                  );
                }}
                noIcon
              >
                <CloudSyncIcon sx={{ mr: 1 }} />
                Synchronize
              </MDButton>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MDTypography variant="h4" >
                Add Public Catalog
              </MDTypography>
              <MDTypography variant="overline" >
                Bacon ipsum dolor amet pancetta hamburger doner meatloaf pork
                loin, kielbasa turducken sausage prosciutto frankfurter biltong
                beef tenderloin jowl buffalo.
              </MDTypography>
              <br></br>
              <AddPublicCatalog />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 3, display: "flex", flexDirection: "column" }}>
              <MDTypography variant="h4" >
                Public Catalogs
              </MDTypography>
              <MDTypography variant="overline" >
                Bacon ipsum dolor amet pancetta hamburger doner meatloaf pork
                loin, kielbasa turducken sausage prosciutto frankfurter biltong
                beef tenderloin jowl buffalo.
              </MDTypography>
              <Table
                columns={catalogsColumns}
                gray
                data={catalogs}
                rowClickAction={(row, table) => {}}
                rowsPerPage={20}
                title="Load Operations"
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 3, display: "flex", flexDirection: "column" }}>
              <MDTypography variant="h4" >
                Public Collections
              </MDTypography>
              <MDTypography variant="overline" >
                Bacon ipsum dolor amet pancetta hamburger doner meatloaf pork
                loin, kielbasa turducken sausage prosciutto frankfurter biltong
                beef tenderloin jowl buffalo.
              </MDTypography>
              <Table
                columns={paramsColumnsPublic}
                gray
                columnOrder={publicCollectionsTableColumnOrder}
                data={publicCollections}
                rowClickAction={(row, table) => {}}
                rowsPerPage={20}
                title="Public Collections"
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default PublicCatalogs;
