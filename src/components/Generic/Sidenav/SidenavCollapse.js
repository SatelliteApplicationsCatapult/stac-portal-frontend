// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// Mui icon
import Icon from "@mui/material/Icon";

// STAC Portal components
import MDBox from "components/MDBox";

import "./styles/style.scss";

function SidenavCollapse({ icon, name, active, ...rest }) {
  return (
    <ListItem component="li">
      <MDBox {...rest}  className="sidenav-collapse-item">
        <MDBox>
          {/* Icon */}
          {/* <Icon className="sidenav-collapse-item-icon">{icon}</Icon> */}
        </MDBox>
        <ListItemText primary={name}
          className="sidenav-collapse-item-text"
        />
      </MDBox>
    </ListItem>
  );
}

export default SidenavCollapse;
