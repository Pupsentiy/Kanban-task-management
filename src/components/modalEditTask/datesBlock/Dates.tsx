import { FC, useState } from "react";
import Moment from "react-moment";
import { ITask } from "../../../store/reducers/createCardProjectReducer";
import { Flex, PDiscriptionEl, WrapperEl } from "../../../styles/index.styled";
import Button from "../../button/Button";
import CheckBox from "../../checkBox/CheckBox";
import Input from "../../input/Input";

export interface IDates {
  activeInputDate: boolean;
  setActiveInputDate: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDropDownDate: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  setIsOverdue:React.Dispatch<React.SetStateAction<boolean>>
  task: ITask;
}

const dataTime = new Date().toLocaleString().slice(12,17)
const dataDate = new Date().toISOString().slice(0,10)
const Dates: FC<IDates> = ({
  activeInputDate,
  task,
  setTask,
  setActiveInputDate,
  setActiveDropDownDate,
  setIsOverdue
}) => {
  const [time, setTime] = useState(dataTime);
  const [date, setDate] = useState(dataDate);

  const closeDropDown = () => {
    setActiveDropDownDate(false);
  };

  const saveChangeTimeDate = () => {
    setTask({
      ...task,
      finishDate: new Date(date+"T"+ time)
    });
    setIsOverdue(false)
    setActiveInputDate(false)
  };

  const openInputDate =()=>{
    setActiveInputDate(!activeInputDate)
  }
  console.log(activeInputDate)
  return (
    <>
      <PDiscriptionEl>
        Дата создания:
        <Moment format=" DD.MM.YY - HHч. : mmм.">{task?.createTaskDate}</Moment>
      </PDiscriptionEl>
      <PDiscriptionEl>Время в работе: {task?.proccesTime}</PDiscriptionEl>
      <PDiscriptionEl>Срок:</PDiscriptionEl>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
            defaultValue={dataTime}
          />
        </WrapperEl>
      </Flex>
      <Flex justifyContent="space-between" margin="15px 0 0 0">
        <Button
          onClick={() => {
            saveChangeTimeDate();
            closeDropDown();
          }}
          width="50%"
          padding="6px 12px"
          background="#5f9ea094"
          hoverBackColor="#5f9ea0"
          margin="0 5px 0 0"
        >
          Сохранить
        </Button>
        <Button
          onClick={() => closeDropDown()}
          width="50%"
          padding="6px 12px"
          background="transparent"
          hoverBackColor="#dfdfdf"
        >
          Удалить
        </Button>
      </Flex>
    </>
  );
};

export default Dates;
