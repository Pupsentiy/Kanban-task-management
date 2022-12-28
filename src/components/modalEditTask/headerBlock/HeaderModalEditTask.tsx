import { FC } from "react";

import Button from "../../button/Button";

import { IHeaderModalEditTaskProps } from "./HeaderModalEditTask.types";

import { BsLaptop } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import {
  ContainerIcon,
  Flex,
  H2,
  ModalTextArea,
} from "../../../styles/index.styled";

const HeaderModalEditTask: FC<IHeaderModalEditTaskProps> = ({
  setChangeHeaderTask,
  changeHeaderTask,
  onChangeTask,
  saveTask,
  closeModal,
  task,
}) => {
  return (
    <>
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
                onBlur={() => {
                  setChangeHeaderTask(false);
                  saveTask();
                }}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onChangeTask(event)
                }
              />
              <Button
                onClick={() => {
                  setChangeHeaderTask(false);
                  saveTask();
                }}
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
              fontSize="20px"
              margin="6px 6px 6px 0px"
              onClick={() => setChangeHeaderTask(true)}
            >
              {task?.titleTask}
            </H2>
          )}
        </Flex>
        <ContainerIcon right="0" top="3px">
          <TfiClose
            onClick={() => {
              saveTask();
              closeModal();
            }}
            cursor="pointer"
          />
        </ContainerIcon>
      </Flex>
    </>
  );
};

export default HeaderModalEditTask;
