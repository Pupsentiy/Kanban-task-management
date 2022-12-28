import styled from "styled-components";

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
  marginLabel?:string;
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
export const LabelEl = styled.label<{margin?:string; marginLabel?:string;}>`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  text-align: start;
  font-weight: 500;
  margin:${props => props.marginLabel || '5px 0px'};
  width:100%;
`;