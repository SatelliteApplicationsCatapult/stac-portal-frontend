import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import MDTypography from "components/MDTypography";
import "./style.scss";

import Item from "../Item";
import { useState } from "react";

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
