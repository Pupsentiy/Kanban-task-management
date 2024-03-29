import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../../../button/Button";
import Input from "../../../input/Input";

import { ISubTaskModalProps } from "./SubTaskModal.types";

import { Flex } from "../../../../styles/index.styled";

const SubTaskModal: FC<ISubTaskModalProps> = ({
  setActiveModalSubTask,
  setTask,
  task,
}) => {
  const [nameSubTask, setNameSubTask] = useState<string>("");

  const changeNameSubTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameSubTask(event.target.value);
  };
  const saveSubTask = () => {
    const id: string = uuidv4();
    const newSubTask = {
      id: id,
      description: nameSubTask,
      check: false,
    };
    if (nameSubTask !== "") {
      setTask({
        ...task,
        subTasks: [...task.subTasks, newSubTask],
      });
    }

    setActiveModalSubTask(false);
    setNameSubTask("");
  };

  return (
    <>
      <Input
        type="text"
        label="Name"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          changeNameSubTask(event)
        }
        value={nameSubTask}
        //
        border=" #dfe1e6 2px solid "
        borderFocus="#5f9ea094 2px solid"
        borderRadius="3px"
      />
      <Flex justifyContent="space-between" margin="15px 0 0 0">
        <Button
          onClick={() => saveSubTask()}
          //
          width="50%"
          padding="6px 12px"
          background="#5f9ea094"
          hoverBackColor="#5f9ea0"
          margin="0 5px 0 0"
        >
          Add
        </Button>
      </Flex>
    </>
  );
};

export default SubTaskModal;
