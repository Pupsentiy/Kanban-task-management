import { FC, useEffect, useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import Button from "../../../button/Button";
import CheckBox from "../../../checkBox/CheckBox";
import Input from "../../../input/Input";

import { ISubTasksBlockProps } from "./SubTasksBlock.types";

import { ProgressBar, WrapperSubTask } from "./SubTasksBlock.styled";
import { Flex, ContainerIcon, H6, PDiscriptionEl } from "../../../../styles/index.styled";

const SubTasksBlock: FC<ISubTasksBlockProps> = ({ task, setTask }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [progressTracking, setProgressTracking] = useState<number>(0);
  const [chaneName, setChangeName] = useState<string>("");
  const [idSubTask, setIdSubTask] = useState<string>("");
  const [activeInput, setActiveInput] = useState<boolean>(false);

  const checkProgressBar = () => {
    let sum =
      task.subTasks.filter((subTask) => subTask.check === true).length === 0
        ? 0
        : Math.round(
            (task.subTasks.filter((subTask) => subTask.check === true).length /
              task.subTasks.length) *
              100
          );

    setProgressTracking(sum);
  };

  const completedSubTask = (id: string) => {
    setChecked(!checked);
    setTask({
      ...task,
      subTasks: task.subTasks.map((subTask) => {
        if (subTask.id === id) {
          subTask.check = !subTask.check;
        }
        return subTask;
      }),
    });
  };

  const chanegeNameTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeName(event.target.value);
  };

  const selectSubTask = (id: string, description: string) => {
    setIdSubTask(id);
    setChangeName(description);
    setActiveInput(true);
  };

  const saveChangeSubTask = () => {
    setTask({
      ...task,
      subTasks: task.subTasks.map((subTask) => {
        if (subTask.id === idSubTask) {
          subTask.description = chaneName;
        }
        return subTask;
      }),
    });
    setIdSubTask("");
    setActiveInput(false);
  };

  const deleteSubTask = (id: string) => {
    setTask({
      ...task,
      subTasks: task.subTasks.filter((subTask) => subTask.id !== id),
    });
  };

  const cancelСhange = () => {
    setActiveInput(false);
  };

  useEffect(() => {
    checkProgressBar();
  }, [task?.subTasks.length, checked]);

  return (
    <Flex alignItems="top" margin="5px 0">
      <ContainerIcon>
        <IoMdCheckboxOutline fontSize="22px" />
      </ContainerIcon>
      <Flex
        flexDirection="column"
        margin="0 0 0 40px"
        maxWidth="552px"
        width="100%"
      >
        <Flex alignItems="center" padding="12px 0">
          <H6>Tasks</H6>
        </Flex>
        <Flex margin="0 0 10px 0" flexDirection="column">
          <Flex alignItems="center" width="100%" padding="3px">
            <Flex width="6%" margin="0 20px 0 0">
              <PDiscriptionEl lineHeight="normal" fontSize="12px" whiteSpace="nowrap">
                {progressTracking}%
              </PDiscriptionEl>
            </Flex>
            <ProgressBar progressTracking={progressTracking} />
          </Flex>
          {task?.subTasks &&
            task?.subTasks.map((subTask, i) => (
              <WrapperSubTask key={i}>
                <Flex margin="5px 5px 5px 0" alignItems="center" width="100%">
                  <CheckBox
                    active={subTask?.check}
                    onClick={() => completedSubTask(subTask?.id)}
                  />
                  {activeInput && idSubTask === subTask.id ? (
                    <Input
                      type="text"
                      onChange={(event) => chanegeNameTask(event)}
                      value={chaneName}
                      margin="0 10px 0 10px"
                      width="95%"
                      border=" #dfe1e6 2px solid "
                      borderFocus="#5f9ea094 2px solid"
                      borderRadius="3px"
                    />
                  ) : (
                    <PDiscriptionEl
                      margin="0 0 0 10px"
                      color="#5e6c84"
                      lineHeight="normal"
                      textDecoration={subTask?.check ? "line-through" : "none"}
                    >
                      {subTask?.description}
                    </PDiscriptionEl>
                  )}
                </Flex>
                {activeInput && idSubTask === subTask.id ? (
                  <Flex>
                    <Button
                      onClick={() => saveChangeSubTask()}
                      padding="6px 12px"
                      background="#5f9ea094"
                      hoverBackColor="#5f9ea0"
                      margin="0 5px 0 0"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => cancelСhange()}
                      padding="6px 12px"
                      background="transparent"
                      hoverBackColor="#dfdfdf"
                    >
                      Cancel
                    </Button>
                  </Flex>
                ) : (
                  <Flex>
                    <Button
                      hoverBackColor="#808080ad"
                      onClick={() =>
                        selectSubTask(subTask.id, subTask.description)
                      }
                    >
                      <FaRegEdit fontSize="18px" />
                    </Button>
                    <Button
                      hoverBackColor="#808080ad"
                      onClick={() => deleteSubTask(subTask?.id)}
                    >
                      <IoTrashBin fontSize="18px" />
                    </Button>
                  </Flex>
                )}
              </WrapperSubTask>
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SubTasksBlock;
