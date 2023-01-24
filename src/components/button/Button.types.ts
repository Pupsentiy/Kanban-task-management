export interface IButtonProps {
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  children?: string | JSX.Element;
  type?: "button" | "submit" | "reset" | undefined;

  display?: string;
  active?: boolean;
  background?: string;
  borderRadius?: string;
  padding?: string;
  boxShadow?: string;
  margin?: string;
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  hoverBackColor?: string;
  cursor?: string;
  opacity?:string;
}