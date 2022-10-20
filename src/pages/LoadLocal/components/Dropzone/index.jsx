import { useCallback, forwardRef, useState, useEffect } from "react";
import Uploady from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import UploadProgress from "./components/UploadProgress";
import { asUploadButton } from "@rpldy/upload-button";
import { getAADToken } from "auth/auth";

import "./style.scss";

const Dropzone = ({
  files,
  setFiles,
  uploads,
  setUploads,
  groupedDownloads,
  setGroupedDownloads,
}) => {
  const clickableDropZone = forwardRef((props, ref) => {
    const { onClick, ...buttonProps } = props;

    const onZoneClick = useCallback(
      (e) => {
        if (onClick) {
          onClick(e);
        }
      },
      [onClick]
    );

    return (
      <UploadDropZone
        {...buttonProps}
        ref={ref}
        onDragOverClassName="active"
        extraProps={{ onClick: onZoneClick }}
        htmlDirContentParams={{ recursive: true }}
        grouped
        className="dropzone"
      >
        Drag and Drop Folder(s) Here
        <br />
        <small
          style={{ color: "gray", fontStyle: "italic", fontSize: "0.7em" }}
        >
          {" "}
          Please ensure that <b> Manifest</b> files are included{" "}
        </small>
      </UploadDropZone>
    );
  });

  const DropZoneButton = asUploadButton(clickableDropZone);

  const [AADToken, setAADToken] = useState("");

  // Every 10 minutes, get new AAD Token
  setInterval(async () => {
    const AADToken12 = await getAADToken();
    if (AADToken12) {
      console.log("Got new AAD Token", AADToken12);
      setAADToken(`Bearer ${AADToken12}`);
    } else {
      console.log("Could not get AAD Token");
      setAADToken("Bearer localhost");
    }
  }, 600000);

  // Get AAD Token on first load
  useEffect(() => {
    const getAADToken12 = async () => {
      const AADToken12 = await getAADToken();
      if (AADToken12) {
        console.log("Got new AAD Token", AADToken12);
        setAADToken(`Bearer ${AADToken12}`);
      } else {
        console.log("Could not get AAD Token");
        setAADToken("Bearer localhost");
      }
    };
    getAADToken12();
  }, []);

  return (
    <Uploady
      autoUpload={false}
      destination={{
        url: `${process.env.REACT_APP_PORTAL_BACKEND_URL}/file/stac_assets/upload/`,
        grouped: true,
        headers: {
          Authorization: AADToken,
        },
      }}
      multiple={true}
      maxRetries={2}
      maxFiles={99999}
    >
      <DropZoneButton />
      <UploadProgress
        files={files}
        setFiles={setFiles}
        uploads={uploads}
        setUploads={setUploads}
        groupedDownloads={groupedDownloads}
        setGroupedDownloads={setGroupedDownloads}
      />
    </Uploady>
  );
};

export default Dropzone;
