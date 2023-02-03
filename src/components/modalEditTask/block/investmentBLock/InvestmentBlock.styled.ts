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

export const Preview = styled.div`
  background-color:#091e420a;
  background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
  width: 112px;
  height: 80px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  color: #5e6c84;
  font-size: 18px;
  font-weight: 700;
  margin-right:10px;
`;

export const WrapperNameFile = styled.div`
margin-bottom:6px;
`
