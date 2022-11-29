import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { routesConfig } from "../../routes/routesConfig";

import { Flex, H5, HeaderEl } from "../../styles/index.styled";

export const NavLinkEl = styled(NavLink)`
  margin-left: 60px;
  color: #000;
`;

const Header = () => {
  return (
    <HeaderEl>
      <Flex alignItems="end">
        <H5 >UpTrader</H5>
        <NavLinkEl to={routesConfig.home.path}>{routesConfig.home.title}</NavLinkEl>
      </Flex>
    </HeaderEl>
  );
};

export default Header;
