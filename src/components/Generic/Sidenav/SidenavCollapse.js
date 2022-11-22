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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// STAC Portal components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "components/Generic/Sidenav/styles/sidenavCollapse";

// STAC Portal context
import { useMaterialUIController } from "context";

function SidenavCollapse({ icon, name, active, ...rest }) {

  return (
    <ListItem component="li">
      Item

    </ListItem>
  );
}

export default SidenavCollapse;
