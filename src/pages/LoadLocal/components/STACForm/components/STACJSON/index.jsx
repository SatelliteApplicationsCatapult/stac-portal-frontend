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

      console.log(':RECEIVED JSON:', json);
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
    };

    if (itemsMeta[selectedItem]) {
      if (itemsMeta[selectedItem].stac) {
        return;
      }

      setItemsMeta((prev) => ({
        ...prev,
        [selectedItem]: {
          ...prev[selectedItem],
          stac: {},
        },
      }));

      returnSTAC();
    }
  });

  return (
    <>
      <MDBox>
        <MDTypography variant="h6">STAC JSON</MDTypography>
      </MDBox>
      <input
        type="button"
        value="Generate STAC"
        onClick={() => {
          const stac = new GenerateSTAC(itemsMeta[selectedItem]);
          const json = stac.generate();
          console.log(json);
        }}
      />
      <MDBox>
        <TextField
          fullWidth
          multiline
          rows={30}
          value={JSON.stringify(itemsMeta[selectedItem]?.stac, null, 2)}
        />
      </MDBox>
    </>
  );
};

export default STACJSON;
