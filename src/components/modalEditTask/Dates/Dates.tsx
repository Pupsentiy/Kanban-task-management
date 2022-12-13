import { FC, useState } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { ITask } from "../../../store/reducers/createCardProjectReducer";
import { Flex, PDiscriptionEl, WrapperEl } from "../../../styles/index.styled";
import Button from "../../button/Button";
import Input from "../../input/Input";
import checked from "../../../assets/img/checked.svg";

export const CheckBoxNoCheck = styled.div<{ activeInputDate: boolean }>`
  position: relative;
  flex-shrink: 0;
  border-radius: 2px;
  height: 16px;
  width: 16px;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  background-color: ${({ activeInputDate }) =>
    activeInputDate ? "#5f9ea0" : "#fafbfc"};
  box-shadow: ${({ activeInputDate }) =>
    activeInputDate ? "none" : "inset 0 0 0 2px #dfe1e6"};
`;

export interface IDate {
  activeInputDate: boolean;
  setActiveInputDate: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDropDownDate: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}

const dataTime = new Date().getHours() + ":" + new Date().getMinutes()
const dataDate = new Date().toISOString().slice(0, 10)
const Dates: FC<IDate> = ({
  activeInputDate,
  task,
  setActiveInputDate,
  setActiveDropDownDate,
}) => {
  const [time, setTime] = useState(dataTime);
  const [date, setDate] = useState(dataDate);
  const closeDropDown = () => {
    setActiveDropDownDate(false);
  };
console.log(date+' '+time);
console.log(new Date().toISOString().replace('T',' ').slice(0,16));
  return (
    <>
      <PDiscriptionEl>
        Дата создания:
        <Moment format=" DD.MM.YY - HH:mm">{task?.createTaskDate}</Moment>
      </PDiscriptionEl>
      <PDiscriptionEl>Время в работе: {task?.proccesTime}</PDiscriptionEl>
      <PDiscriptionEl>Срок:</PDiscriptionEl>
      <Flex justifyContent="space-between" alignItems="center">
        <WrapperEl margin="0 10px 0 0">
          <CheckBoxNoCheck
            onClick={() => setActiveInputDate(!activeInputDate)}
            activeInputDate={activeInputDate}
          >
            <img src={checked} alt="checkBox" />
          </CheckBoxNoCheck>
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
            onChange={(e: any) => setDate(e.target.value)}
            defaultValue={date}
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
            type="time"
            disabled={!activeInputDate}
            onChange={(e: any) => setTime(e.target.value)}
            defaultValue={time}
          />
        </WrapperEl>
      </Flex>
      <Flex justifyContent="space-between" margin="15px 0 0 0">
        <Button
          onClick={() => closeDropDown()}
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
