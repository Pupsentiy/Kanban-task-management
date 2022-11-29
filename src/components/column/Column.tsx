import React, { FC, useState } from "react";
import styled from "styled-components";
import { Flex, H6, PDiscriptionEl, WrapperEl } from "../../styles/index.styled";
import { AiOutlinePlus } from "react-icons/ai";
import { ITask } from "../../store/reducers/createCardProjectReducer";
import { ButtonEl } from "../button/Button";
import { TfiClose } from "react-icons/tfi";
import { CiEdit } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import { setCreateTask, setEditTask, setOpenEditTaskModal, setSelectTask } from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";
import { NavLink, useParams } from "react-router-dom";
import ModalEditTask from "../modalEditTask/ModalEditTask";
export const ContainerColumn = styled.div<{ borderColor: string }>`
  background: #ebecf0;
  width: 33.33%;
  height: 100%;
  margin: 0 4px;
  box-shadow: 0px 0px 12px 1px #aba6a6;
  border-radius: 5px;
  padding: 6px 10px;
  border-top: ${(props) => `5px ${props.borderColor} solid` || "none"};
`;
export const HeaderColumn = styled.div`
  padding: 6px 10px;
`;

export const OtherColumn = styled.div`
  padding: 12px 10px 6px 10px;
  border-top: 1px solid #000;
  min-height: 55px;
`;

export const InputTitleTaskEl = styled.textarea`
  width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 40px;
  padding: 2px 5px 0 5px;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  box-shadow: 0px 0px 4px 1px #aba6a6;
`;

export const ContainerTaks = styled.div`
  background: #f5f5dc;
  min-height: 20px;
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 6px 8px 2px;
  box-shadow: 0px 0px 3px 1px #aba6a6;
  cursor:pointer;
  &:hover {
    background: #e1e1c3;
    .icon {
      display: block;
    }
  }
`;

export const ContentTask = styled.div`
  margin: 0 0 4px 0;
`;

export interface IColumnProps {
  project: ITask[];
  title: string;
  // id:string;
  //styles
  borderColor: string;
}

const Column: FC<IColumnProps> = ({borderColor,project,title}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addInput, setAddInput] = useState<boolean>(false);
  const [addTitle, setAddTitle] = useState<string>("");

  const changeTitleTask = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddTitle(event.target.value);
  };

  const addTask = () => {
    dispatch(setCreateTask(addTitle, id));
    setAddInput(false);
  };
  const openModal = (task:ITask,title:string) => {
    dispatch(setOpenEditTaskModal())
    dispatch(setSelectTask(task,title))
  }
  return (
    <ContainerColumn borderColor={borderColor}>
      <HeaderColumn>
        <H6>{title}</H6>
      </HeaderColumn>
      <OtherColumn>
        {project &&
          project.map((task: ITask, i: number) => (
            <ContainerTaks key={i} onClick={() => openModal(task,title)}>
              <ContentTask>
                <Flex
                  alignItems="start"
                  justifyContent="space-between"
                  width="100%"
                >
                  <H6 fontWeight="400" width="95%">{task.titleTask}</H6>
                  <CiEdit fontSize="16px" className="icon" display="none" />
                </Flex>
              </ContentTask>
            </ContainerTaks>
            
          ))}
        {title === "Queue" ? (
          addInput ? (
            <Flex flexDirection="column" margin="0 0 10px 0" >
              <InputTitleTaskEl
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  changeTitleTask(event)
                }
              />
              <Flex
                alignItems="center"
                justifyContent="space-between"
                margin="10px 0 0 0"
              >
                <ButtonEl
                  type="submit"
                  background="#2288c7"
                  color="#fff"
                  onClick={() => addTask()}
                  hoverBackColor='#1874ad'
                >
                  Создать Задачу
                </ButtonEl>
                <ButtonEl type="button" onClick={() => setAddInput(false)}>
                  <TfiClose fontWeight={"700"} fontSize="16px" />
                </ButtonEl>
              </Flex>
            </Flex>
          ) : (
            <Flex
              margin="10px 0 0 0"
              alignItems="center"
              justifyContent="center"
              onClick={() => setAddInput(true)}
            >
              <AiOutlinePlus color="#172b4d" />
              <PDiscriptionEl
                margin="0 0 0 5px"
                color="#172b4d"
                cursor="pointer"
              >
                Добавить карточку
              </PDiscriptionEl>
            </Flex>
          )
        ) : null}
      </OtherColumn>
    </ContainerColumn>
  );
};

export default Column;
