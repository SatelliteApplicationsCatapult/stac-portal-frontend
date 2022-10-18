import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import {
  retrieveAllCollections,
  createNewCollection,
} from "interface/collections";
import { useState, useEffect } from "react";

import "./style.scss";
import MDInput from "components/MDInput";

const CollectionSelect = ({ selectedCollection, setSelectedCollection }) => {
  const [collections, setCollections] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    id: "",
    description: "",
    license: "",
    stac_version: "",
  });

  useEffect(() => {
    const getCollections = async () => {
      const allCollections = await retrieveAllCollections();
      const collectionsFormatted = allCollections.collections.map(
        (collection, index) => {
          return {
            label: collection.title,
            id: index,
          };
        }
      );
      setCollections(collectionsFormatted);
    };
    getCollections();
  }, []);

  const createCollection = () => {
    createNewCollection(newCollection);
  };

  return (
    <>
      {/* Either select an existing selection or create a new one */}

      {/* First box is to choose existing collection using a dropdown which is searchable */}
      <MDBox display="flex" flexDirection="row" width="100%">
        <MDBox display="flex" flexDirection="column" mb={2} width="100%">
          <MDTypography variant="h6" color="textSecondary">
            Choose an existing collection
          </MDTypography>
          <MDTypography variant="body2" mb={2}>
            Choose a collection from your organisation's existing Catalog.
          </MDTypography>
          <MDBox
            display="flex"
            flexDirection="column"
            width="30%"
            minWidth="450px"
          >
            <Autocomplete
              options={collections}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Choose Collection" />
              )}
              onChange={(event, value) => {
                setSelectedCollection(value);
              }}
            />
          </MDBox>
        </MDBox>

        {/* Arrow */}
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="20%"
        >
          <MDTypography
            variant="h6"
            sx={{
              color: "#119F9A",
            }}
          >
            OR
          </MDTypography>
        </MDBox>

        {/* Second box is to create a new collection */}
        <MDBox display="flex" flexDirection="column" mb={2} width="100%">
          <MDTypography variant="h6" color="textSecondary">
            Create a new collection
          </MDTypography>
          <MDTypography variant="body2" mb={2}>
            Create a new collection to add to your organisation's existing
            Catalog.
          </MDTypography>
          <MDBox
            display="flex"
            flexDirection="column"
            width="30%"
            minWidth="450px"
          >
            <MDButton
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log("Create new collection");
                setOpenModal(true);
              }}
              sx={{ width: "30%" }}
            >
              Create
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>

      {/* Modal to create a new collection */}
      {openModal && (
        <MDBox
          className="modal"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <MDBox
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MDTypography variant="h6" color="textSecondary">
              Create a new collection
            </MDTypography>
            <MDTypography variant="body2" mb={2}>
              Create a new collection to add to your organisation's existing
              Catalog.
            </MDTypography>
            <MDBox
              display="flex"
              flexDirection="column"
              width="30%"
              minWidth="450px"
            >
              {/* Form with collection name */}
              {/* Input */}
              <MDInput
                label="Collection Name"
                placeholder="Enter collection name"
                onChange={(event) => {
                  setNewCollection({
                    ...newCollection,
                    id: event.target.value,
                  });
                }}
                autoComplete="off"
                autoFocus={true}
                sx={{ mb: 2 }}
              />

              {/* Description */}
              <MDInput
                label="Description"
                placeholder="Enter description"
                onChange={(event) => {
                  setNewCollection({
                    ...newCollection,
                    description: event.target.value,
                  });
                }}
                autoComplete="off"
                sx={{ mb: 2 }}
              />

              {/* License */}
              {/* Dropdown */}
              <MDInput
                label="License"
                placeholder="Enter license"
                onChange={(event) => {
                  setNewCollection({
                    ...newCollection,
                    license: event.target.value,
                  });
                }}
                autoComplete="off"
                sx={{ mb: 2 }}
              />

              {/* STAC Version */}
              {/* Dropdown */}
              <MDInput
                label="STAC Version"
                placeholder="Enter STAC version"
                onChange={(event) => {
                  setNewCollection({
                    ...newCollection,
                    stac_version: event.target.value,
                  });
                }}
                autoComplete="off"
                sx={{ mb: 2 }}
              />

              {/* Button */}
              <MDButton
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpenModal(false);
                  createCollection();
                }}
                sx={{ width: "30%", mt: 2 }}
              >
                Create
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </>
  );
};

export default CollectionSelect;
