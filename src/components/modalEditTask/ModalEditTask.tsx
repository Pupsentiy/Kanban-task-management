import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Flex, PDiscriptionEl, WrapperEl } from "../../styles/index.styled";
import {
  setCloseEditTaskModal,
  setEditTask,
} from "../../store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ITask, TComment } from "../../store/reducers/createCardProjectReducer";
import { useParams } from "react-router-dom";
import DropDown from "../dropDown/DropDown";
import Dates from "./datesBlock/Dates";
import {
  Modal,
  ModalBodyWrapper,
  ModalContent,
  WrapperNavigation,
  ModalOtherBlock,
  ModalWrapperHeader,
  TaskDetailsBlock,
  WrapperExpirationDate,
} from "./ModalEditTask.styled";
import HeaderModalEditTask from "./headerBlock/HeaderModalEditTask";
import DescriptionModalEditTask from "./descriptionBlock/DescriptionModalEditTask";
import ActionModalEditTask from "./actionBlock/ActionModalEditTask";
import CheckBox from "../checkBox/CheckBox";
import Moment from "react-moment";
import "moment/locale/ru";
import NavigationTask from "./navigation/NavigationTask";
import Input from "../input/Input";
import Button from "../button/Button";
import CreateSubTask from "./createSubTask/CreateSubTask";
import SubTasks from "./subTasks/SubTasks";
const ModalEditTask: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);
  const selectTask = useSelector(
    (state: RootState) => state.createCardProject.selectTask
  );
  const activeModal = useSelector(
    (state: RootState) => state.createCardProject.toggleModalEditTask
  );

  const [changeHeaderTask, setChangeHeaderTask] = useState<boolean>(false);
  const [changeDescriptionTask, setChangeDescriptionTask] =
    useState<boolean>(false);
  const [idSelectComment, setIdSelectComment] = useState("");
  const [task, setTask] = useState<ITask>(selectTask.task);
  const [commentTextValue, setCommentTextValue] = useState<string>("");
  const [selectComment, setSelectComments] = useState<TComment | null>(null);
  const [activeInputDate, setActiveInputDate] = useState<boolean>(false);
  const [activeDropDownDate, setActiveDropDownDate] = useState<boolean>(false);
  const [activeDropDownSubTask, setActiveDropDownSubTask] =
    useState<boolean>(false);
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    setTask(selectTask.task);
  }, [selectTask.task]);

  const onChangeTask = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const onChangeComment = (event: { target: { value: string } }) => {
    setCommentTextValue(event.target.value);
  };

  const closeModal = () => {
    dispatch(setCloseEditTaskModal());
  };

  const newComment: TComment = {
    id: uuidv4(),
    text: commentTextValue,
    subComments: [],
  };

  const addSubCommetns = () => {
    if (commentTextValue !== "") {
      if (selectComment?.id === idSelectComment) {
        selectComment?.subComments.push(newComment);
      }
    }
    setCommentTextValue("");
  };

  const saveComments = () => {
    if (commentTextValue !== "") {
      if (idSelectComment !== "") {
        addSubCommetns();
      } else {
        setTask({
          ...task,
          comments: [...task.comments, newComment],
        });
        setCommentTextValue("");
      }
    }
    setIdSelectComment("");
    setCommentTextValue("");
  };

  const saveTask = () => {
    dispatch(setEditTask(task, id, selectTask.column.toLowerCase()));
    setActiveInputDate(false);
    setActiveDropDownDate(false);
  };

  const timeIsOverdueDate =
    Date.parse(String(task?.finishDate)) - new Date().getTime() + 60000;
  const changeLabelDeadline = () => {
    setIsOverdue(!isOverdue);
  };
  return (
    <Modal
      onClick={() => {
        saveTask();
        closeModal();
      }}
      active={activeModal}
    >
      <ModalContent onClick={(e) => e.stopPropagation()} active={activeModal}>
        <ModalWrapperHeader>
          <HeaderModalEditTask
            setChangeHeaderTask={setChangeHeaderTask}
            changeHeaderTask={changeHeaderTask}
            saveTask={saveTask}
            onChangeTask={onChangeTask}
            closeModal={closeModal}
            task={task}
          />
        </ModalWrapperHeader>
        <ModalBodyWrapper>
          <Flex width="100%">
            <ModalOtherBlock>
              <TaskDetailsBlock>
                {task?.finishDate !== null ? (
                  <WrapperEl margin="5px 5px 5px 0px">
                    <PDiscriptionEl>Срок</PDiscriptionEl>
                    <Flex alignItems="center">
                      <WrapperEl margin=" 0 5px 0 0">
                        <CheckBox
                          onClick={() => changeLabelDeadline()}
                          active={isOverdue}
                        />
                      </WrapperEl>
                      <WrapperExpirationDate>
                        <Moment format={" DD MMM - HH:mm"} locale="ru">
                          {task?.finishDate}
                        </Moment>
                        {timeIsOverdueDate < 0 && !isOverdue ? (
                          <span className="overdue">
                            <PDiscriptionEl
                              lineHeight="17px"
                              color="#fff"
                              fontSize="12px"
                            >
                              просрочено
                            </PDiscriptionEl>
                          </span>
                        ) : isOverdue ? (
                          <span className="performed">
                            <PDiscriptionEl
                              lineHeight="17px"
                              color="#fff"
                              fontSize="12px"
                            >
                              выполнено
                            </PDiscriptionEl>
                          </span>
                        ) : null}
                      </WrapperExpirationDate>
                    </Flex>
                  </WrapperEl>
                ) : null}
              </TaskDetailsBlock>
              <DescriptionModalEditTask
                setChangeDescriptionTask={setChangeDescriptionTask}
                setChangeHeaderTask={setChangeHeaderTask}
                changeDescriptionTask={changeDescriptionTask}
                task={task}
                onChangeTask={onChangeTask}
                saveTask={saveTask}
              />

              {task?.subTasks.length > 0 && (
                <SubTasks task={task} setTask={setTask} />
              )}
              <ActionModalEditTask
                setIdSelectComment={setIdSelectComment}
                setSelectComments={setSelectComments}
                addSubCommetns={addSubCommetns}
                saveComments={saveComments}
                onChangeComment={onChangeComment}
                commentTextValue={commentTextValue}
                task={task}
                TextAreaRef={TextAreaRef}
              />
            </ModalOtherBlock>
            <WrapperNavigation>
              <PDiscriptionEl margin="0 0 5px 0">
                Добавить на карточку
              </PDiscriptionEl>
              <NavigationTask
                setActiveDropDownDate={setActiveDropDownDate}
                setActiveDropDownSubTask={setActiveDropDownSubTask}
              />
              {activeDropDownDate && (
                <DropDown name="Даты" setClose={setActiveDropDownDate}>
                  <Dates
                    activeInputDate={activeInputDate}
                    task={task}
                    setTask={setTask}
                    setActiveInputDate={setActiveInputDate}
                    setActiveDropDownDate={setActiveDropDownDate}
                    setIsOverdue={setIsOverdue}
                  />
                </DropDown>
              )}
              {activeDropDownSubTask && (
                <DropDown
                  name="Добавление списка задач"
                  setClose={setActiveDropDownSubTask}
                >
                  <CreateSubTask
                    setActiveDropDownSubTask={setActiveDropDownSubTask}
                    task={task}
                    setTask={setTask}
                  />
                </DropDown>
              )}
            </WrapperNavigation>
          </Flex>
        </ModalBodyWrapper>
      </ModalContent>
    </Modal>
  );
};
export default ModalEditTask;
