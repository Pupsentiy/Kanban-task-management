import { ReactNode } from "react";

export interface IDropDown {
  children: ReactNode;
  name: string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}