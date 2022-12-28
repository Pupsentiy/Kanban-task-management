import { ITask } from "../../../store/types/store.types";

export interface ICreatingMarkerPriorityProps {
  setActiveDropDownMarker: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  task: ITask;
}