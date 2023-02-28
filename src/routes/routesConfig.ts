import DetailsPage from "../pages/detailsPage/DetailsPage";
import HomePage from "../pages/homePage/HomePage";

export type TRoutesConfig = {
  [key: string]: {
    title: string | null;
    path: string;
    component: () => JSX.Element;
  };
};

export const routesConfig: TRoutesConfig = {
  home: {
    title: "Home",
    path: "/Kanban-task-management",
    component: HomePage,
  },
  details: {
    title: null,
    path: "/Kanban-task-management/:id",
    component: DetailsPage,
  },
};
