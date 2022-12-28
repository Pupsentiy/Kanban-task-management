import { FC } from "react";

import { ICheckBox } from "./CheckBox.types";

import { CheckBoxEl } from "./CheckBox.styled";
import checked from "../../assets/img/checked.svg";

const CheckBox: FC<ICheckBox> = (props) => {
  return (
    <CheckBoxEl onClick={() => props.onClick()} activeInputDate={props.active}>
      <img src={checked} alt="checkBox" />
    </CheckBoxEl>
  );
};

export default CheckBox;
