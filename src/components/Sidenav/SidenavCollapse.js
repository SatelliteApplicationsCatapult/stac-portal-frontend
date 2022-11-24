// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// STAC Portal components
import MDBox from "components/MDBox";
import { useState } from "react";

import "./styles/style.scss";

function SidenavCollapse({ icon, name, ...rest }) {
  const [active, setActive] = useState(false);

  return (
    <ListItem
      className="sidenav-collapse"
      component="li"
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <MDBox
        {...rest}
        className={`
        sidenav-collapse-item ${
          (active ? "sidenav-active" : "", rest.active ? "sidenav-current" : "")
        }
      `}
      >
        <MDBox className="sidenav-collapse-item__icon">{icon}</MDBox>
        <ListItemText
          primary={name}
          className={`sidenav-collapse-item__text 
        ${rest.active ? "sidenav-collapse-item__text-active" : ""}`}
        />
      </MDBox>
    </ListItem>
  );
}

export default SidenavCollapse;
