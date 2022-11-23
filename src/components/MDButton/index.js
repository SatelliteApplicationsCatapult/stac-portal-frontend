const MDButton = ({
  children,
  onClick,
  className,
  buttonType,
  // style
  style,
  ...rest
}) => {
  // Add button type to className
  const buttonTypeClassName = buttonType ? `btn-${buttonType}` : "";
  // Add all classes to a string
  const classes = `btn ${buttonTypeClassName} ${className}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      // style
      style={style}
    >
      {children}
    </button>
  );
};

export default MDButton;
