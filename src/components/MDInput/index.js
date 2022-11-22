/**
=========================================================
* STAC Portal - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

const MDInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <input type="text" ref={ref} {...rest} />
));


export default MDInput;
