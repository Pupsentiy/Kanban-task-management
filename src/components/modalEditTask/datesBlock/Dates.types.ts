import { ITask } from "../../../store/types/store.types";

export interface IDates {
  activeInputDate: boolean;
  setActiveInputDate: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDropDownDate: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  task: ITask;
}