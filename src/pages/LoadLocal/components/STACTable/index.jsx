// Reac
import { useState, useEffect } from "react";
// @mui components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Styles
import "./style.scss";

import { groupFilesByID } from "pages/LoadLocal/utils";
import { JSONTree } from "react-json-tree";

const STACTable = ({ files, stac }) => {
  const [rows, setRows] = useState(files);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    // Get an array of all the unique item IDs and how many times they appear but not if item id is empty
    const itemIDs = groupFilesByID(files);
    setRows(itemIDs);
  }, [files]);

  return (
    <>
      {/* Split into two parts the left lists the item IDS, when clicked on show more on the right side */}
      <MDBox
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          border: "1px solid #54A19A60",
          borderRadius: "2px",
        }}
      >
        {/* Left Side */}
        <MDBox
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "30%",
            height: "100%",
          }}
        >
          <MDBox
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "0.4em 1em",
              borderBottom: "1px solid #54A19A60",
            }}
          >
            <MDTypography variant="h5">Items</MDTypography>
          </MDBox>
          {/* List all item IDs */}
          <MDBox
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            {rows.map((row) => {
              return (
                <MDBox
                  className={`stac-table-item-row ${
                    selectedId === row.itemID
                      ? "stac-table-item-row-selected"
                      : ""
                  }`}
                  key={row.itemID}
                  onClick={() => {
                    // Get all rows with the same item ID
                    const selectedRows = files.filter(
                      (file) => file.itemID === row.itemID
                    );
                    setSelectedRows(selectedRows);
                    setSelectedId(row.itemID);
                  }}
                >
                  <MDTypography variant="h6">{row.itemID}</MDTypography>
                  <MDBox>
                    <MDTypography variant="h6">{row.count}</MDTypography>
                  </MDBox>
                </MDBox>
              );
            })}
          </MDBox>
        </MDBox>
        {/* Right Side */}
        <MDBox
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "70%",
            height: "100%",
            boxSizing: "border-box",
            borderLeft: "1px solid #54A19A60",
          }}
        >
          <MDBox
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "0.4em 1em",
              borderBottom: "1px solid #54A19A60",
            }}
          >
            <MDTypography variant="h5">Files</MDTypography>
          </MDBox>
          {/* List all files */}
          <MDBox
            style={{
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
              padding: "1em",
              minHeight: "300px",
            }}
          >
            {/* If selected rows */}
            {selectedRows.length > 0 ? (
              // A scroll with max height 200px
              <>
                <MDTypography
                  variant="h6"
                  sx={{
                    marginBottom: "1em",
                  }}
                >
                  Assets
                </MDTypography>

                <MDBox
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "100%",
                    height: "100%",
                    overflowY: "scroll",
                    maxHeight: "200px",
                    border: "1px solid #54A19A60",
                    borderRadius: "5px",
                  }}
                >
                  {/* Map selectedRows, order by size */}
                  {selectedRows
                    .sort((a, b) => b.size - a.size)
                    .map((row) => {
                      return (
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "100%",
                            boxSizing: "border-box",
                            borderBottom: "0.2px solid #54A19A30",
                            padding: "0 2.5em",
                          }}
                        >
                          <MDTypography variant="overline">
                            {row.name}
                          </MDTypography>
                          <MDTypography variant="overline">
                            {row.size}
                          </MDTypography>
                        </MDBox>
                      );
                    })}
                </MDBox>

                {/* Massive text field that shows the JSON output */}
                <MDBox
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    marginTop: "1em",
                  }}
                >
                  <MDTypography
                    variant="h6"
                    sx={{
                      marginBottom: "1em",
                    }}
                  >
                    STAC Item Record
                  </MDTypography>{" "}
                  <MDBox
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      padding: "1em",
                      border: "1px solid #54A19A",
                      borderRadius: "5px",

                    }}
                  >
                    {/* {JSON.stringify(stac[selectedId], null, 2)} */}

                    <JSONTree
                      data={stac[selectedId]}
                      theme={{
                        scheme: "apathy",
                        // full width
                        // Padding 
                        // Border
                        tree: {
                          width: "100%",
                          padding: "1.5em",
                          boxSizing: "border-box",

                        },
                        
                      }}
                      invertTheme={true}
                      shouldExpandNode={() => true}
                    />
                  </MDBox>
                </MDBox>
              </>
            ) : (
              <MDTypography variant="overline">No files selected</MDTypography>
            )}
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};
export default STACTable;
