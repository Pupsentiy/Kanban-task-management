import { FC } from "react";
import styled from "styled-components";

import checked from "../../assets/img/checked.svg";

export const CheckBoxNoCheck = styled.div<{ activeInputDate: boolean }>`
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

export interface ICheckBox {
  active: boolean;
  onClick:(() => void)
}

const CheckBox: FC<ICheckBox> = (props) => {

  

  return (
    <CheckBoxNoCheck
      onClick={() => props.onClick()}
      activeInputDate={props.active}
    >
      <img src={checked} alt="checkBox" />
    </CheckBoxNoCheck>
  );
};

export default CheckBox;
