// Create icon mui icons
import { Add, Delete, Edit } from "@mui/icons-material";

const MDButton = ({
  children,
  onClick,
  className,
  buttonType,
  // style
  style,
  noIcon,
  ...rest
}) => {
  // Add button type to className
  const buttonTypeClassName = buttonType ? `btn-${buttonType}` : "";
  // Add all classes to a string
  const classes = `btn ${buttonTypeClassName} ${className}`;

  return (
    <button className={classes} onClick={onClick} style={style}>
      {/* Icon */}
      {!noIcon && (
        <span className="btn-icon">
          {buttonType === "create" && <Add />}
          {buttonType === "delete" && <Delete />}
          {buttonType === "update" && <Edit />}
        </span>
      )}

      {children}
    </button>
  );
};

export default MDButton;
