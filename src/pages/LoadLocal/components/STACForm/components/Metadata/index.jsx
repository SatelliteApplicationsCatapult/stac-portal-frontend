import { FormLabel, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import { useState, useEffect } from "react";

import { generateSTAC } from "interface/metadata";

import "./style.scss";

const Metadata = ({ selectedMeta }) => {
  const [stac, setStac] = useState(null);

  useEffect(() => {
    if (selectedMeta) {
      generateSTAC(selectedMeta).then((stac) => {
        console.log("STAC", stac);
      });
    }
  }, [selectedMeta]);

  return (
    <>
      {/* Button that launches generate STAC */}
      <input
        type="button"
        value="Generate STAC"
        onClick={() => {
          generateSTAC(selectedMeta);
        }}
      />
      {/* Item ID */}
      <MDBox
        className="input"
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <FormLabel className="label">Item ID</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          name="id"
          id="id"
          placeholder="Item ID"
          disabled
        />
      </MDBox>

      {/* Extent */}
      <MDBox
        className="input"
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <FormLabel className="label">Extent</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          name="extent"
          id="extent"
          placeholder="Extent"
          disabled
        />
      </MDBox>

      {/* Source CRS */}
      <MDBox
        className="input"
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <FormLabel className="label">Source CRS</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          name="source_crs"
          id="source_crs"
          placeholder="Source CRS"
          disabled
        />
      </MDBox>

      {/* Destination CRS */}
      <MDBox
        className="input"
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <FormLabel className="label">Destination CRS</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          name="destination_crs"
          id="destination_crs"
          placeholder="Destination CRS"
          disabled
        />
      </MDBox>

      {/* Dates */}
      <MDBox
        className="input"
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <FormLabel className="label">Dates</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          name="dates"
          id="dates"
          placeholder="Dates"
          disabled
        />
      </MDBox>
    </>
  );
};

export default Metadata;
