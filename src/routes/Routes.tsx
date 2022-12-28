import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { routesConfig } from "./routesConfig";

const InternalRoutes: FC = (): JSX.Element => {
  return (
    <Routes>
      {Object.values(routesConfig).map(
        ({ path, component: Component }, index: number) => {
          return <Route key={index} path={path} element={<Component />} />;
        }
      )}
    </Routes>
  );
};

export default InternalRoutes;
