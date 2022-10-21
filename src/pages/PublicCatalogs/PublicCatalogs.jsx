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

const PublicCatalogs = () => {
  const [catalogs, setCatalogs] = useState([]);
  useEffect(() => {
    async function getCatalogs() {
      const data = []
      setCatalogs(data);
    }
    getCatalogs();
  }, []);
  const catalogsColumns = useMemo(() => [
    {
      accessorFn: (row) => {
        return row.id;
      },
      header: "Catalog ID",
      size: 100,
    },
  ]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4">Public Catalogs</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Table
              columns={catalogsColumns}
              gray
              data={catalogs}
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

export default PublicCatalogs;