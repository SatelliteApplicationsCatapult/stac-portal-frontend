import MDBox from "components/MDBox";
import DashboardLayout from "layout/LayoutContainers/DashboardLayout";

import Iframe from "react-iframe";
import "./style.scss";

const PrivateCollectionsSearcher = () => {
  console.log('REACT_APP_PORTAL_STAC_API_BROWSER_URL', process.env.REACT_APP_PORTAL_STAC_API_BROWSER_URL);
  return (
    <>
      <DashboardLayout>
        <MDBox
          style={{
            width: "100%",
            height: "83vh",
          }}
        >
          <Iframe
            src={process.env.REACT_APP_PORTAL_STAC_API_BROWSER_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            id="stac-browser-iframe"
            onError={(e) => {
              console.log(e);
            }}
          />
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default PrivateCollectionsSearcher;
