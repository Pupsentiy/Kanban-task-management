import { FC } from "react";
import { TfiClose } from "react-icons/tfi";
import { PDiscriptionEl } from "../../styles/index.styled";
import { ModalNavigationEl, ModalNavigationHeader } from "./ModalNavigation.styled";
import { IModalNavigation } from "./ModalNavigation.types";

const ModalNavigation: FC<IModalNavigation> = ({ children, name, setClose }) => {
  const closeModalNavigation= () => {
    setClose(false);
  };
  return (
    <ModalNavigationEl>
      <ModalNavigationHeader>
        <PDiscriptionEl color="#5e6c84" margin="0 10px 0 0">
          {name}
        </PDiscriptionEl>
        <TfiClose cursor="pointer" fontSize="13px" onClick={closeModalNavigation} />
      </ModalNavigationHeader>
      <div>{children}</div>
    </ModalNavigationEl>
  );
};

export default ModalNavigation;
