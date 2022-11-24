import {Icon} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import "./style.scss";

import Item from "../Item";
import {useState} from "react";

const Items = ({selectedMeta, items}) => {
  const [showAssets, setShowAssets] = useState(false);

  return (
    <>
      <div className="items">
        <div
          className="items__header"
          onClick={() => setShowAssets(!showAssets)}
          // If showAssets is true, change style
          style={{
            backgroundColor: showAssets ? "#f5f5f5" : "transparent",
          }}
        >
          <MDBox/>
          <MDTypography
            variant="h6"
            className="items__title"
            
          >
            Assets ({items ? items.length : "0"})
          </MDTypography>
          <Icon
            // Relatively positioned to the parent
            className="items__icon"
          >
            {showAssets ? "arrow_drop_up" : "arrow_drop_down"}
          </Icon>
        </div>
        {showAssets && (
          <div className="items__body">
            {/* Loop through selectedMeta keys  */}
            {items &&
              items.length &&
              items.map((item) => {
                return (
                  <Item key={item.id} item={item} selectedMeta={selectedMeta}/>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Items;
