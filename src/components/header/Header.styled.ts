import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavLinkEl = styled(NavLink)`
  margin-left: 60px;
  color: #000;
`;

export const WrapperSearch = styled.div`
  margin-left: auto;
  position:relative;
`;

export const WrapperResultSearch = styled.div`
position:absolute;
border: #dfe1e6 2px solid;
background-color:#fff;
border-radius: 3px;
width:100%;
top:43px;
z-index:10;
padding:3px 4px;
`

export const ContainerTask = styled.div`
display:flex;
align-items:center;
width:100%
`