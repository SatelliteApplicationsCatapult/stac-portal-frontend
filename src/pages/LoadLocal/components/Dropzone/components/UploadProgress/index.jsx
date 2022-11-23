import { Circle } from "rc-progress";
import axios from "axios";
import {
  useBatchAddListener,
  useItemProgressListener,
  useRequestPreSend,
  useUploady,
} from "@rpldy/uploady";
import { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
import "./style.scss";
import { Icon } from "@mui/material";

import { findProvider } from "pages/LoadLocal/loader/utils";

const UploadProgress = ({
  files,
  setFiles,
  uploads,
  setUploads,
  groupedDownloads,
  setGroupedDownloads,
}) => {
  const [stagedItems, setStagedItems] = useState([]);
  const [toDownload, setToDownload] = useState([]);

  const progressData = useItemProgressListener();
  const { processPending } = useUploady();

  // Add staged items to state
  useBatchAddListener((batch) => {
    console.log("Batch added", batch);
    for (const item of batch.items) {
      console.log(item.file.name);
    }
    setStagedItems((items) => items.concat(batch.items));
  });

  useRequestPreSend(async ({ items, options }) => {
    if (!items[0].file.item) {
      return;
    }
    let filename = items[0].file.name;
    filename = items[0].file.item + "_" + filename;

    const sasToken = await axios.get(
      `${process.env.REACT_APP_PORTAL_BACKEND_URL}/file/sas_token/${filename}/`
    );

    return Promise.resolve({
      options: {
        destination: {
          // url: `${process.env.REACT_APP_PORTAL_BACKEND_URL}/file/stac_assets/upload/`,
          url: sasToken.data.endpoint,
        },
        method: "PUT",
      },
      debug: true,
    });
  });

  // Validate files and check existance
  useEffect(() => {
    findProvider(stagedItems, setStagedItems, toDownload, setToDownload);
  }, [stagedItems]);

  // Activate upload
  useEffect(() => {
    if (toDownload.length > 0) {
      console.log("Downloadaaaa ::", toDownload);
      processPending();
    }
  }, [toDownload]);

  useEffect(() => {
    // Listen to toDownload and ensure that groupedDownloads is updated, but ensure no duplicates
    if (toDownload.length > 0) {
      let filesGroupedByItemId = toDownload.reduce((acc, file) => {
        // if itemId is not undefined
        if (file.file.item) {
          acc[file.file.item] = acc[file.file.item] || [];
          acc[file.file.item].push(file);
        }
        return acc;
      }, {});

      setGroupedDownloads(filesGroupedByItemId);
    }
  }, [toDownload]);

  if (progressData && progressData.completed) {
    const upload = uploads[progressData.id] || {
      name: progressData.url || progressData.file.name,
      progress: [0],
    };

    if (!~upload.progress.indexOf(progressData.completed)) {
      upload.progress.push(progressData.completed);

      setUploads({
        ...uploads,
        [progressData.id]: upload,
      });

      if (progressData.completed === 100) {
        setFiles((files) => [
          ...files,
          {
            name: progressData.file.name,
            size: progressData.file.size,
            type: progressData.file.type,
            itemId: progressData.file.item,
          },
        ]);
      }
    }
  }

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const objectEntries = Object.entries(uploads);
    let allEntries = [];

    // Loop through object ntries and make sure they're in toDownload array
    objectEntries.forEach((entry) => {
      const [key, value] = entry;
      const file = value.name;

      if (toDownload.length > 0) {
        // found an element that path ends with file
        const found = toDownload.find((element) => element.path.endsWith(file));
        if (found) {
          allEntries.push(entry);
        }
      }
    });

    setEntries(allEntries);
    // Create entries from uploads
  }, [uploads]);

  return (
    <>
      {/* Button that downloads all from staging */}
      <div className="upload-container">
        <div className="progress-container">
          {/* Header that says staging */}
          <div className="progress-header">
            <MDTypography variant="h6">
              Step 2 - Files awaiting Manifest ...
            </MDTypography>
          </div>

          <div className="progress-body">
            {stagedItems.map((item) => {
              return (
                <div key={item.id} className="progress-item">
                  {/* Icon for waiting */}
                  <Icon style={{ color: "#119F9A" }}>hourglass_empty</Icon>
                  <p>{item.file.name}</p>
                </div>
              );
            })}

            {/* if no items */}
            {stagedItems.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    // Gray and italics and small font
                    color: "#9E9E9E",
                    fontStyle: "italic",
                    fontSize: "1em",
                  }}
                >
                  No files uploaded
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Arrow pointing right */}
        <Icon style={{ color: "#119F9A", marginTop: "1em" }}>
          arrow_forward
        </Icon>

        <div className="progress-container">
          {/* Header that says uploading */}
          <div className="progress-header">
            <MDTypography variant="h6">
              Step 3 - Files uploaded from Manifest
            </MDTypography>
          </div>
          <div className="progress-body">
            {entries.map(([id, { progress, name }]) => {
              const lastProgress = progress[progress.length - 1];

              return (
                <div key={id} className="progress-item">
                  {lastProgress === 100 ? (
                    <Icon>check</Icon>
                  ) : (
                    <Circle
                      strokeWidth={5}
                      strokeColor={lastProgress === 100 ? "#00a626" : "#2db7f5"}
                      percent={lastProgress}
                      trailColor="#d9d9d9"
                      className="progress-circle"
                    />
                  )}

                  <p>{name}</p>
                </div>
              );
            })}

            {/* if no items */}
            {entries.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    // Gray and italics and small font
                    color: "#9E9E9E",
                    fontStyle: "italic",
                    fontSize: "1em",
                  }}
                >
                  No items detected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProgress;
