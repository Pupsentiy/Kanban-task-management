import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { TfiClose } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsLaptop, BsTextLeft, BsTextIndentLeft } from "react-icons/bs";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import {
  Flex,
  H2,
  H6,
  PDiscriptionEl,
  WrapperEl,
} from "../../styles/index.styled";
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
import Comments from "../comments/Comments";

export const Modal = styled.div<{ active: boolean }>`
  width: 100%;
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  position: fixed;
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

export const ContainerIcon = styled.div<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}>`
  position: absolute;
  z-index: 2;
  overflow: hidden;
  padding: 4px;
  margin: 4px;
  top: ${(props) => props.top || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
`;

export const ModalContent = styled.div`
  padding: 10px 5px;
  border-radius: 5px;
  background-color: #ecf1fb;
  min-height: 500px;
  width: 860px;
`;
export const ModalWrapperHeader = styled.div`
  padding: 5px 5px 8px;
  position: relative;
  height: 32px;
`;
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
  width: 100%;
  outline: none;
  border: none;
  padding: 5px 2px 2px 5px;
  margin: ${(props) => props.margin || "0"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  border-radius: 5px;
  position: relative;
  line-height: 17px;
  &:focus {
    box-shadow: ${(props) => props.focusBoxShadow};
  }
`;

export const ModalBodyWrapper = styled.div`
  padding: 5px 5px 8px;
  display: flex;
  width: 100%;
  flex-direaction: column;
`;

export const CommentBox = styled.div<{ focus: boolean }>`
  background: #fff;
  padding: 4px;
  border-radius: 5px;
  box-shadow: ${({ focus }) =>
    focus === true ? "inset 0 0 0 2px #5f9ea0" : "inset 0 0 0 1px #dfe1e6;"};
`;

export const ModalOther = styled.div`
  padding: 0 5px 0 0;
  width: 80%;
`;
export const ModalNavigation = styled.div`
  padding: 0 5px;
  width: 50%;
`;

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
  const [selectCommet, setSelectComments] = useState<TComment | null>(null);
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

  const addComments = () => {
    setTask({
      ...task,
      comments: [...task.comments, newComment],
    });
    setCommentTextValue("");
  };

  const addSubCommetns = () => {
    if (selectCommet?.id === idSelectComment) {
      selectCommet?.subComments.push(newComment);
    }
    setCommentTextValue("");
  };

  const saveComments = () => {
    if (commentTextValue !== "") {
      if (idSelectComment !== "") {
        addSubCommetns();
      } else {
        addComments();
      }
    }
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
            <ModalOther>
              <Flex alignItems="top" margin="5px 0" width="100%">
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
                    <WrapperEl margin="0 0 0 40px">
                      <PDiscriptionEl color="#000">
                        {task?.description}
                      </PDiscriptionEl>
                    </WrapperEl>
                  )}
                </Flex>
              </Flex>
              <Flex alignItems="top" margin="5px 0">
                <ContainerIcon>
                  <BsTextIndentLeft fontSize="22px" />
                </ContainerIcon>
                <Flex flexDirection="column" margin="0 0 0 40px">
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
                  <Comments
                    items={task?.comments}
                    setIdSelectComment={setIdSelectComment}
                    setCheckFocusTextArComments={setCheckFocusTextArComments}
                    TextAreaRef={TextAreaRef}
                    addSubCommetns={addSubCommetns}
                    setSelectComments={setSelectComments}
                  />
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
