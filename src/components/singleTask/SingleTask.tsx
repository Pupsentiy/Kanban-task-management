import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaRegCommentDots } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";
import Moment from "react-moment";
import { ITask } from "../../store/reducers/createCardProjectReducer";
import { Flex, H6, PDiscriptionEl } from "../../styles/index.styled";
import {
  ContainerOtherDetaiels,
  ContainerTaks,
  ContainerTimeDedline,
  ContentTask,
  Marker,
} from "../column/Column";

export interface ISingleTask {
  task: ITask;
  column: string;
  index: number;
  openModal: (task: ITask, column: string) => void;
  commentСounter: (task: ITask) => number;
  subTaskCounter: (task: ITask) => number;
}

const SingleTask: FC<ISingleTask> = ({
  task,
  column,
  index,
  openModal,
  commentСounter,
  subTaskCounter,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <ContainerTaks
          key={task.id}
          onClick={() => openModal(task, column)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ContentTask>
            <Flex
              alignItems="start"
              justifyContent="space-between"
              width="100%"
              padding="15px 0 0 0"
              position="relative"
            >
              {task.priorityMarker && (
                <Marker
                  background={
                    task.priorityMarker && task?.priorityMarker?.colorCircle
                  }
                />
              )}
              <H6 fontWeight="400" width="100%" fontSize="14px">
                {task.titleTask}
              </H6>
              <Flex margin="0 0 0 5px" position="absolute" right="1px" top="0">
                <PDiscriptionEl lineHeight="normal" fontSize="12px">
                  {"№" + task.numberTask}
                </PDiscriptionEl>
              </Flex>
            </Flex>
          </ContentTask>
          <ContainerOtherDetaiels>
            {task.comments.length ? (
              <Flex
                alignItems="center"
                margin="0 4px 4px 0"
                justifyContent="center"
              >
                <FaRegCommentDots fontSize="12px" color="#5e6c84" />{" "}
                <PDiscriptionEl
                  lineHeight="normal"
                  margin="0 0 0 2px"
                  fontSize="12px"
                >
                  {commentСounter(task)}
                </PDiscriptionEl>
              </Flex>
            ) : null}
            <Flex margin="0 4px 4px 0" justifyContent="center">
              {task.description !== "" ? (
                <HiOutlineMenuAlt2 fontSize="12px" />
              ) : null}
            </Flex>
            <Flex>
              {task.finishDate ? (
                <ContainerTimeDedline
                  background={
                    Date.parse(String(task?.finishDate?.date)) -
                      new Date().getTime() +
                      60000 >
                      0 && !task.finishDate?.checkDate
                      ? "transparent"
                      : task.finishDate?.checkDate
                      ? "#61bd4f"
                      : "#ec9488"
                  }
                >
                  <IoMdTime
                    fontSize="12px"
                    color={
                      Date.parse(String(task?.finishDate?.date)) -
                        new Date().getTime() +
                        60000 >
                        0 && !task.finishDate?.checkDate
                        ? "#000"
                        : "#fff"
                    }
                  />
                  <PDiscriptionEl
                    fontSize="12px"
                    lineHeight="normal"
                    margin="0 0 0 3px"
                    color={
                      Date.parse(String(task?.finishDate?.date)) -
                        new Date().getTime() +
                        60000 >
                        0 && !task.finishDate?.checkDate
                        ? "#000"
                        : "#fff"
                    }
                  >
                    <Moment format={" DD MMM"} locale="ru">
                      {task.finishDate?.date}
                    </Moment>
                  </PDiscriptionEl>
                </ContainerTimeDedline>
              ) : null}
              {task.subTasks.length ? (
                <ContainerTimeDedline
                  background={
                    subTaskCounter(task) === task.subTasks.length
                      ? "#61bd4f"
                      : "transparent"
                  }
                >
                  <IoCheckboxOutline
                    fontSize="12px"
                    color={
                      subTaskCounter(task) === task.subTasks.length
                        ? "#fff"
                        : "#5e6c84"
                    }
                  />
                  <PDiscriptionEl
                    fontSize="12px"
                    lineHeight="normal"
                    margin="0 0 0 3px"
                    color={
                      subTaskCounter(task) === task.subTasks.length
                        ? "#fff"
                        : "#5e6c84"
                    }
                  >
                    {subTaskCounter(task)}/{task.subTasks.length}
                  </PDiscriptionEl>
                </ContainerTimeDedline>
              ) : null}
            </Flex>
          </ContainerOtherDetaiels>
        </ContainerTaks>
      )}
    </Draggable>
  );
};

export default SingleTask;
