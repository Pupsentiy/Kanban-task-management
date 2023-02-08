import styled, { keyframes } from "styled-components";
import { device } from "../../styles/device.styled";
import { ContainerIcon, NavLinkEL } from "../../styles/index.styled";

const translateX = keyframes`
  0 {
    transform: translateX(10px);
    opacity: 0;
  }
  

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
 
`;

export const ListCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media ${device.tablet} {
    flex-direction: column;
  }
  &:hover ${ContainerIcon} {
    animation: ${translateX} 1s ease alternate;
    animation-fill-mode:forwards
  }
`;
export const LiCard = styled.li<{ width?: string }>`
  box-sizing: border-box;
  cursor: pointer;
  padding: 4px 8px;
  width: ${(props) => props.width || "25%"};
  @media ${device.tablet} {
    width: 100%;
  }
`;

export const WrapperCard = styled.div<{ background?: string }>`
  position: relative;
  border-radius: 3px;
  background-color: ${(props) => props.background || "#091e421c"};
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  -webkit-transition: all 0.5ms ease;
  transition: all 0.5ms ease;
  &:hover {
    background-color: ${(props) => props.background || "#091e421c"};
    opacity: 0.85;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ContainerIconEl = styled(ContainerIcon)`
  display: flex;
  z-index: 10;
  align-items: center;
  margin: 3px 0 0 0;
  padding: 2px 2px;
  &:hover {
    background: #ebecf0b8;
    border-radius: 3px;
  }
  transform: translateX(22px);

`;
export const NavLinkA = styled(NavLinkEL)`
  overflow: hidden;
`;
