import { ITask } from "../../../../store/types/store.types";

export interface IInvestmentBlockProps {
  task: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
}