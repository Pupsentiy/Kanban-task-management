import React, { FC } from "react";

import Button from "../../button/Button";

import { BsTextLeft } from "react-icons/bs";
import {
  ContainerIcon,
  Flex,
  H6,
  ModalTextArea,
  PDiscriptionEl,
  WrapperEl,
} from "../../../styles/index.styled";
import { IDescriptionModalEditTaskProps } from "./DescriptionModalEditTask.types";


const DescriptionModalEditTask: FC<IDescriptionModalEditTaskProps> = ({
  setChangeDescriptionTask,
  setChangeHeaderTask,
  changeDescriptionTask,
  task,
  onChangeTask,
  saveTask,
}) => {
  return (
    <Flex alignItems="top" margin="5px 0 20px 0" width="100%">
      <ContainerIcon>
        <BsTextLeft fontSize="22px" />
      </ContainerIcon>
      <Flex flexDirection="column" width="100%">
        <Flex alignItems="center" padding="5px 5px 5px 0" margin="0 0 0 40px">
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
              onBlur={() => {
                setChangeHeaderTask(false);
                saveTask();
              }}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChangeTask(event)
              }
            />
            <Flex margin="5px 0 0 0">
              <Button
                onClick={() => {
                  setChangeDescriptionTask(false);
                  saveTask();
                }}
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
  );
};

export default DescriptionModalEditTask;
