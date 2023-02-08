import { ITask } from "../../../../store/types/store.types";

export interface IDatesModal {
  activeInputDate: boolean;
  setActiveInputDate: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveModalDate: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  task: ITask;
}