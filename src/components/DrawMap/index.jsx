// State
import { useState } from "react";

// Leaflet
import * as L from "leaflet"; // This must be imported for use by react-leaflet
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { Icon, TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./map.scss";
import { Stack, Box } from "@mui/system";
import MDButton from "components/MDButton";

const DrawMap = ({
  AOI,
  setAOI,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [rectangleBounds, setRectangleBounds] = useState(null);
  const [showMap, setShowMap] = useState(true);

  const handleCreate = (e) => {
    const bounds = e.layer._bounds;

    const minX = bounds._southWest.lng;
    const minY = bounds._southWest.lat;
    const maxX = bounds._northEast.lng;
    const maxY = bounds._northEast.lat;

    const aoi =
      "POLYGON((" +
      minX +
      " " +
      minY +
      "," +
      maxX +
      " " +
      minY +
      "," +
      maxX +
      " " +
      maxY +
      "," +
      minX +
      " " +
      maxY +
      "," +
      minX +
      " " +
      minY +
      "))";

    setAOI(aoi);
  };

  const handleDraw = (e) => {
    // wait 50 ms
    setTimeout(() => {
      setRectangleBounds(null);
    }, 100);
  };

  const wktToArray = (wkt) => {
    wkt = wkt.replace("POLYGON", "");
    wkt = wkt.replace("((", "");
    wkt = wkt.replace("))", "");
    wkt = wkt.split(",");
    let output = [];
    wkt.forEach(function (e) {
      let ring = [];
      e = e.split(" ").reverse();
      e.forEach(function (i) {
        ring.push(parseFloat(i));
      });
      output.push(ring);
    });

    return output;
  };

  const handleDelete = () => {
    setAOI("");
  };

  const handleMount = () => {

    // Check if there is already an AOI
    if (AOI) {
      const aoi = wktToArray(AOI);
      setRectangleBounds(aoi);
    }
    //
  };
  return (
    <>
      <Stack spacing={2}>
        <div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="1em"
            flexWrap="wrap"
          >
            <TextField
              id="outlined-basic"
              label="AOI"
              style={{ margin: 8, width: "50%" }}
              // If showMap is true then set placeholder to "Click to draw"
              placeholder={"Click to draw AOI on the map"}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={AOI}
              variant="outlined"
              onChange={(e) => setAOI(e.target.value)}
              onClick={() => {
                setShowMap(true);
                // Enable draw tool
                const drawTool = document.getElementsByClassName(
                  "leaflet-draw-draw-rectangle"
                );
                if (drawTool.length === 1) {
                  // Click but dont focus
                  drawTool[0].click();

                  // Refoucs on AOI
                  const aoi = document.getElementById("outlined-basic");
                  aoi.focus();
                }
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                renderInput={(params) => <TextField {...params} />}
                className="date-picker"
              />
              <DatePicker
                label="End Date"
                value={endDate}
                // allow time
                
                onChange={(e) => setEndDate(e)}
                renderInput={(params) => <TextField {...params} />}
                className="date-picker"
              />
            </LocalizationProvider>
            <MDButton
              variant="contained"
              color="info"
              onClick={() => {
                // Hide map
                setShowMap(false);
              }}
            >
              <Icon>search</Icon> Search
            </MDButton>
          </Box>
        </div>
        {showMap && (
          <div style={{ height: "25em", width: "100%" }}>
            <MapContainer center={[51.505, -0.09]} zoom={7}>
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={handleCreate}
                  onDeleted={handleDelete}
                  onMounted={handleMount}
                  onDrawStop={handleDraw}
                  draw={{
                    rectangle: true,
                    polyline: false,
                    polygon: false,
                    circle: false,
                    marker: false,
                    circlemarker: false,
                  }}
                  edit={{
                    edit: false,
                  }}
                />
              </FeatureGroup>

              {rectangleBounds && (
                <Polygon
                  positions={rectangleBounds}
                  pathOptions={{ color: "black" }}
                />
              )}

              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        )}

        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <MDButton
            variant="text"
            color="primary"
            // style hidden if showMap is false
            style={{ display: showMap ? "block" : "none" }}
            onClick={() => {
              // Hide the map
              setShowMap(!showMap);
            }}
          >
            {showMap ? "Hide Map" : "Show Map"}
          </MDButton>
        </Box>
      </Stack>
    </>
  );
};

export default DrawMap;
