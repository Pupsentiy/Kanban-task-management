import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
  setCreateTask,
  setOpenEditTaskModal,
  setSelectTask,
} from "../../store/actions/actionTypes";
import { ITask, TComment } from "../../store/reducers/createCardProjectReducer";

import Button from "../button/Button";

import { Flex, H6, PDiscriptionEl, WrapperEl } from "../../styles/index.styled";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { FaRegCommentDots } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Moment from "react-moment";
import { IoMdTime } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";
import SingleTask from "../singleTask/SingleTask";

export const ContainerColumn = styled.div<{ borderColor: string }>`
  background: #ebecf0;
  margin: 0 30px;
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
  background: #fff;
  min-height: 20px;
  border-radius: 2px;
  margin-bottom: 10px;
  padding: 10px 8px 2px;
  box-shadow: 0px 0px 2px 1px #aba6a6;
  cursor: pointer;
  &:hover {
    background: #dfdbdb;
    .icon {
      display: block;
    }
  }
`;

export const ContentTask = styled.div`
  margin: 0 0 4px 0;
`;

export const Marker = styled.div<{ background: string }>`
  background: ${(props) => props?.background || "transparent"};
  margin-bottom: 10px;
  padding-right: 0;
  padding-left: 0;
  height: 8px;
  width: 40px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ContainerOtherDetaiels = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerTimeDedline = styled.div<{ background: string }>`
  margin: 0 4px 4px 0;
  align-items: center;
  display: flex;
  border-radius: 3px;
  min-height: 20px;
  max-width: 100%;
  background: ${(props) => props.background};
  padding: 0 3px;
`;

export interface IColumnProps {
  project: ITask[];
  column: string;
  //styles
  borderColor: string;
}

const Column: FC<IColumnProps> = ({ borderColor, project, column }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addInput, setAddInput] = useState<boolean>(false);
  const [addTitle, setAddTitle] = useState<string>("");

  const changeTitleTask = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddTitle(event.target.value);
  };

  const addTask = () => {
    if (addTitle !== "") {
      dispatch(setCreateTask(addTitle, id));
      setAddInput(false);
      setAddTitle("");
    }
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

  const commentСounter = (task: ITask) => {
    let sum = 0;
    if (task.comments.length === 0) {
      sum = 0;
    } else {
      sum += task.comments.length;
    }

    const recursion = (comment: TComment) => {
      comment.subComments.forEach((sub) => {
        sum += sub.subComments.length;
        recursion(sub);
      });
    };

    task?.comments?.forEach((comment) => {
      sum += comment.subComments.length;
      recursion(comment);
    });

    return sum;
  };

  const subTaskCounter = (task: ITask) => {
    let sum = 0;
    task.subTasks.map((subTask) => {
      if (subTask.check) {
        sum++;
      }
    });
    return sum;
  };

  return (
    <ContainerColumn borderColor={borderColor}>
      <HeaderColumn>
        <H6>{column}</H6>
      </HeaderColumn>
      <OtherColumn>
        {project &&
          project.map((task: ITask, i: number) => (
            <SingleTask
              key={i}
              task={task}
              column={column}
              index={i}
              openModal={openModal}
              commentСounter={commentСounter}
              subTaskCounter={subTaskCounter}
            />
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
