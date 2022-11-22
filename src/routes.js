// STAC Portal pages
import Validator from "pages/Validator/Validator";
import Applications from "pages/Applications/Applications";
import LoadLocal from "pages/LoadLocal/LoadLocal";
import PrivateCollectionsSearcher from "pages/PrivateCollectionsSearcher/PrivateCollectionsSearcher";
import PublicCollectionsSearcher from "pages/PublicCollectionsSearcher/PublicCollectionsSearcher";
import Updater from "pages/Updater/Updater";
import LoadStatuses from "pages/LoadStatuses/LoadStatuses";
import DisplayCollections from "pages/DisplayCollections/DisplayCollections";
import PublicCatalogs from "pages/PublicCatalogs/PublicCatalogs";
import AddPrivateCollection from "pages/AddPrivateCollection/AddPrivateCollection";
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "title",
    title: "SAC Catalog",
  },
  {
    type: "collapse",
    name: "Local Searcher",
    key: "local-searcher",
    icon: <Icon fontSize="small">search</Icon>,
    route: "/local-searcher",
    component: <PrivateCollectionsSearcher />,
  },
  {
    type: "collapse",
    name: "Local Catalog",
    key: "local-catalog",
    icon: <Icon fontSize="small">collections</Icon>,
    route: "/local-catalog",
    component: <DisplayCollections />,
  },
  {
    type: "collapse",
    name: "Update Collection",
    key: "updater",
    icon: <Icon fontSize="small">update</Icon>,
    route: "/updater",
    component: <Updater />,
  },
  {
    type: "collapse",
    name: "Add Collection",
    key: "add-collection",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/add-collection",
    component: <AddPrivateCollection />,
  },

  {
    type: "collapse",
    name: "Load Local Data",
    key: "load-local-data",
    icon: <Icon fontSize="small">storage</Icon>,
    route: "/load-local-data",
    component: <LoadLocal />,
  },

  {
    type: "title",
    title: "Public Sources",
  },
  {
    type: "collapse",
    name: "Public Catalogs",
    key: "public-catalogs",
    icon: <Icon fontSize="small">cloud_download</Icon>,
    route: "/public-catalogs",
    component: <PublicCatalogs />,
  },
  {
    type: "collapse",
    name: "Public Searcher",
    key: "searcher",
    icon: <Icon fontSize="small">search</Icon>,
    route: "/searcher",
    component: <PublicCollectionsSearcher />,
  },
  {
    type: "collapse",
    name: "Load Status",
    key: "load-status",
    icon: <Icon fontSize="small">cloud_sync</Icon>,
    route: "/load-status",
    component: <LoadStatuses />,
  },

  {
    type: "title",
    title: "Utilities",
  },
  {
    type: "collapse",
    name: "STAC Validator",
    key: "validator",
    icon: <Icon fontSize="small">verified_user</Icon>,
    route: "/validator",
    component: <Validator />,
  },
  {
    type: "collapse",
    name: "STAC Browser",
    key: "stac-browser",
    icon: <Icon fontSize="small">explore</Icon>,
    href: "https://ctplt-pda-rg-dev-stac-api-browser.azurewebsites.net/",
  },
];
export default routes;
