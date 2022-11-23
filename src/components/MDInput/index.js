import { forwardRef } from "react";
import { Icon, TextField } from "@mui/material";

const MDInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  // <input className="form-input" ref={ref} {...rest} />
  <TextField
    error={error}
    disabled={disabled}
    helperText={error}
    InputProps={{
      endAdornment: (
        <Icon
          color={error ? "error" : success ? "success" : "inherit"}
          sx={{ mr: 1 }}
        ></Icon>
      ),
    }}
    className="form-input"
    size="small"
    // Placeholder font color
    InputLabelProps={{
      sx: {
        color: "#7B809A",
        fontSize: "14px",
      },
    }}
    inputProps={{
      style: {
        fontSize: "14px",
      },
    }}
    {...rest}
  />
));

export default MDInput;
