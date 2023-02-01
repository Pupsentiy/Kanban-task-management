import { DroppableProvided } from "@hello-pangea/dnd";
import { ITask } from "../../store/types/store.types";

export interface IColumnProps {
  project: ITask[];
  column: string;
  provided:DroppableProvided
  //styles
  borderColor: string;
  background:string;
  minHeight?:string;
}