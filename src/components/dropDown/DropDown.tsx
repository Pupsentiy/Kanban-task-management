import { FC, ReactNode } from "react";
import { TfiClose } from "react-icons/tfi";
import styled from "styled-components";
import { Flex, PDiscriptionEl } from "../../styles/index.styled";

export const DropDownEl = styled.section`
  position: absolute;
  will-change: top, left;
  top: 35px;
  left: 0px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  outline: 0;
  overflow: hidden;
  z-index: 5;
  padding: 10px;
  min-width: 273px;
`;

export const DropDownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #5e6c84;
  margin-bottom: 10px;
`;

export const DropDownBody = styled.div``;

export interface IDropDown {
  children: ReactNode;
  name: string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

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
      <DropDownBody>{children}</DropDownBody>
    </DropDownEl>
  );
};

export default DropDown;