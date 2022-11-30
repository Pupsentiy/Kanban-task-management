import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { TfiClose } from "react-icons/tfi";
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
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
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
  boxShadow?:string;
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
  box-shadow: ${props => props.boxShadow || 'none'};
  border-radius: 5px;
  position: relative;
`;

export const ModalBodyWrapper = styled.div`
  padding: 5px 5px 8px;
  display: flex;
`;

export const CommentBox = styled.div`
background:#fff;
padding:10px;
border-radius:5px;
box-shadow: inset 0 0 0 2px #dfe1e6;
`;

export const ModalOther = styled.div``;
export const ModalNavigation = styled.div``;

const ModalEditTask: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectTask = useSelector(
    (state: RootState) => state.createCardProject.selectTask
  );
  const activeModal = useSelector(
    (state: RootState) => state.createCardProject.toggleModalEditTask
  );
  const [changeHeaderTask, setChangeHeaderTask] = useState<boolean>(false);
  const [changeDescriptionTask, setChangeDescriptionTask] =
    useState<boolean>(false);

  const [task, setTask] = useState<ITask>(selectTask.task);

  useEffect(() => {
    setTask(selectTask.task);
  }, [selectTask]);

  const onChangeTask = (event: { target: { id: string; value: string } }) => {
    const { id, value } = event.target;

    setTask({
      ...task,
      [id]: value,
    });
  };

  const closeModal = () => {
    dispatch(setCloseEditTaskModal());
  };

  const saveTask = () => {
    dispatch(setEditTask(task, id, selectTask.title.toLowerCase()));
  };

  console.log(selectTask)
  return (
    <Modal onClick={() => closeModal()} active={activeModal}>
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
                    height="33px"
                    fontSize="18px"
                    boxShadow="inset 0 0 0 2px #dfe1e6;"
                    value={task.titleTask}
                    id="titleTask"
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
              <TfiClose onClick={() => closeModal()} cursor="pointer" />
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
                    <Flex flexDirection="column" >
                      <ModalTextArea
                        fontSize="15px"
                        boxShadow="inset 0 0 0 2px #dfe1e6;"
                        id="description"
                        value={task.description}
                        onChange={(
                          event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => onChangeTask(event)}
                      />
                      <Flex margin="5px 0 0 0" >
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
                  <CommentBox>
                    <ModalTextArea
                      fontSize="15px"
                      placeholder="Напишите коментарий"
                      id="comments"
                      height="33px"
                      onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                      ) => onChangeTask(event)}
                    />
                    <Button background="#091e420a" color="#a5adba">Сохранить</Button>
                  </CommentBox>
                  {task?.comments && task?.comments.map((comment:TComment,i:number) =>
                  <div key={i}>{comment.text}</div>
                  )}
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
