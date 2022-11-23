
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const MDBox = forwardRef(
  (
    {
      variant,
      bgColor,
      color,
      opacity,
      borderRadius,
      shadow,
      coloredShadow,
      ...rest
    },
    ref
  ) => <div ref={ref} {...rest} />
);


export default MDBox;
