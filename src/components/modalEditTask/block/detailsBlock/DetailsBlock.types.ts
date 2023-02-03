import { ITask } from "../../../../store/types/store.types";

export interface IDetailBlockProps {
  task:ITask
  changeLabelDeadline:() => void
  timeIsOverdueDate:number
}