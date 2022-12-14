import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Flex, H6, PDiscriptionEl, WrapperEl } from "../../styles/index.styled";
import Button from "../button/Button";
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
  DedlineEl,
  Modal,
  ModalBodyWrapper,
  ModalContent,
  ModalNavigation,
  ModalOtherBlock,
  ModalWrapperHeader,
  TaskDetailsBlock,
} from "./ModalEditTask.styled";
import HeaderModalEditTask from "./headerBlock/HeaderModalEditTask";
import DescriptionModalEditTask from "./descriptionBlock/DescriptionModalEditTask";
import ActionModalEditTask from "./actionBlock/ActionModalEditTask";
import CheckBox from "../checkBox/CheckBox";
import Moment from "react-moment";
import "moment/locale/ru";
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
                  <DedlineEl>
                    <PDiscriptionEl>Срок</PDiscriptionEl>
                    <Flex alignItems="center">
                      <WrapperEl margin=" 0 5px 0 0">
                        <CheckBox setActive={setIsOverdue} active={isOverdue} />
                      </WrapperEl>
                      <Moment format={" DD MMM - HH:mm"} locale="ru">
                        {task?.finishDate}
                      </Moment>
                      {timeIsOverdueDate < 0 && !isOverdue ? (
                        <PDiscriptionEl margin="0 0 0 5px">
                          Просроченно
                        </PDiscriptionEl>
                      ) : isOverdue ? (
                        <PDiscriptionEl margin="0 0 0 5px">
                          Выполненно
                        </PDiscriptionEl>
                      ) : null}
                    </Flex>
                  </DedlineEl>
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
            <ModalNavigation>
              <PDiscriptionEl margin="0 0 5px 0">
                Добавить на карточку
              </PDiscriptionEl>
              <WrapperEl>
                <Button
                  background="#5f9ea094"
                  width="100%"
                  hoverBackColor="#5f9ea0"
                  onClick={() => setActiveDropDownDate(true)}
                >
                  Даты
                </Button>
              </WrapperEl>
              {activeDropDownDate && (
                <DropDown name="Даты">
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
            </ModalNavigation>
          </Flex>
        </ModalBodyWrapper>
      </ModalContent>
    </Modal>
  );
};
export default ModalEditTask;
