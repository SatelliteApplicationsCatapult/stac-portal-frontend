import { useEffect } from "react";
import { GenerateSTAC } from "interface/metadata";
import { Button, FormLabel, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

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
            loading: true,
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
              stac: json,
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
