import styled from "styled-components";

export const CheckBoxEl = styled.div<{ activeInputDate: boolean }>`
  cursor:pointer;
  position: relative;
  flex-shrink: 0;
  border-radius: 2px;
  height: 16px;
  width: 16px;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  background-color: ${({ activeInputDate }) =>
    activeInputDate ? "#5f9ea0" : "#fafbfc"};
  box-shadow: ${({ activeInputDate }) =>
    activeInputDate ? "none" : "inset 0 0 0 2px #dfe1e6"};
`;