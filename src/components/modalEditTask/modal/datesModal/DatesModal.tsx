import { FC, useState } from "react";
import Moment from "react-moment";

import Button from "../../../button/Button";
import CheckBox from "../../../checkBox/CheckBox";
import Input from "../../../input/Input";

import { IDatesModal } from "./DatesModal.types";

import { PDiscriptionEl, Flex, WrapperEl } from "../../../../styles/index.styled";

const dataTime = new Date().toLocaleString().slice(12, 17);
const dataDate = new Date().toISOString().slice(0, 10);
const DatesModal: FC<IDatesModal> = ({
  activeInputDate,
  task,
  setTask,
  setActiveInputDate,
  setActiveModalDate,
}) => {
  const [time, setTime] = useState<string>(dataTime);
  const [date, setDate] = useState<string>(dataDate);

  const closeModal = () => {
    setActiveModalDate(false);
  };

  const saveChangeTimeDate = () => {
    if (activeInputDate) {
      setTask({
        ...task,
        finishDate: { date: new Date(date + "T" + time), checkDate: false },
      });
    }
    setActiveInputDate(false);
  };

  const openInputDate = () => {
    setActiveInputDate(!activeInputDate);
  };

  const deleteDedline = () => {
    setTask({
      ...task,
      finishDate: null,
    });
  };
  return (
    <>
      <PDiscriptionEl>
        Date create:
        <Moment format=" DD.MM.YY - HHч. : mmм.">{task?.createTaskDate}</Moment>
      </PDiscriptionEl>
      <PDiscriptionEl>Time at work: {task?.proccesTime}</PDiscriptionEl>
      <PDiscriptionEl>Term:</PDiscriptionEl>
      <Flex justifyContent="space-between" alignItems="center">
        <WrapperEl margin="0 10px 0 0">
          <CheckBox onClick={() => openInputDate()} active={activeInputDate} />
        </WrapperEl>
        <WrapperEl margin="0 10px 0 0">
          <Input
            background={activeInputDate ? "#fff" : "#ebecf0"}
            color={activeInputDate ? " #172b4d" : "#a5adba"}
            border={
              activeInputDate ? "#5f9ea094 2px solid" : "transparent 2px solid"
            }
            borderRadius="3px"
            height="25px"
            type="date"
            disabled={!activeInputDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
            defaultValue={dataDate}
          />
        </WrapperEl>
        <WrapperEl margin="0 10px 0 0">
          <Input
            background={activeInputDate ? "#fff" : "#ebecf0"}
            color={activeInputDate ? " #172b4d" : "#a5adba"}
            border={
              activeInputDate ? "#5f9ea094 2px solid" : "transparent 2px solid"
            }
            borderRadius="3px"
            height="25px"
            //
            type="time"
            disabled={!activeInputDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTime(e.target.value)
            }
            defaultValue={dataTime}
          />
        </WrapperEl>
      </Flex>
      <Flex justifyContent="space-between" margin="15px 0 0 0">
        <Button
          onClick={() => {
            saveChangeTimeDate();
            closeModal();
          }}
          width="50%"
          padding="6px 12px"
          background="#5f9ea094"
          hoverBackColor="#5f9ea0"
          margin="0 5px 0 0"
        >
          Save
        </Button>
        <Button
          onClick={() => deleteDedline()}
          width="50%"
          padding="6px 12px"
          background="transparent"
          hoverBackColor="#dfdfdf"
        >
          Remove
        </Button>
      </Flex>
    </>
  );
};

export default DatesModal;
