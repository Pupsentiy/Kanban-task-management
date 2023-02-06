import styled from "styled-components";
import { device } from "../../styles/device.styled";

export const ContainerColumn = styled.div<{
  borderColor: string;
  background?: string;
  minHeight?: string;
}>`
  background: ${(props) => props.background || "#ebecf0"};
  margin: 0 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 6px 10px;
  border-top: ${(props) => `5px ${props.borderColor} solid` || "none"};
  transition: 0.2s all;
  min-height: ${(props) => props.minHeight || "0"};
  @media ${device.laptopL} {
    margin: 0 15px;
  }
  @media ${device.laptop} {
    margin: 0 8px;
  }
  max-height: 83vh;
`;
export const HeaderColumn = styled.div`
  padding: 6px 10px;
`;

export const OtherColumn = styled.div`
  padding: 12px 10px 0 10px;
  border-top: 1px solid #000;
  max-height: 655px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const InputTitleTaskEl = styled.textarea`
  width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 40px;
  padding: 4px 5px 0 5px;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  box-shadow: 0px 0px 4px 1px #aba6a6;
  &:focus {
    box-shadow: inset 0 0 0 2px #5f9ea0;
    border-radius: 3px;
  }
`;

export const ContainerTaks = styled.div<{ background: string }>`
  background: ${(props) => props.background || "#fff"};
  min-height: 20px;
  border-radius: 2px;
  margin-bottom: 10px;
  padding: 10px 8px 2px;
  box-shadow: 0px 0px 2px 1px #aba6a6;
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    background: #dfdbdb;
    .icon {
      display: block;
    }
  }
  
`;

export const ContentTask = styled.div`
  margin: 0 0 4px 0;
`;

export const Marker = styled.div<{ background: string }>`
  background: ${(props) => props?.background || "transparent"};
  margin-bottom: 10px;
  padding-right: 0;
  padding-left: 0;
  height: 8px;
  width: 40px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ContainerOtherDetaiels = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerTimeDedline = styled.div<{ background: string }>`
  margin: 0 4px 4px 0;
  align-items: center;
  display: flex;
  border-radius: 3px;
  min-height: 20px;
  max-width: 100%;
  background: ${(props) => props.background};
  padding: 0 3px;
`;
