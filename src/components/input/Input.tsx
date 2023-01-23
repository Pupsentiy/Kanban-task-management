import { FC } from "react";

import { PDiscriptionEl } from "../../styles/index.styled";
import { LabelEl, InputEl } from "./Input.styled";

import { IInputProps } from "./Input.types";

const Input: FC<IInputProps> = (props) => {
  return (
    <LabelEl htmlFor={props.id} marginLabel={props.marginLabel}>
      <PDiscriptionEl lineHeight="17px" fontSize="12px" fontWeight="600x">
        {props.label}
      </PDiscriptionEl>
      <InputEl
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={props.ref}
        value={props.value}
        id={props.id}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        //styles
        margin={props.margin}
        border={props.border}
        borderRadius={props.borderRadius}
        fontSize={props.fontSize}
        background={props.background}
        padding={props.padding}
        width={props.width}
        height={props.height}
        color={props.color}
        boxShadow={props.boxShadow}
        borderFocus={props.borderFocus}
      />
    </LabelEl>
  );
};

export default Input;
