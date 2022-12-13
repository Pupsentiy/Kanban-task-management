import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
  setCreateTask,
  setOpenEditTaskModal,
  setSelectTask,
} from "../../store/actions/actionTypes";
import { ITask } from "../../store/reducers/createCardProjectReducer";

import Button from "../button/Button";

import { Flex, H6, PDiscriptionEl, WrapperEl } from "../../styles/index.styled";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";

export const ContainerColumn = styled.div<{ borderColor: string }>`
  background: #ebecf0;
  width: 33.33%;
  height: 100%;
  margin: 0 4px;
  box-shadow: 0px 0px 3px 0px #aba6a6;
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
  border-radius: 2px;
  font-size: 15px;
  box-shadow: 0px 0px 4px 1px #aba6a6;
  &:focus {
    box-shadow: inset 0 0 0 2px #5f9ea0;
  }
`;

export const ContainerTaks = styled.div`
  background: #f5f5dc;
  min-height: 20px;
  border-radius: 2px;
  margin-bottom: 10px;
  padding: 10px 8px 2px;
  box-shadow: 0px 0px 2px 1px #aba6a6;
  cursor: pointer;
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
  column: string;
  // setActiveInputDate: React.Dispatch<React.SetStateAction<boolean>>;
  //styles
  borderColor: string;
}

const Column: FC<IColumnProps> = ({
  borderColor,
  project,
  column,
}) => {
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

  const getProccesTime = (ms: Date) => {
    const endTime = new Date();
    let timeDiff = +endTime - +new Date(ms);
    let days = (timeDiff / 86400000) | 0;
    let hours = ((timeDiff % 86400000) / 3600000) | 0;
    let minutes = ((timeDiff - days * 86400000 - hours * 3600000) / 60000) | 0;

    let pad = function (n: string | number) {
      return n < 10 ? "0" + n : n;
    };

    let result = days + "д. " + pad(hours) + "час. : " + pad(minutes) + "мин.";
    return result;
  };
  const openModal = (task: ITask, column: string) => {
    const proccesTime = getProccesTime(task?.createTaskDate);
    const editTaskTime = { ...task, proccesTime: proccesTime };
    dispatch(setOpenEditTaskModal());
    dispatch(setSelectTask(editTaskTime, column));
  };

  return (
    <ContainerColumn borderColor={borderColor}>
      <HeaderColumn>
        <H6>{column}</H6>
      </HeaderColumn>
      <OtherColumn>
        {project &&
          project.map((task: ITask, i: number) => (
            <ContainerTaks key={i} onClick={() => openModal(task, column)}>
              <ContentTask>
                <Flex
                  alignItems="start"
                  justifyContent="space-between"
                  width="100%"
                >
                  <H6 fontWeight="400" width="80%">
                    {task.titleTask}
                  </H6>
                  <Flex margin="0 0 0 5px" width="20%">
                    {"№" + task.numberTask}
                  </Flex>
                </Flex>
              </ContentTask>
            </ContainerTaks>
          ))}
        {column === "Queue" ? (
          addInput ? (
            <Flex flexDirection="column" margin="0 0 10px 0">
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
                <Button
                  type="submit"
                  background="#2288c7"
                  color="#fff"
                  onClick={() => addTask()}
                  hoverBackColor="#1874ad"
                >
                  Создать Задачу
                </Button>
                <Button type="button" onClick={() => setAddInput(false)}>
                  <TfiClose fontWeight={"700"} fontSize="16px" />
                </Button>
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
