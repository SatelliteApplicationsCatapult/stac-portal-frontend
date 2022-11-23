import { forwardRef, createElement } from "react";

const MDTypography = forwardRef(
  (
    {
      color,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      children,
      variant,
      component,
      sx,
      ...rest
    },
    ref
  ) => {
    console.log("component", component);
    //if component is not defined, use the default one
    if (!component) {
      component = variant === "h1" ? "h1" : "p";
    }

    console.log('Variant', variant)

    return (
      <span ref={ref} {...rest}>
        {/* Component can be p or h2, h3 ,h6 etc. */}
        {createElement(
          component,
          {
            style: {
              color,
              fontWeight,
              textTransform,
              verticalAlign,
              textGradient,
              opacity,
              ...sx,
            },
          },
          children
        )}
      </span>
    );
  }
);

export default MDTypography;
