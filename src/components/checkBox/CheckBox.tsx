import { FC } from "react";
import styled from "styled-components";

import checked from "../../assets/img/checked.svg";

export const CheckBoxNoCheck = styled.div<{ activeInputDate: boolean }>`
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
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}

const CheckBox: FC<ICheckBox> = ({setActive,active}) => {
  return (
    <CheckBoxNoCheck
      onClick={() => setActive(!active)}
      activeInputDate={active}
    >
      <img src={checked} alt="checkBox" />
    </CheckBoxNoCheck>
  );
};

export default CheckBox;
