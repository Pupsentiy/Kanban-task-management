import { ITask, TComment } from "../../../../store/types/store.types";


export interface IActionBlock {
  setIdSelectComment: React.Dispatch<React.SetStateAction<string>>;
  setSelectComments: React.Dispatch<React.SetStateAction<TComment | null>>;
  addSubCommetns: () => void;
  saveComments: () => void;
  onChangeComment: (event: { target: { name: string; value: string } }) => void;
  commentTextValue: string;
  task: ITask;
  TextAreaRef: React.RefObject<HTMLTextAreaElement>;
}
