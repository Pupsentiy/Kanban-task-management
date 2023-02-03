import { ITask } from "../../../../store/types/store.types";

export interface ISubTasksBlockProps {
  task: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
}