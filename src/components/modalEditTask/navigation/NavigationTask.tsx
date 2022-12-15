import { FC } from "react";
import { WrapperEl } from "../../../styles/index.styled";
import Button from "../../button/Button";

export interface INavigationTask {
  setActiveDropDownDate: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDropDownSubTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationTask: FC<INavigationTask> = ({
  setActiveDropDownDate,
  setActiveDropDownSubTask,
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
    </>
  );
};

export default NavigationTask;
