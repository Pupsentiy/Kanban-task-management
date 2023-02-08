import styled from "styled-components";
import { device } from "../../styles/device.styled";

export const ModalNavigationEl = styled.section`
  position: absolute;
  will-change: top, left;
  top: 35px;
  right: 0;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  outline: 0;
  overflow: hidden;
  z-index: 5;
  padding: 10px;
  min-width: 273px;
  @media ${device.tablet} {
    left:0;
    top:0;
  };
`;

export const ModalNavigationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #5e6c84;
  margin-bottom: 10px;
`;
