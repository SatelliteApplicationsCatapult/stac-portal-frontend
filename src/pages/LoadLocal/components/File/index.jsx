import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

const File = ({ file, index, handleRemoveFile }) => {
  return (
    <MDBox
      key={file.name}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "4px",
        p: 1,
      }}
    >
      <MDButton
        buttonType="delete"
        onClick={() => handleRemoveFile(index)}
        sx={{
          marginRight: "20px",
        }}
      >
        {/* Icon for delete */}
        <Icon>delete</Icon>
      </MDButton>

      <MDTypography variant="h6">{file.name}</MDTypography>
    </MDBox>
  );
};

export default File;
