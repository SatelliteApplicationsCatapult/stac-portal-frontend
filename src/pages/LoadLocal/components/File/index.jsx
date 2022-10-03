import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

const File = ({ file, index, handleRemoveFile }) => {
  return (
    <MDBox
      key={file.name}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      mb={2}
      sx={{
        // Border for table row
        border: "1px solid #e0e0e0",
        borderRadius: "4px",
        // Padding for table row
        p: 1,
      }}
    >
      <MDButton onClick={() => handleRemoveFile(index)} sx={{
        marginRight : "20px"
      }}>
        {/* Icon for delete */}
        <Icon>delete</Icon>
      </MDButton>

      <MDTypography variant="h6" color="textSecondary">
        {file.name}
      </MDTypography>
    </MDBox>
  );
};

export default File;
