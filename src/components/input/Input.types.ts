import { MutableRefObject } from "react";

export interface IInputProps {
  label?: string;
  type: string;
  id?: string;
  error?: string | undefined;
  placeholder?: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?:() => void;
  ref?: MutableRefObject<HTMLInputElement | null>;
  defaultChecked?: boolean;
  checked?: boolean;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  //styles
  margin?: string;
  border?: string;
  borderRadius?: string;
  fontSize?: string;
  background?: string;
  padding?: string;
  width?: string;
  height?: string;
  color?: string;
  boxShadow?: string;
  borderFocus?: string;
  labelColor?:string;
  marginLabel?: string;
}
