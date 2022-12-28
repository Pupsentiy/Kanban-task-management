import { ITask } from "../../../store/types/store.types";

export interface IInvestmentProps {
  task: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
}