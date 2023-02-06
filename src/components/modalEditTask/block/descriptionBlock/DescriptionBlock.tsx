import React, { FC } from "react";
import { BsTextLeft } from "react-icons/bs";

import Button from "../../../button/Button";

import { IDescriptionBlockProps } from "./DescriptionBlock.types";

import { Flex, ContainerIcon, H6, ModalTextArea, PDiscriptionEl, WrapperBlock } from "../../../../styles/index.styled";

const DescriptionBlock: FC<IDescriptionBlockProps> = ({
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
        <WrapperBlock alignItems="center" padding="5px 5px 5px 0" margin="0 0 0 40px">
          <H6>Description</H6>
          <Button
            onClick={() => setChangeDescriptionTask(true)}
            margin="0 0 0 8px"
            padding="6px 12px"
            background="#5f9ea094"
            hoverBackColor="#5f9ea0"
          >
            Сhange
          </Button>
        </WrapperBlock>
        {changeDescriptionTask ? (
          <WrapperBlock flexDirection="column" margin="0 0 0 40px">
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
                Save
              </Button>
              <Button
                onClick={() => setChangeDescriptionTask(false)}
                padding="6px 12px"
                background="transparent"
                hoverBackColor="#dfdfdf"
              >
                Cancel
              </Button>
            </Flex>
          </WrapperBlock>
        ) : (
          <WrapperBlock margin="0 0 0 40px">
            <PDiscriptionEl lineHeight="20px">{task?.description}</PDiscriptionEl>
          </WrapperBlock>
        )}
      </Flex>
    </Flex>
  );
};

export default DescriptionBlock;
