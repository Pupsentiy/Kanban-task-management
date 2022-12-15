import React, { FC } from "react";
import styled from "styled-components";
import { PDiscriptionEl } from "../../styles/index.styled";

export const InputEl = styled.input<{
  margin?: string;
  border?: string;
  borderRadius?: string;
  fontSize?: string;
  background?: string;
  padding?: string;
  width?: string;
  color?: string;
  boxShadow?: string;
  borderFocus?:string;
}>`
  width: ${(props) => props.width || "auto"};
  height:${props => props.height || 'auto'};
  border-radius: ${(props) => props.borderRadius || "0"};
  border: ${(props) => props.border || "1px solid #000"};
  font-size: ${(props) => props.fontSize || "inherit"};
  font-weight: 400;
  background: ${(props) => props.background || "#fff"};
  color: ${(props) => props.color || "#000"};
  outline: none;
  padding: ${(props) => props.padding || "3px 7px"};
  line-height: normal;
  margin: ${(props) => props.margin || "0"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  &:focus {
    border: ${(props) => props.borderFocus || "1px solid #000"};
    box-shadow: ${(props) => props.boxShadow || "none"};
    -webkit-box-shadow: ${(props) => props.boxShadow || "none"};
    -moz-box-shadow: ${(props) => props.boxShadow || "none"};
  }
  &:focus-visible {
    outline: auto 0px;
  }
`;
export const LabelEl = styled.label<{margin?:string;}>`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  text-align: start;
  font-weight: 500;
  margin:5px 0px;
  width:100%;
`;

export interface IInputProps {
  label?: string;
  type: string;
  id?:string;
  error?: string | undefined;
  placeholder?: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?:boolean;
  checked?:boolean;  
  value?: string;
  disabled?:boolean;
  defaultValue?:string
  //styles
  margin?: string;
  border?: string;
  borderRadius?: string;
  fontSize?: string;
  background?: string;
  padding?: string;
  width?: string;
  height?:string;
  color?: string;
  boxShadow?: string;
  borderFocus?:string;
}

const Input: FC<IInputProps> = (props) => {
  return (
    <LabelEl htmlFor={props.id}>
    <PDiscriptionEl lineHeight="17px" fontSize="12px" fontWeight="600x">{props.label}</PDiscriptionEl>
      <InputEl
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
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
