import React, { useMemo, useState, useEffect } from "react";

import Table from "components/Table";
// Interface
import CustomWidthTooltip from "components/Tooltip/CustomWidthTooltip";
import MDBox from "components/MDBox";

import { shortenDescription } from "../TableUtils";

const DownloadedCollections = ({ collections, setCollections }) => {
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

  return (
    <Table
      columns={collectionColumns}
      gray
      columnOrder={columnOrder}
      data={collections}
      title="Collections"
      // Button
      toolbarButtons={[
        {
          label: "Downloaded Collections",
          onCustomClick: () => {
            setCollections([]);
          },
          icon: "lock",
        },
        {
          label: "Public Collections",
          onCustomClick: () => {
            setCollections([]);
          },
          icon: "public",
        },
      ]}
      rowsPerPage={20}
    />
  );
};

export default DownloadedCollections;
