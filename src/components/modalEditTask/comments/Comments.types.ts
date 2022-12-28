import { TComment } from "../../../store/types/store.types";

export interface ICommentsProps {
  items: TComment[];
  setIdSelectComment: React.Dispatch<React.SetStateAction<string>>;
  setSelectComments: React.Dispatch<React.SetStateAction<TComment | null>>;
  addSubCommetns: () => void;
  TextAreaRef: React.RefObject<HTMLTextAreaElement>;
}