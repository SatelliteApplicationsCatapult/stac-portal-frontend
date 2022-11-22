
// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {
  const sidebarWidth = 250;

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = () => ({
    background: "red",
    transform: "translateX(0)",

    boxShadow: "none",
    marginBottom: "inherit",
    left: "0",
    width: sidebarWidth,
    transform: "translateX(0)",
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    background: "red",
    transform: `translateX(320px)`,

    boxShadow: "none",
    marginBottom: "inherit",
    left: "0",
    width: "96px",
    overflowX: "hidden",
    transform: "translateX(0)",
  });

  return {
    "& .MuiDrawer-paper": {
      border: "none",

      ...drawerCloseStyles(),
    },
  };
});
