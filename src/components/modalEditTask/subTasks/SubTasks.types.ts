import { ITask } from "../../../store/types/store.types";

export interface ISubTasksProps {
  task: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
}