// React
import { useState } from "react";

// Components
import MDTypography from "components/MDTypography";
import Item from "../Item";

// @mui components
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

// Styles
import "./style.scss";

const Items = ({ selectedMeta, items }) => {
  const [showAssets, setShowAssets] = useState(false);

  return (
    <>
      <div className="items">
        <div
          className="items__header"
          onClick={() => setShowAssets(!showAssets)}
          style={{
            backgroundColor: showAssets ? "#f5f5f5" : "transparent",
          }}
        >
          <MDTypography variant="h6" className="items__title">
            Assets ({items ? items.length : "0"})
          </MDTypography>

          {showAssets ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
        {showAssets && (
          <div className="items__body">
            {/* Loop through selectedMeta keys  */}
            {items &&
              items.length &&
              items.map((item) => {
                return (
                  <Item key={item.id} item={item} selectedMeta={selectedMeta} />
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Items;
