import React, { useCallback, useMemo, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Delete, Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import {
  Box,
  Button,
  Icon,
  IconButton,
  MenuItem,
  Tooltip,
  tooltipClasses,
} from "@mui/material";

import { shortenDescription } from "./TableUtils";
import { FindMoreCollections } from "./Modals/FindMoreCollections";
import "./Updater.scss";

const Updater = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function getCollections() {
      let resp = await retrieveAllCollections();
      if (resp && resp.collections) {
        setCollections(resp.collections);
      }
    }
    getCollections();
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => []);
  const [validationErrors, setValidationErrors] = useState({});

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 1000,
    },
  });

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      console.log(`Got cell: ${cell}`);
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
      };
    },
    [validationErrors]
  );

  const collectionColumns = useMemo(() => [
    {
      accessorFn: (row) => {
        return row.title;
      },
      header: "Title",
      size: 200,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
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
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
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
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
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
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
      size: 180, //medium column
    },
    {
      accessorKey: "stac_version",
      header: "STAC Version",
      size: 20,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
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
                <MDTypography variant="h4">Updater</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <MaterialReactTable
              displayColumnDefOptions={{
                "mrt-row-actions": {
                  muiTableHeadCellProps: {
                    align: "center",
                  },
                  size: 120,
                },
              }}
              columns={collectionColumns}
              initialState={{
                columnOrder: [
                  "Title",
                  "Description",
                  "License",
                  "Providers",
                  "stac_version",
                  "mrt-row-actions",
                ],
                density: "compact",
              }}
              data={collections}
              editingMode="modal"
              enableEditing
              onEditingRowSave={handleSaveRowEdits}
              renderRowActions={({ row, table }) => (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Button
                  color="primary"
                  className="updater__custom-button"
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  <Icon fontSize="small">add</Icon>
                  New STAC Collection
                </Button>
              )}
              // Custom Styling
              muiTopToolbarProps={{
                sx: {
                  padding: 0,
                  margin: 0,
                },
              }}
              muiTableBodyRowProps={({ row }) => ({
                onClick: (event) => {
                  console.info(row);
                },
                sx: {
                  cursor: "pointer", //you might want to change the cursor too when adding an onClick
                  backgroundColor: "white",
                },
              })}
              muiTableHeadRowProps={{
                sx: {
                  backgroundColor: "#1A73E8",
                },
              }}
              muiTableHeadCellProps={{
                sx: {
                  color: "white!important",
                  alignItems: "center",
                },
                className: "muiTableHeadCell",
              }}
              muiTableContainerProps={{
                sx: {
                  padding: 0,
                  margin: 0,
                },
              }}
              muiTablePaperProps={{
                sx: {
                  boxShadow: "none",
                },
              }}
              muiBottomToolbarProps={{
                sx: {
                  boxShadow: "none",
                },
              }}
            />
            <FindMoreCollections
              columns={collectionColumns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Updater;
