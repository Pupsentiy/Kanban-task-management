import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { NavLinkEL } from "../../styles/index.styled";

export const NavLinkEl = styled(NavLink)`
  margin-left: 60px;
  color: #000;
`;

export const NavLinkSelectTask = styled(NavLinkEL)`
  width: 100%;
  border:2px transparent solid;
  &:hover{
    background:#ebedef;
    border-radius:3px;
    border:2px #5f9ea094 solid;
  }
`;

export const WrapperSearch = styled.div`
  margin-left: auto;
  position: relative;
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
display:flex;
align-items:center;
width:100%

`;
