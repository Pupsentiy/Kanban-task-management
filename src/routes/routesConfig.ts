import DetailsPage from "../pages/detailsPage/DetailsPage";
import HomePage from "../pages/homePage/HomePage";

export type TRoutesConfig = {
  [key: string]: {
    title: string | null;
    path: string;
    component: (props: any) => JSX.Element;
  };
};

export const routesConfig: TRoutesConfig = {
  home: {
    title: "Home",
    path: "/",
    component: HomePage,
  },
  details: {
    title: null,
    path: "/:id",
    component: DetailsPage,
  },
};
