import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { TfiClose } from "react-icons/tfi";
import { BsLaptop, BsTextLeft, BsTextIndentLeft } from "react-icons/bs";
import { Flex, H2, H6, PDiscriptionEl } from "../../styles/index.styled";
import { ButtonEl } from "../button/Button";
import {
  setCloseEditTaskModal,
  setEditTask,
  setOpenEditTaskModal,
} from "../../store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IToggleCreProModal } from "../../store/reducers/creteProModalToggleReducer";
import { ITask } from "../../store/reducers/createCardProjectReducer";
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
`;

export const ModalBodyWrapper = styled.div`
  padding: 5px 5px 8px;
  display: flex;
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
    // console.log(value)
    setTask({
      ...task,
      [id]: value,
    });
    // console.log(task);
  };
  const closeModal = () => {
    dispatch(setCloseEditTaskModal());
  };
  const saveTask = () => {
    dispatch(setEditTask(task, id, selectTask.title.toLowerCase()));
    dispatch(setCloseEditTaskModal());
  };
  return (
    <Modal onClick={() => saveTask()} active={activeModal}>
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
                    height="32px"
                    fontSize="20px"
                    value={task.titleTask}
                    id="titleTask"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                      onChangeTask(event)
                    }
                  />
                  <ButtonEl
                    onClick={() => setChangeHeaderTask(false)}
                    margin="0 0 0 8px"
                    fontSize="14px"
                    padding="6px 12px"
                    background="#5f9ea094"
                    hoverBackColor="#5f9ea0"
                  >
                    Сохранить
                  </ButtonEl>{" "}
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
              <PDiscriptionEl fontSize="14px" color="#000">
                дата создания: {task?.cretateTaskDate}
              </PDiscriptionEl>
              <PDiscriptionEl fontSize="14px" color="#000">
                номер задачи: {task?.numberTask}
              </PDiscriptionEl>
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
                <Flex flexDirection="column" margin="0 10px">
                  <Flex alignItems="center" padding="5px 5px 5px 0">
                    <H6>Описание</H6>
                    <ButtonEl
                      onClick={() => setChangeDescriptionTask(true)}
                      margin="0 0 0 8px"
                      fontSize="14px"
                      padding="6px 12px"
                      background="#5f9ea094"
                      hoverBackColor="#5f9ea0"
                    >
                      Изменить
                    </ButtonEl>
                  </Flex>
                  {changeDescriptionTask ? (
                    <Flex>
                      <ModalTextArea fontSize="15px" />{" "}
                      <Flex>
                        <ButtonEl
                          onClick={() => console.log()}
                          margin="0 0 0 8px"
                          fontSize="14px"
                          padding="6px 12px"
                          background="#5f9ea094"
                          hoverBackColor="#5f9ea0"
                        >
                          Сохранить
                        </ButtonEl>
                      </Flex>
                    </Flex>
                  ) : null}
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
                  <ModalTextArea
                    fontSize="15px"
                    placeholder="Напишите коментарий"
                  />
                </Flex>
              </Flex>
            </ModalOther>
            <ModalNavigation>2</ModalNavigation>
          </Flex>
        </ModalBodyWrapper>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditTask;
