import { ReactNode } from "react";

export interface IModalNavigation{
  children: ReactNode;
  name: string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}