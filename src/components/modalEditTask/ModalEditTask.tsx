import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { TfiClose } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsLaptop, BsTextLeft, BsTextIndentLeft } from "react-icons/bs";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { Flex, H2, H6, PDiscriptionEl } from "../../styles/index.styled";
import Button, { ButtonEl } from "../button/Button";
import {
  setCloseEditTaskModal,
  setEditTask,
  setOpenEditTaskModal,
} from "../../store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IToggleCreProModal } from "../../store/reducers/creteProModalToggleReducer";
import { ITask, TComment } from "../../store/reducers/createCardProjectReducer";
import { useParams } from "react-router-dom";

export const Modal = styled.div<{ active: boolean }>`
  width: 100%;
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ active }) => (active === true ? "1" : "0")};
  pointer-events: ${({ active }) => (active === true ? `all` : `none`)};
  transition: 0.5s;
  z-index: 10;
  min-height: 100vh;
`;

export const ModalContent = styled.div`
  padding: 10px 5px;
  border-radius: 5px;
  background-color: #ecf1fb;
  min-height: 500px;
  min-width: 660px;
  width: 660px;
`;
export const ModalWrapperHeader = styled.div`
  padding: 5px 5px 8px;
  span {
    margin: 4px;
    padding: 4px;
    display: flex;
  }
`;
// убрать бордер у техкстареа
export const ModalTextArea = styled.textarea<{
  height?: string;
  fontSize: string;
  boxShadow?: string;
  margin?: string;
  focusBoxShadow?: string;
}>`
  font-size: ${(props) => props.fontSize || "16px"};
  overflow: hidden;
  overflow-wrap: break-word;
  height: ${(props) => props.height || "80px"};
  box-shadow: none;
  resize: none;
  min-width: 450px;
  outline: none;
  border: none;
  padding: 5px 2px 2px 5px;
  margin: ${(props) => props.margin || "0"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  border-radius: 5px;
  position: relative;
  line-hight: 17px;
  &:focus {
    box-shadow: ${(props) => props.focusBoxShadow};
  }
`;

export const ModalBodyWrapper = styled.div`
  padding: 5px 5px 8px;
  display: flex;
`;

export const CommentBox = styled.div<{ focus: boolean }>`
  background: #fff;
  padding: 4px;
  border-radius: 5px;
  box-shadow: ${({ focus }) =>
    focus === true ? "inset 0 0 0 2px #5f9ea0" : "inset 0 0 0 1px #dfe1e6;"};
`;

export const CommentsWrapper = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214;
  box-sizing: border-box;
  clear: both;
  display: inline-block;
  margin: 4px 2px 4px 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ModalOther = styled.div``;
export const ModalNavigation = styled.div``;

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

  const [checkFocusTextArComments, setCheckFocusTextArComments] =
    useState<boolean>(false);
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
  const saveComments = () => {
    const newComment: TComment = {
      id: uuidv4(),
      text: commentTextValue,
      subComments: [],
    };
    if (commentTextValue !== "") {
      if (idSelectComment !== "") {
        setTask({
          ...task,
          comments: task.comments.map((comment) => {
            if (comment.id === idSelectComment) {
              
              const newSubComment = {
                id: comment.id,
                text: comment.text,
                subComments: [...comment.subComments,newComment],
              
              };
              console.log(newSubComment)
              return newSubComment;
            }
            return comment;
          }),
        });
      } else {
        setTask({
          ...task,
          comments: [...task.comments,newComment],
        });
      }
    }
    setCommentTextValue("");
    setIdSelectComment("");
  };
  const saveTask = () => {
    dispatch(setEditTask(task, id, selectTask.column.toLowerCase()));
  };
  // console.log(task);
  
  return (
    <Modal onClick={() => (saveTask(), closeModal())} active={activeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalWrapperHeader>
          <Flex alignItems="start" justifyContent="flex-start">
            <span>
              <BsLaptop fontSize="20px" />
            </span>
            <Flex flexDirection="column" margin="0 10px" width="100%">
              {changeHeaderTask ? (
                <Flex alignItems="center">
                  <ModalTextArea
                    autoFocus
                    height="33px"
                    fontSize="18px"
                    boxShadow="inset 0 0 0 2px #dfe1e6;"
                    focusBoxShadow=" inset 0 0 0 2px #5f9ea0"
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
                    fontSize="14px"
                    padding="6px 12px"
                    background="#5f9ea094"
                    hoverBackColor="#5f9ea0"
                  >
                    Сохранить
                  </Button>
                </Flex>
              ) : (
                <H2
                  fontSize="20px"
                  margin="8px 0 8px 0"
                  onClick={() => setChangeHeaderTask(true)}
                >
                  {task?.titleTask}
                </H2>
              )}
            </Flex>
            <span>
              <TfiClose
                onClick={() => (saveTask(), closeModal())}
                cursor="pointer"
              />
            </span>
          </Flex>
        </ModalWrapperHeader>
        <ModalBodyWrapper>
          <Flex>
            <ModalOther>
              <Flex alignItems="top" margin="5px 0">
                <span>
                  <BsTextLeft fontSize="22px" />
                </span>
                <Flex flexDirection="column" margin="0 10px" width="100%">
                  <Flex alignItems="center" padding="5px 5px 5px 0">
                    <H6>Описание</H6>
                    <Button
                      onClick={() => setChangeDescriptionTask(true)}
                      margin="0 0 0 8px"
                      fontSize="14px"
                      padding="6px 12px"
                      background="#5f9ea094"
                      hoverBackColor="#5f9ea0"
                    >
                      Изменить
                    </Button>
                  </Flex>
                  {changeDescriptionTask ? (
                    <Flex flexDirection="column">
                      <ModalTextArea
                        autoFocus
                        fontSize="15px"
                        boxShadow="inset 0 0 0 2px #dfe1e6;"
                        focusBoxShadow=" inset 0 0 0 2px #5f9ea0"
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
                          fontSize="14px"
                          padding="6px 12px"
                          background="#5f9ea094"
                          hoverBackColor="#5f9ea0"
                          margin="0 5px 0 0"
                        >
                          Сохранить
                        </Button>
                        <Button
                          onClick={() => setChangeDescriptionTask(false)}
                          fontSize="14px"
                          padding="6px 12px"
                          background="transparent"
                          hoverBackColor="#dfdfdf"
                        >
                          Отмена
                        </Button>
                      </Flex>
                    </Flex>
                  ) : (
                    <PDiscriptionEl color="#000">
                      {task?.description}
                    </PDiscriptionEl>
                  )}
                </Flex>
              </Flex>
              <Flex alignItems="top" margin="5px 0">
                <span>
                  <BsTextIndentLeft fontSize="22px" />
                </span>
                <Flex flexDirection="column" margin="0 10px">
                  <Flex alignItems="center" padding="10px 0">
                    <H6>Действия</H6>
                  </Flex>
                  <CommentBox focus={checkFocusTextArComments}>
                    <ModalTextArea
                      fontSize="15px"
                      height="24px"
                      //
                      ref={TextAreaRef}
                      placeholder="Напишите коментарий"
                      name="comments"
                      value={commentTextValue}
                      onFocus={() => {
                        setCheckFocusTextArComments(true);
                      }}
                      onBlur={() => setCheckFocusTextArComments(false)}
                      onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                      ) => onChangeComment(event)}
                    />
                    <Button
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
                  </CommentBox>
                  {task?.comments &&
                    task?.comments?.map((comment: TComment, i: number) => (
                      <CommentsWrapper key={i}>
                        <Flex
                          alignItems="center"
                          padding="8px 12px"
                          justifyContent="space-between"
                        >
                          <PDiscriptionEl color="#000" lineHeight="0">
                            {comment.text}
                          </PDiscriptionEl>
                          <AiOutlinePlus
                            cursor="pointer"
                            onClick={() => (
                              setIdSelectComment(comment.id),
                              TextAreaRef?.current?.focus(),
                              setCheckFocusTextArComments(true)
                            )}
                          />
                        </Flex>
                        <div>
                          {comment.subComments.map((subComment, i) => (
                            <div key={i}>
                              <div>{subComment.text}</div>

                              <AiOutlinePlus
                                cursor="pointer"
                                onClick={() => (
                                  setIdSelectComment(subComment.id),
                                  TextAreaRef?.current?.focus(),
                                  setCheckFocusTextArComments(true)
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      </CommentsWrapper>
                    ))}
                </Flex>
              </Flex>
            </ModalOther>
            <ModalNavigation>
              <PDiscriptionEl fontSize="14px" color="#000" lineHeight="23px">
                дата создания: {task?.createTaskDate}
              </PDiscriptionEl>
              <PDiscriptionEl fontSize="14px" color="#000" lineHeight="23px">
                номер задачи: {task?.numberTask}
              </PDiscriptionEl>
            </ModalNavigation>
          </Flex>
        </ModalBodyWrapper>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditTask;
