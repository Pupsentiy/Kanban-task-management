import { ITask } from "../../../../store/types/store.types";

export interface IHeaderModalEditTaskProps {
  setChangeHeaderTask: React.Dispatch<React.SetStateAction<boolean>>;
  changeHeaderTask: boolean;
  onChangeTask: (event: { target: { name: string; value: string } }) => void;
  saveTask: () => void;
  closeModal: () => void;
  task: ITask;
}