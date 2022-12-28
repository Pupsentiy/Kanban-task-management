import { ITask } from "../../store/types/store.types";

export interface ISingleTaskProps {
  task: ITask;
  column: string;
  index: number;
  openModal: (task: ITask, column: string) => void;
  commentСounter: (task: ITask) => number;
  subTaskCounter: (task: ITask) => number;
}