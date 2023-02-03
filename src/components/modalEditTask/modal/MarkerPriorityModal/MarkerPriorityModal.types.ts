import { ITask } from "../../../../store/types/store.types";

export interface IMarkerPriorityModalProps {
  setActiveDropDownMarker: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  task: ITask;
}