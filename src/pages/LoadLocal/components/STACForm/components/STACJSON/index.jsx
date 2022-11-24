// React
import { useEffect } from "react";

// Interface
import { GenerateSTAC } from "interface/metadata";

// @mui components
import { TextField } from "@mui/material";

// Components
import MDBox from "components/MDBox";

const STACJSON = ({ itemsMeta, selectedItem, setItemsMeta }) => {
  useEffect(() => {
    const returnSTAC = async () => {
      const stac = new GenerateSTAC(itemsMeta[selectedItem]);
      const json = await stac.generate();

      if (json) {
        // Update the itemsMeta
        itemsMeta[selectedItem].json = json;

        // Update the state
        setItemsMeta((prev) => ({
          ...prev,
          [selectedItem]: {
            ...prev[selectedItem],
            json: json,
          },
        }));
      }
    };

    if (itemsMeta[selectedItem]) {
      if (itemsMeta[selectedItem].json) {
        return;
      }

      setItemsMeta((prev) => ({
        ...prev,
        [selectedItem]: {
          ...prev[selectedItem],
          json: {
            status: "Generating STAC JSON...",
          },
        },
      }));

      returnSTAC();
    }
  });

  return (
    <>
      <input
        type="button"
        value="Generate STAC"
        style={{
          backgroundColor: "#3f51b5",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={async () => {
          const stac = new GenerateSTAC(itemsMeta[selectedItem]);
          const json = await stac.generate();
          // Update the itemsMeta
          itemsMeta[selectedItem].stac = json;

          // Update the state
          setItemsMeta((prev) => ({
            ...prev,
            [selectedItem]: {
              ...prev[selectedItem],
              json: json,
            },
          }));
        }}
      />
      <MDBox>
        <TextField
          fullWidth
          multiline
          rows={30}
          value={JSON.stringify(itemsMeta[selectedItem]?.json, null, 2)}
        />
      </MDBox>
    </>
  );
};

export default STACJSON;
