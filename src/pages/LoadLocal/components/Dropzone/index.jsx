import { useCallback, forwardRef, useState } from "react";
import Uploady from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import UploadProgress from "./components/UploadProgress";
import { asUploadButton } from "@rpldy/upload-button";

import "./style.scss";

const Dropzone = ({ files, setFiles, uploads, setUploads, groupedDownloads, setGroupedDownloads}) => {
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

  return (
    <Uploady
      autoUpload={false}
      destination={{
        url: `${process.env.REACT_APP_PORTAL_BACKEND_URL}/file/stac_assets/upload/`,
        grouped: true,
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
