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
        // Check if the collection is already downloaded
        const isDownloaded = collections.find(
          (collection) => collection.id === row.id
        );
        if (isDownloaded) {
          return <Icon>check</Icon>;
        }
        return (
          <MDBox component="button" onClick={() => {}}>
            Download
          </MDBox>
        );
      },
      header: "Downloaded",
    },
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
  ]);
  const columnOrder = ["Downloaded", "Title"];

  return (
    <MDBox>
      <Table
        columns={collectionColumns}
        columnOrder={columnOrder}
        data={collections}
        title="Collections"
      />
    </MDBox>
  );
};

export default PublicCollections;
