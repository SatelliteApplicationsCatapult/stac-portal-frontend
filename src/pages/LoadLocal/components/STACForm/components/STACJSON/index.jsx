import { useEffect } from "react";
import { GenerateSTAC } from "interface/metadata";
import { Button, FormLabel, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const STACJSON = ({ itemsMeta, selectedItem, setItemsMeta }) => {
  useEffect( () => {
    const returnSTAC = async () => {
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
    };

    if (itemsMeta[selectedItem]) {
      if (itemsMeta[selectedItem].stac) {
        return;
      }

      // Create an empty placeholder
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

  console.log(itemsMeta[selectedItem]);

  return (
    <>
      <MDBox>
        <MDTypography variant="h6">STAC JSON</MDTypography>
      </MDBox>
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
