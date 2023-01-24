import styled from "styled-components";

export const ButtonEl = styled.button<{
  borderRadius?: string;
  background?: string;
  padding?: string;
  boxShadow?: string;
  margin?: string;
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  active?: boolean;
  hoverBackColor?: string;
  display?: string;
  cursor?: string;
  opacity?:string;
}>`
  align-items:center;
  justify-content:center;
  display: ${(props) => props.display || "flex"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.margin || "0"};
  border-radius: ${(props) => props.borderRadius || "3px"};
  border: none;
  padding: ${(props) => props.padding || "6px 12px"};
  color: ${(props) => props.color || "#000"};
  font-size: ${(props) => props.fontSize || "14px"};
  line-height: 20px;
  font-weight: 400;
  cursor: ${(props) => props.cursor || "pointer"};
  background: ${(props) => props.background || "transparent"};
  -webkit-transition: all 0.1s ease;
  transition: all 0.1s ease;
  box-sizing: border-box;
  &:active {
    border: none;
    font-size: ${(props) => props.fontSize || "14px"};
    color: ${(props) => props.color || "#000"};
    line-height: 20px;
  }

  &:hover {
    background: ${(props) => props.hoverBackColor || ""};
    opacity:${props => props.opacity || '1'}
  }
`;