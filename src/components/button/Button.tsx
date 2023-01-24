import { FC } from "react";

import { IButtonProps } from "./Button.types";

import { ButtonEl } from "./Button.styled";

const Button: FC<IButtonProps> = (props) => {
  return (
    <ButtonEl
      onClick={props.onClick}
      active={props.active}
      type={props.type}
      //styles
      display={props.display}
      background={props.background}
      borderRadius={props.borderRadius}
      padding={props.padding}
      boxShadow={props.boxShadow}
      margin={props.margin}
      color={props.color}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      hoverBackColor={props.hoverBackColor}
      cursor={props.cursor}
      opacity={props.opacity}
    >
      {props.children}
    </ButtonEl>
  );
};

export default Button;
