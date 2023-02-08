import { ITask } from "../../../../store/types/store.types";

export interface ISubTaskModalProps {
  setActiveModalSubTask: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  task: ITask;
}