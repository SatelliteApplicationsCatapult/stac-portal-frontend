// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// STAC Portal components
import MDBox from "components/MDBox";

import "./styles/style.scss";

function SidenavCollapse({ icon, name, active, ...rest }) {
  return (
    <ListItem component="li">
      <MDBox {...rest} className="sidenav-collapse-item">
        <MDBox
          className="sidenav-collapse-item__icon"
        >
          {/* Icon */}
          {icon}
        </MDBox>
        <ListItemText primary={name} className="sidenav-collapse-item__text" />
      </MDBox>
    </ListItem>
  );
}

export default SidenavCollapse;
