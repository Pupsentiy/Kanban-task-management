import { FC, useState } from "react";
import { BsPinAngle } from "react-icons/bs";
import styled from "styled-components";
import { ITask } from "../../../store/reducers/createCardProjectReducer";
import { ContainerIcon, Flex, H6 } from "../../../styles/index.styled";
import Button from "../../button/Button";
import Input from "../../input/Input";

export interface IInvestment {
  task: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
}

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

const Investment: FC<IInvestment> = ({ task, setTask }) => {
  const [loadFiles,setLocadFiles] = useState()
  console.log(loadFiles)
  return (
    <Flex alignItems="top" margin="5px 0">
      <ContainerIcon>
        <BsPinAngle fontSize="22px" />
      </ContainerIcon>
      <Flex
        flexDirection="column"
        margin="0 0 0 40px"
        maxWidth="552px"
        width="100%"
      >
        <Flex alignItems="center" padding="12px 0">
          <H6>Вложения</H6>
        </Flex>
        <Flex margin="0 0 10px 0" position="relative">
          <ButtonLoadFile htmlFor="investment">
            Прикрепить файл
            <WrapperInput>
              <Input
                fontSize="15px"
                height="36px"
                type="file" //
                id="investment"
                onChange={(e:any) => setLocadFiles(e.target.files[0])}
              />
            </WrapperInput>
          </ButtonLoadFile>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Investment;
