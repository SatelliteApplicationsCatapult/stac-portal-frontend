import { Circle } from "rc-progress";

import { useItemProgressListener } from "@rpldy/uploady";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import {
  useUploady,
  useBatchAddListener,
  useRequestPreSend,
} from "@rpldy/uploady";
import "./style.scss";
import { Icon } from "@mui/material";

import { findProvider } from "pages/LoadLocal/loader/utils";

const UploadProgress = ({ files, setFiles }) => {
  const [uploads, setUploads] = useState({});
  const [stagedItems, setStagedItems] = useState([]);
  const [toDownload, setToDownload] = useState([]);

  const progressData = useItemProgressListener();
  const { processPending } = useUploady();

  // Add staged items to state
  useBatchAddListener((batch) => {
    setStagedItems((items) => items.concat(batch.items));
  });

  useRequestPreSend(({ items, options }) => {
    
    return Promise.resolve({
      options: {
        params: {
          batchSize: items.length,
          itemIds: items.map((item) => item.file.item),
        },
      },
    });
  });

  // Validate files and check existance
  useEffect(() => {
    findProvider(stagedItems, setStagedItems, toDownload, setToDownload);
  }, [stagedItems]);

  // Activate upload
  useEffect(() => {
    if (toDownload.length > 0) {
      processPending(
        toDownload.map((file) => ({
          file: file.file,
        }))
      );
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

  const entries = Object.entries(uploads);

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
                    fontSize: "0.8em",
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
                    fontSize: "0.8em",
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
