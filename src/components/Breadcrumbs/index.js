import { Home, ChevronRight } from "@mui/icons-material";
import "./style.scss";

const Breadcrumbs = ({ page }) => {
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <div
          className="breadcrumbs__container__item"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          <Home />
          <span className="breadcrumbs__container__item__text">Home</span>
        </div>
        <div className="breadcrumbs__container__item">
          <ChevronRight />
          <span className="breadcrumbs__container__item__text">{page}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
