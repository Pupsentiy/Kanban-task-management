import { ITask } from "../../../../store/types/store.types";

export interface IDescriptionBlockProps {
  setChangeDescriptionTask: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeHeaderTask: React.Dispatch<React.SetStateAction<boolean>>;
  changeDescriptionTask: boolean;
  task: ITask;
  onChangeTask: (event: { target: { name: string; value: string } }) => void;
  saveTask: () => void;
}
