import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { device } from "../../styles/device.styled";
import { Flex, NavLinkEL } from "../../styles/index.styled";

export const NavLinkEl = styled(NavLink)`
  margin-left: 60px;
  color: #000;
  &:hover {
    color: #fff;
  }
  @media ${device.mobileL} {
    display: none;
  }
`;

export const LinkLogo = styled(NavLink)`
  libe-height: normal;
  text-shadow: 0 0 2px #fff, -1px -1px 0 hsl(80, 70%, 35%),
    -2px -2px 1px hsl(80, 70%, 35%), -2px -2px 2px hsl(80, 10%, 15%);
  font-size: 34px;
  line-height:32px;
  font-weight:600;
  color:#000;
  @media ${device.mobileL} {
    font-size: 30px;
  }
`;

export const NavLinkSelectTask = styled(NavLinkEL)`
  width: 100%;
  border: 2px #0000002b solid;
  border-radius: 3px;
  margin: 2px;
  &:hover {
    background: #ebedef;
    border-radius: 3px;
    border: 2px #5f9ea094 solid;
  }
`;

export const WrapperSearch = styled.div`
  margin-left: auto;
  position: relative;
  @media ${device.mobileL} {
    margin-bottom: 5px;
  }
`;

export const WrapperResultSearch = styled.div`
  position: absolute;
  border: #5f9ea094 2px solid;
  background-color: #fff;
  border-radius: 3px;
  width: 100%;
  top: 43px;
  z-index: 10;
  padding: 3px 4px;
`;

export const ContainerTask = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ContainerHeader = styled(Flex)`
  @media ${device.mobileL} {
    align-items: end;
  }
`;

export const WrapperInputHeader = styled.div`
width:250px;

@media ${device.mobileM} {
  width:auto;
}
`
