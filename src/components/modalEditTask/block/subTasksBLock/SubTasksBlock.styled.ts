import styled from "styled-components";
import { device } from "../../../../styles/device.styled";

export const WrapperSubTask = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px;
  border-radius: 3px;
  &:hover {
    background: #091e421c;
  }
  @media ${device.mobileL} {
    flex-direction:column;
  };
`;

export const ProgressBar = styled.div<{ progressTracking: number }>`
  width: ${(props) => props.progressTracking}%;
  height: 6px;
  background: #5f9ea094;
  border-radius: 3px;
  transition-duration: 0.14s;
  transition-property: width, background;
  transition-timing-function: ease-in;
`;