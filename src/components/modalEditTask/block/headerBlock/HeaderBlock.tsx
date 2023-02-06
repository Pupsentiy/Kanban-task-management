import { FC, useEffect, useRef } from "react";
import { BsLaptop } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";

import { IHeaderModalEditTaskProps } from "./HeaderBlock.types";

import {
  Flex,
  ContainerIcon,
  ModalTextArea,
  H2,
} from "../../../../styles/index.styled";

const HeaderModalEditTask: FC<IHeaderModalEditTaskProps> = ({
  setChangeHeaderTask,
  changeHeaderTask,
  onChangeTask,
  saveTask,
  closeModal,
  task,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [changeHeaderTask]);

  return (
    <>
      <Flex alignItems="start" justifyContent="flex-start">
        <ContainerIcon top="3px" display="block">
          <BsLaptop fontSize="20px" />
        </ContainerIcon>
        <Flex flexDirection="column" margin="0 40px" width="100%">
          {changeHeaderTask ? (
            <Flex alignItems="center" width="100%">
              <ModalTextArea
                ref={textAreaRef}
                autoFocus
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
        <ContainerIcon right="0" top="3px" display="block">
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
