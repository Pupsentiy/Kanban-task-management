import styled from "styled-components";
import { device } from "../../styles/device.styled";

export const ListCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media ${device.tablet} {
    flex-direction:column;
  }
`;
export const LiCard = styled.li<{ width?: string }>`
  box-sizing: border-box;
  cursor: pointer;
  padding: 4px 8px;
  width: ${(props) => props.width || "25%"};
  @media ${device.tablet} {
    width:100%;
  }
`;

export const WrapperCard = styled.div<{ background?: string }>`
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
    opacity: 0.9;
    scale: 1.01;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
`;