import styled from "styled-components";

export const Modal = styled.div<{ active: boolean }>`
  width: 100%;
  padding: 20px 0;
  background-color: #000000d1;
  overflow-y: auto;
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
`;



export const ModalContent = styled.div<{ active: boolean }>`
  padding: 10px 5px;
  border-radius: 5px;
  background-color: #ecf1fb;
  min-height: 500px;
  width: 860px;
  transition: 0.5s all;
  transform: ${({ active }) => (active ? `scale(1)` : `scale(0.2)`)};
`;
export const ModalWrapperHeader = styled.div`
  padding: 5px 5px 8px;
  position: relative;
  height: 32px;
`;


export const ModalBodyWrapper = styled.div`
  padding: 5px 5px 8px;
  display: flex;
  width: 100%;
  flex-direaction: column;
`;

export const ModalOtherBlock = styled.div`
  width: 70%;
  padding: 15px 5px 0 0;
`;
export const ModalNavigation = styled.div`
  position: relative;
  padding: 0 5px;
  width: 30%;
`;

export const TaskDetailsBlock = styled.div`
margin-left:40px;
`

export const DedlineEl = styled.div`

`