import React, { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TfiClose } from "react-icons/tfi";
import { BsLaptop, BsTextLeft, BsTextIndentLeft } from "react-icons/bs";
import {
  Flex,
  H2,
  H6,
  PDiscriptionEl,
  WrapperEl,
} from "../../styles/index.styled";
import Button from "../button/Button";
import {
  setCloseEditTaskModal,
  setEditTask,
} from "../../store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ITask, TComment } from "../../store/reducers/createCardProjectReducer";
import { useParams } from "react-router-dom";
import Comments from "../comments/Comments";
import DropDown from "../dropDown/DropDown";
import Date from "./Dates/Dates";
import { ContainerIcon, Modal, ModalBodyWrapper, ModalContent, ModalNavigation, ModalOtherBlock, ModalTextArea, ModalWrapperHeader } from "./ModalEditTask.styled";

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
    setActiveDropDownDate(false)
  };
  return (
    <Modal onClick={() => (saveTask(), closeModal())} active={activeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()} active={activeModal}>
        <ModalWrapperHeader>
          <Flex alignItems="start" justifyContent="flex-start">
            <ContainerIcon top="3px">
              <BsLaptop fontSize="20px" />
            </ContainerIcon>
            <Flex flexDirection="column" margin="0 40px" width="100%">
              {changeHeaderTask ? (
                <Flex alignItems="center" width="100%">
                  <ModalTextArea
                    autoFocus
                    height="28px"
                    fontSize="18px"
                    value={task.titleTask}
                    name="titleTask"
                    onBlur={() => (setChangeHeaderTask(false), saveTask())}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                      onChangeTask(event)
                    }
                  />
                  <Button
                    onClick={() => (setChangeHeaderTask(false), saveTask())}
                    margin="0 0 0 8px"
                    padding="6px 12px"
                    background="#5f9ea094"
                    hoverBackColor="#5f9ea0"
                  >
                    Сохранить
                  </Button>
                </Flex>
              ) : (
                <H2
                  margin="6px"
                  fontSize="20px"
                  onClick={() => setChangeHeaderTask(true)}
                >
                  {task?.titleTask}
                </H2>
              )}
            </Flex>
            <ContainerIcon right="0" top="3px">
              <TfiClose
                onClick={() => (saveTask(), closeModal())}
                cursor="pointer"
              />
            </ContainerIcon>
          </Flex>
        </ModalWrapperHeader>
        <ModalBodyWrapper>
          <Flex width="100%">
            <ModalOtherBlock>
              <Flex alignItems="top" margin="5px 0 20px 0" width="100%">
                <ContainerIcon>
                  <BsTextLeft fontSize="22px" />
                </ContainerIcon>
                <Flex flexDirection="column" width="100%">
                  <Flex
                    alignItems="center"
                    padding="5px 5px 5px 0"
                    margin="0 0 0 40px"
                  >
                    <H6>Описание</H6>
                    <Button
                      onClick={() => setChangeDescriptionTask(true)}
                      margin="0 0 0 8px"
                      padding="6px 12px"
                      background="#5f9ea094"
                      hoverBackColor="#5f9ea0"
                    >
                      Изменить
                    </Button>
                  </Flex>
                  {changeDescriptionTask ? (
                    <Flex flexDirection="column" margin="0 0 0 40px">
                      <ModalTextArea
                        autoFocus
                        fontSize="15px"
                        name="description"
                        value={task.description}
                        onBlur={() => (setChangeHeaderTask(false), saveTask())}
                        onChange={(
                          event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => onChangeTask(event)}
                      />
                      <Flex margin="5px 0 0 0">
                        <Button
                          onClick={() => (
                            setChangeDescriptionTask(false), saveTask()
                          )}
                          padding="6px 12px"
                          background="#5f9ea094"
                          hoverBackColor="#5f9ea0"
                          margin="0 5px 0 0"
                        >
                          Сохранить
                        </Button>
                        <Button
                          onClick={() => setChangeDescriptionTask(false)}
                          padding="6px 12px"
                          background="transparent"
                          hoverBackColor="#dfdfdf"
                        >
                          Отмена
                        </Button>
                      </Flex>
                    </Flex>
                  ) : (
                    <WrapperEl margin="0 0 0 40px">
                      <PDiscriptionEl>{task?.description}</PDiscriptionEl>
                    </WrapperEl>
                  )}
                </Flex>
              </Flex>
              <Flex alignItems="top" margin="5px 0">
                <ContainerIcon>
                  <BsTextIndentLeft fontSize="22px" />
                </ContainerIcon>
                <Flex
                  flexDirection="column"
                  margin="0 0 0 40px"
                  maxWidth="552px"
                  width="100%"
                >
                  <Flex alignItems="center" padding="12px 0">
                    <H6>Действия</H6>
                  </Flex>
                  <Flex margin="0 0 10px 0">
                    <ModalTextArea
                      fontSize="15px"
                      height="36px"
                      //
                      placeholder="Напишите коментарий"
                      name="comments"
                      value={commentTextValue}
                      ref={TextAreaRef}
                      onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                      ) => onChangeComment(event)}
                    />
                    <Button
                      margin="0 0 0 5px"
                      background={
                        commentTextValue === "" ? "#091e420a" : "#5f9ea094"
                      }
                      color={commentTextValue === "" ? "#a5adba" : "#000"}
                      hoverBackColor={
                        commentTextValue === "" ? "#091e420a" : "#5f9ea0"
                      }
                      cursor={
                        commentTextValue === "" ? "not-allowed" : "pointer"
                      }
                      onClick={() => saveComments()}
                    >
                      Сохранить
                    </Button>
                  </Flex>
                  <Comments
                    items={task?.comments}
                    setIdSelectComment={setIdSelectComment}
                    TextAreaRef={TextAreaRef}
                    addSubCommetns={addSubCommetns}
                    setSelectComments={setSelectComments}
                  />
                </Flex>
              </Flex>
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
                  <Date
                    activeInputDate={activeInputDate}
                    task={task}
                    setActiveInputDate={setActiveInputDate}
                    setActiveDropDownDate={setActiveDropDownDate}
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
