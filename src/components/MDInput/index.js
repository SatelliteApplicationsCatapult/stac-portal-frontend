
import { forwardRef } from "react";

const MDInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <input className="form-input" ref={ref} {...rest} />

));


export default MDInput;
