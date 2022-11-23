
// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    // background a graident from gray to black down
    background: "linear-gradient(180deg, #3F3F46 0%, #000000 100%)",
    margin: "1em",
    width: "200px",
    height: "calc(90vh)",
    borderRadius: "10px",
    overflowX: "hidden",
    transform: "translateX(10px)",
    padding: "2em",
  });

  return {
    "& .MuiDrawer-paper": {
      border: "none",

      ...drawerCloseStyles(),
    },
  };
});
