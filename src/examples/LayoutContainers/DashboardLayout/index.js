import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// STAC Portal components
import MDBox from "components/MDBox";

// STAC Portal context
import { useMaterialUIController, setLayout } from "context";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  return (
    <MDBox
      sx={({ transitions }) => ({
        p: 3,
        position: "relative",
        marginLeft: "274px",
        transition: transitions.create(["margin-left", "margin-right"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      })}
    >
      {children}
    </MDBox>
  );
}

export default DashboardLayout;
