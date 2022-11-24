import React, { useMemo } from "react";
import Table from "components/Table";
// Interface
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import CustomWidthTooltip from "components/Tooltip/CustomWidthTooltip";
import { callSelectiveIngester } from "interface/collections";
import { shortenDescription } from "../TableUtils";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const PublicCollections = ({
  collections,
  AOI,
  startDate,
  endDate,
}) => {
  // Table Columns

  const collectionColumns = useMemo(() => [
    {
      accessorFn: (row) => {
        return shortenDescription(row.title, 40);
      },
      header: "Title",
      size: 5,
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
            <div>{shortenDescription(row.description, 90)}</div>
          </CustomWidthTooltip>
        );
      },
      header: "Description",
      size: 180, //medium column
    },
    {
      accessorFn: (row) => {
        return row.catalog.name;
      },
      header: "Catalog",
      size: 200,
    },
    {
      accessorFn: (row) => {
        return (
          <MDButton
            buttonType="create"
            noIcon
            onClick={() => {
              const parentCatalogId = row.catalog.id;
              const collectionId = row.id;
              callSelectiveIngester(
                parentCatalogId,
                collectionId,
                AOI,
                startDate,
                endDate
              );
              alert(`Ingesting ${row.title} from ${row.catalog.name}...`);
            }}
          >
            <CloudDownloadIcon
              sx={{
                mr: 2,
              }}
            />
            Load
          </MDButton>
        );
      },
      header: "Load",
      size: 100,
    },
  ]);
  const columnOrder = ["Title", "ID", "stac_version"];

  return (
    <MDBox>
      <Table
        columns={collectionColumns}
        gray
        columnOrder={columnOrder}
        data={collections}
        title="Collections"
        rowsPerPage={20}
      />
    </MDBox>
  );
};

export default PublicCollections;
