import { useEffect, useMemo, useState } from "react";

// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";

// STAC Portal components
import MDBox from "components/MDBox";

// STAC Portal example components
import Sidenav from "components/Generic/Sidenav";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

// STAC Portal routes
import routes from "routes";

// STAC Portal contexts
import {
  setMiniSidenav,
  setOpenConfigurator,
  useMaterialUIController,
} from "context";

import STAClogo from "assets/images/stac.png";

import "./assets/styles/base.scss";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { direction, layout, sidenavColor } =
    controller;

  console.log("Layout: ", layout);
  console.log("Direction: ", direction);
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });


  return (
    <>
      <Sidenav
        color={sidenavColor}
        brand={STAClogo}
        brandName="STAC Portal"
        routes={routes}

      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* The sidenav takes 300px, so use rest of the screen */}
        <div
          style={{
            flex: "1 1 auto",
            marginLeft: "300px",
            padding: "1rem",
            width: "calc(100% - 330px)",
            height: "100%",
          }}
        >
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/local-searcher" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
