import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";

import SingleTask from "../singleTask/SingleTask";
import Button from "../button/Button";

import { ITask, TComment } from "../../store/types/store.types";
import {
  setCreateTask,
  setOpenEditTaskModal,
  setSelectTask,
} from "../../store/actions/actionTypes";

import { IColumnProps } from "./Column.types";

import {
  ContainerColumn,
  HeaderColumn,
  InputTitleTaskEl,
  OtherColumn,
} from "./Column.styled";
import { Flex, H6 } from "../../styles/index.styled";
import { RootState } from "../../store/store";

const Column: FC<IColumnProps> = ({
  borderColor,
  project,
  provided,
  column,
  background,
  minHeight,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addInput, setAddInput] = useState<boolean>(false);
  const [addTitle, setAddTitle] = useState<string>("");
  const activeModal = useSelector(
    (state: RootState) => state.createCardProject.toggleModalEditTask
  );

  const changeTitleTask = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddTitle(event.target.value);
  };

  const addTask = () => {
    if (addTitle !== "") {
      dispatch(setCreateTask(addTitle, id));
      setAddInput(false);
      setAddTitle("");
    } else {
      setAddInput(false);
    }
  };

  useEffect(() => {
    setAddInput(false);
  }, [!activeModal]);

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
    dispatch(setSelectTask(editTaskTime, column.toLowerCase()));
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
      return subTask;
    });
    return sum;
  };

  return (
    <ContainerColumn
      borderColor={borderColor}
      background={background}
      minHeight={minHeight}
    >
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
        {provided.placeholder}
        {column === "Queue" ? (
          addInput ? (
            <Flex flexDirection="column" margin="0 0 5px 0">
              <InputTitleTaskEl
                placeholder="Maintain a title for this task"
                autoFocus
                onBlur={() => addTask()}
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
                  Create task
                </Button>
                <Button type="button" onMouseDown={() => setAddInput(false)}>
                  <TfiClose fontWeight={"700"} fontSize="16px" />
                </Button>
              </Flex>
            </Flex>
          ) : (
            <Flex
              margin="10px 0 0 0"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                padding="6px 12px"
                background="#5f9ea094"
                hoverBackColor="#5f9ea0"
                width="100%"
                onClick={() => setAddInput(true)}
              >
                Add task
              </Button>
            </Flex>
          )
        ) : null}
      </OtherColumn>
    </ContainerColumn>
  );
};

export default Column;
