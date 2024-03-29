import styled from "styled-components";
import { device } from "../../styles/device.styled";
import { Flex } from "../../styles/index.styled";

export const Modal = styled.div<{ active: boolean }>`
  width: 100%;
  padding: 20px 0;
  background-color: #000000d1;
  overflow-y: auto!important;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ active }) => (active === true ? "1" : "0")};
  pointer-events: ${({ active }) => (active === true ? `all` : `none`)};
  transition: 0.5s;
  z-index: 10;
  min-height: 100vh;
  @media ${device.tablet} {
    min-height: 100%;
  };
`;

export const ModalContent = styled.div<{ active: boolean }>`
  padding: 10px 5px;
  border-radius: 5px;
  background-color: #ecf1fb;
  min-height: 600px;
  width: 860px;
  transition: 0.5s all;
  transform: ${({ active }) => (active ? `scale(1)` : `scale(0.2)`)};
  margin:15px;
`;
export const ModalWrapperHeader = styled.div`
  padding: 5px 5px 8px;
  position: relative;
`;

export const ModalBodyWrapper = styled.div`
  padding: 5px 5px 8px;
  display: flex;
  width: 100%;
  flex-direaction: column;
`;

export const ModalOtherBlock = styled.div`
  width: 70%;
  padding: 5px 5px 0 0;
  @media ${device.tablet} {
    width: 100%;
  };
`;
export const WrapperNavigation = styled.div`
  position: relative;
  padding: 5px 5px 0 5px;
  width: 30%;
  @media ${device.tablet} {
    width: 40%;
  };
  @media ${device.mobileL} {
    width: 70%;
  };
`;

export const TaskDetailsBlock = styled.div`
  margin-left: 40px;
  display: flex;
  @media ${device.mobileM} {
    flex-direction:column;
  };
  @media ${device.mobileL} {
    margin:0;
  };
`;

export const WrapperExpirationDate = styled.div`
  display: flex;
  align-items: center;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  background-color: #5c5d5e21;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 14px;
  .overdue {
    background: #ec9488;
    margin-left: 5px;
    padding: 0 5px;
    border-radius: 3px;
  }
  .performed {
    background: #61bd4f;
    margin-left: 5px;
    padding: 0 5px;
    border-radius: 3px;
  }
`;

export const Marker = styled.div<{ background: string }>`
  background: ${(props) => props.background};
  width:60px;
  height: 27px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-radius: 3px 0 0 3px;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    left: 100%;
    border-top: 13.5px solid transparent;
    border-left: 15px solid ${(props) => props.background};
    border-bottom: 13.5px solid transparent;
  }
  white-space:nowrap;
`;

export const ContainerModal = styled(Flex)`
@media ${device.tablet} {
  flex-direction:column;
};
`