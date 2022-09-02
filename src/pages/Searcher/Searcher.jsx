import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// STAC Portal components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
// STAC Portal example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Map
import DrawMap from "../../components/DrawMap";
import { useState } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// STAC Portal components

// STAC Portal examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";

const Searcher = () => {
  const [AOI, setAOI] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDTypography variant="overline" gutterBottom>
              Use the Area Downloader to choose a date range and geographic area
              to download STAC data from.
            </MDTypography>
          </Grid>
          <Grid item xs={12}>
            <MDBox>
              <DrawMap
                AOI={AOI}
                setAOI={setAOI}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </MDBox>
          </Grid>
        </Grid>

        <Card style={
          {marginTop: "1em"}
        }>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <MDBox>
              <MDTypography variant="h6" gutterBottom>
                Projects
              </MDTypography>
              <MDBox display="flex" alignItems="center" lineHeight={0}>
                <Icon
                  sx={{
                    fontWeight: "bold",
                    color: ({ palette: { info } }) => info.main,
                    mt: -0.5,
                  }}
                >
                  done
                </Icon>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                >
                  &nbsp;<strong>30 done</strong> this month
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox color="text" px={2}>
              <Icon
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                fontSize="small"
                onClick={openMenu}
              >
                more_vert
              </Icon>
            </MDBox>
            {renderMenu}
          </MDBox>
          <MDBox>
            <DataTable
              table={{ columns, rows }}
              showTotalEntries={false}
              isSorted={false}
              noEndBorder
              entriesPerPage={false}
            />
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
export default Searcher;
