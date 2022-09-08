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
import { retrieveAllCollections } from "interface/collections";

// Table
import Table from "components/Table";

import { shortenDescription } from "./TableUtils";
import { FindMoreCollections } from "./Modals/FindMoreCollections";
import "./Updater.scss";

const Updater = () => {
  const [collections, setCollections] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Retrieve Collection Data
  useEffect(() => {
    async function getCollections() {
      let resp = await retrieveAllCollections();
      if (resp && resp.collections) {
        setCollections(resp.collections);
      }
    }
    getCollections();
  }, []);

  // Table Columns
  const collectionColumns = useMemo(() => [
    {
      accessorFn: (row) => {
        return row.title;
      },
      header: "Title",
      size: 200,
    },
    {
      accessorFn: (row) => {
        const shortenedDesd = shortenDescription(row.description);
        // Add a tooltip that shows the full description
        return (
          <CustomWidthTooltip
            title={row.description}
            disableTouchListener={false}
            disableFocusListener={false}
            enterDelay={1000}
          >
            <div>{shortenedDesd}</div>
          </CustomWidthTooltip>
        );
      },
      header: "Description",
      size: 180, //medium column
    },
    {
      accessorFn: (row) => {
        if (row.license) {
          return row.license.charAt(0).toUpperCase() + row.license.slice(1);
        }
        return row.license;
      },
      header: "License",
      size: 100, //medium column
    },
    {
      accessorFn: (row) => {
        // Access the providers and get the name. if there are more than 3, add a tooltip that shows the full list
        const providers = row.providers.map((provider) => provider.name);
        const shortenedProviders = providers.slice(0, 3);
        const tooltipText = providers.join(", ");
        return (
          <CustomWidthTooltip title={tooltipText}>
            <div>{shortenedProviders.join(", ")}</div>
          </CustomWidthTooltip>
        );
      },
      header: "Providers",
      size: 180, //medium column
    },
    {
      accessorKey: "stac_version",
      header: "STAC Version",
      size: 20,
    },
  ]);
  const columnOrder = [
    "Title",
    "Description",
    "License",
    "Providers",
    "stac_version",
  ];

  // Custom Tooltip Styling
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 1000,
    },
  });

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
              columns={collectionColumns}
              columnOrder={columnOrder}
              data={collections}
              toolbarButtons={[
                {
                  label: "New STAC Collection",
                  modalOpen: () => setCreateModalOpen(true),
                  icon: "add",
                  color: "primary",
                },
              ]}
              rowClickAction={(row, table) => {
                console.log("Clicked on row: ", row);
              }}
            />
            <FindMoreCollections
              columns={collectionColumns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Updater;
