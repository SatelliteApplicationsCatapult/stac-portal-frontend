import React, { useMemo, useState, useEffect } from "react";

import Table from "components/Table";
// Interface
import CustomWidthTooltip from "components/Tooltip/CustomWidthTooltip";
import MDBox from "components/MDBox";

import { shortenDescription } from "../TableUtils";

const DownloadedCollections = ({ collections, setCollections }) => {
  console.log("Passed collections1", collections);
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
        const isPrivate = row.isPrivate;
        if (isPrivate === true) {
          return "Private collection";
        }
        return "Public collection";
      },
      header: "Type",
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
            <div>{shortenDescription(row.description)}</div>
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
      accessorKey: "stac_version",
      header: "STAC Version",
      size: 20,
    },
  ]);
  const columnOrder = [
    "Title",
    "Type",
    "Description",
    "License",
    "stac_version",
  ];

  return (
    <Table
      columns={collectionColumns}
      gray
      columnOrder={columnOrder}
      data={collections}
      title="Collections"
      rowsPerPage={20}
    />
  );
};

export default DownloadedCollections;
