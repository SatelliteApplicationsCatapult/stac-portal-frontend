
import { forwardRef } from "react";

const MDInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <input type="text" ref={ref} {...rest} />
));


export default MDInput;
