import { FC } from "react";

import Button from "../../button/Button";

import { INavigationTaskProps } from "./NavigationTask.types";

import { WrapperEl } from "../../../styles/index.styled";

const NavigationTask: FC<INavigationTaskProps> = ({
  setActiveDropDownDate,
  setActiveDropDownSubTask,
  setActiveDropDownMarker,
  setActiveBlockInvestment,
}) => {
  return (
    <>
      <WrapperEl margin="0 0 6px 0">
        <Button
          background="#5f9ea094"
          width="100%"
          hoverBackColor="#5f9ea0"
          onClick={() => setActiveDropDownDate(true)}
        >
          Даты
        </Button>
      </WrapperEl>
      <WrapperEl margin="0 0 6px 0">
        <Button
          background="#5f9ea094"
          width="100%"
          hoverBackColor="#5f9ea0"
          onClick={() => setActiveDropDownSubTask(true)}
        >
          Задачи
        </Button>
      </WrapperEl>
      <WrapperEl margin="0 0 6px 0">
        <Button
          background="#5f9ea094"
          width="100%"
          hoverBackColor="#5f9ea0"
          onClick={() => setActiveDropDownMarker(true)}
        >
          Приоритет
        </Button>
      </WrapperEl>
      <WrapperEl margin="0 0 6px 0">
        <Button
          background="#5f9ea094"
          width="100%"
          hoverBackColor="#5f9ea0"
          onClick={() => setActiveBlockInvestment(true)}
        >
          Прикрепить Файл
        </Button>
      </WrapperEl>
    </>
  );
};

export default NavigationTask;
