import { FC } from "react";

import { routesConfig } from "../../routes/routesConfig";

import { HeaderEl } from "../../styles/index.styled";
import TaskSearch from "../taskSearch/TaskSearch";
import { ContainerHeader, LinkLogo, NavLinkEl } from "./Header.styled";

const Header: FC = () => {
  return (
    <HeaderEl>
      <ContainerHeader alignItems="end">
        <LinkLogo to={routesConfig.home.path}>Kanban</LinkLogo>
        <NavLinkEl to={routesConfig.home.path}>
          {routesConfig.home.title}
        </NavLinkEl>
        <TaskSearch></TaskSearch>
      </ContainerHeader>
    </HeaderEl>
  );
};

export default Header;
