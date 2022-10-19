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
import { CircularProgress } from "@mui/material";

const CollectionSelect = ({ selectedCollection, setSelectedCollection }) => {
  const [collections, setCollections] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    id: "",
    description: "",
  });
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const getCollections = async () => {
      const allCollections = await retrieveAllCollections();
      const collectionsFormatted = allCollections.map((collection, index) => {
        return {
          label: collection.id,
          id: collection.id,
        };
      });
      setCollections(collectionsFormatted);
    };
    getCollections();
  }, []);

  const createCollection = async () => {
    await createNewCollection(newCollection);

    // Get new collections
    const allCollections = await retrieveAllCollections();
    const collectionsFormatted = allCollections.map((collection, index) => {
      return {
        label: collection.id,
        id: collection.id,
      };
    });
    setCollections(collectionsFormatted);
    setOpenModal(false);
    setShowLoading(false);

    // Set selected collection
    setSelectedCollection(newCollection);
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
              sx={{
                width: "30%",
                minWidth: "200px",
                // backgroundColor: "#119F9A",
              }}
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
            {!showLoading ? (
              <>
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

                  {/* Button */}
                  <MDButton
                    variant="contained"
                    onClick={() => {
                      // Set show loading
                      // If input is empty
                      if (
                        newCollection.id === "" ||
                        newCollection.description === ""
                      ) {
                        alert("Please fill in all fields");
                        return;
                      }
                      setShowLoading(true);
                      createCollection();
                    }}
                    sx={{
                      width: "30%",
                      mt: 2,
                      backgroundColor: "#54A19A",
                      color: "white!important",
                      width: "100%",
                      // On hover
                      "&:hover": {
                        backgroundColor: "#66B08A",
                      },
                    }}
                  >
                    Create
                  </MDButton>
                </MDBox>
              </>
            ) : (
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <CircularProgress
                    // BLue
                    sx={{
                      color: "#54A19A",
                    }}
                  />
                  <MDTypography variant="h5" color="textSecondary" mt={2}>
                    Creating Collection...
                  </MDTypography>
                </MDBox>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      )}
    </>
  );
};

export default CollectionSelect;
