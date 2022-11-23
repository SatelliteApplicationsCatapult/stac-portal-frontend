
import { forwardRef } from "react";

const MDBox = forwardRef(({ children, ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});


export default MDBox;
