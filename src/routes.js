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

import { Search, Collections, Update, Add, Storage, CloudDownload, CloudSync, VerifiedUser, Explore } from "@mui/icons-material";

const routes = [
  {
    type: "title",
    title: "SAC Catalog",
  },
  {
    type: "collapse",
    name: "Local Searcher",
    key: "local-searcher",
    icon: <Search />,
    route: "/local-searcher",
    component: <PrivateCollectionsSearcher />,
  },
  {
    type: "collapse",
    name: "Local Catalog",
    key: "local-catalog",
    icon: <Collections />,
    route: "/local-catalog",
    component: <DisplayCollections />,
  },
  {
    type: "collapse",
    name: "Update Collection",
    key: "updater",
    icon: <Update />,
    route: "/updater",
    component: <Updater />,
  },
  {
    type: "collapse",
    name: "Add Collection",
    key: "add-collection",
    icon: <Add />,
    route: "/add-collection",
    component: <AddPrivateCollection />,
  },

  {
    type: "collapse",
    name: "Load Local Data",
    key: "load-local-data",
    icon: <Storage />,
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
    icon: <CloudDownload />,
    route: "/public-catalogs",
    component: <PublicCatalogs />,
  },
  {
    type: "collapse",
    name: "Public Searcher",
    key: "searcher",
    icon: <Search />,
    route: "/searcher",
    component: <PublicCollectionsSearcher />,
  },
  {
    type: "collapse",
    name: "Load Status",
    key: "load-status",
    icon: <CloudSync />,
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
    icon: <VerifiedUser />,
    route: "/validator",
    component: <Validator />,
  },
  {
    type: "collapse",
    name: "STAC Browser",
    key: "stac-browser",
    icon: <Explore />,
    href: "https://ctplt-pda-rg-dev-stac-api-browser.azurewebsites.net/",
  },
];

// Array of all icons used
const icons = [

];


export default routes;
