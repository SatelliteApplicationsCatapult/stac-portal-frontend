import React, { useMemo, useState, useEffect } from "react";
import Table from "components/Table";

// Interface
import MDBox from "components/MDBox";
import { Icon } from "@mui/material";
import CustomWidthTooltip from "components/Tooltip/CustomWidthTooltip";

import { shortenDescription } from "../TableUtils";

const PublicCollections = ({ collections, setCollections }) => {
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
        // catalog url
        return row.catalog.url;
      },
      header: "Catalog URL",
      size: 200,
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
