import { FC } from "react";
import { TfiClose } from "react-icons/tfi";
import { PDiscriptionEl } from "../../styles/index.styled";
import { DropDownEl, DropDownHeader } from "./DropDown.styled";
import { IDropDown } from "./DropDown.types";

const DropDown: FC<IDropDown> = ({ children, name, setClose }) => {
  const closeDropDown = () => {
    setClose(false);
  };
  return (
    <DropDownEl>
      <DropDownHeader>
        <PDiscriptionEl color="#5e6c84" margin="0 10px 0 0">
          {name}
        </PDiscriptionEl>
        <TfiClose cursor="pointer" fontSize="13px" onClick={closeDropDown} />
      </DropDownHeader>
      <div>{children}</div>
    </DropDownEl>
  );
};

export default DropDown;
