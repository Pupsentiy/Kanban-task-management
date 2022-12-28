import styled from "styled-components";

export const ButtonLoadFile = styled.label`
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  margin: 0;
  border-radius: 3px;
  border: none;
  padding: 6px 12px;
  color: #000;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  cursor: pointer;
  background: #091e420a;
  -webkit-transition: all 0.1s ease;
  transition: all 0.1s ease;
  box-sizing: border-box;
  &:active {
    border: none;
    font-size: 14px;
    color: #000;
    line-height: 20px;
  }

  &:hover {
    background: #5f9ea094;
  }
`;

export const WrapperInput = styled.div`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;