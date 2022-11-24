import {Icon} from "@mui/material";
import MDTypography from "components/MDTypography";
import {useState} from "react";

const Item = ({item, selectedMeta}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="item">
        <div className="item__header" onClick={() => setShowInfo(!showInfo)}>
          {selectedMeta && selectedMeta[item.name] ? (
            <div className="item__header__tick">
              <Icon>done</Icon>
            </div>
          ) : (
            <div className="item__header__tick">
              {/* Loading */}
              <Icon>done</Icon>
            </div>
          )}

          <MDTypography
            variant="h6"
            sx={{
              userSelect: "none",
              fontWeight: "400",
              fontSize: "0.7em",
            }}
          >
            {item.name}
          </MDTypography>
        </div>
        {showInfo && selectedMeta[item.name] && selectedMeta[item.name].bands && (
          <div className="item__body">
            <div className="item__body__col">
              <MDTypography
                variant="h6"
                
                className="item__body__col__title"
              >
                Properties
              </MDTypography>
              {/* Properties */}
              {selectedMeta &&
                selectedMeta[item.name] &&
                selectedMeta[item.name].description && (
                  <MDTypography  >
                    {/* If this starts with https, then make it a link */}
                    {selectedMeta[item.name].description.startsWith("http") ? (
                      <a
                        href={selectedMeta[item.name].description}
                        target="_blank"
                        rel="noreferrer"
                        style={{color: "inherit"}}
                      >
                        {selectedMeta[item.name].description}
                      </a>
                    ) : (
                      selectedMeta[item.name].description
                    )}
                  </MDTypography>
                )}
            </div>
            <div className="item__body__col">
              <MDTypography
                variant="h6"
                
                className="item__body__col__title"
              >
                Bands
              </MDTypography>
              {/* Bands */}
              {selectedMeta &&
                selectedMeta[item.name] &&
                selectedMeta[item.name].bands &&
                selectedMeta[item.name].bands.map((band) => {
                  return (
                    <div className="item__body__col__band" key={band.name}>
                      <MDTypography  >
                        {band.band}
                      </MDTypography>

                      <MDTypography  >
                        {band.colorInterpretation}
                      </MDTypography>
                      <MDTypography  >
                        <p>{band.description}</p>
                      </MDTypography>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Item;
