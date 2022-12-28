import { ITask } from "../../store/types/store.types";

export interface IColumnProps {
  project: ITask[];
  column: string;
  //styles
  borderColor: string;
  background:string;
}