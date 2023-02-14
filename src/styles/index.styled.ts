import { NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { device } from "./device.styled";

export const GlobalStyle = createGlobalStyle`

*{
  box-sizing: border-box;
  font-family: 'Ubuntu', sans-serif;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden;
  height: 100vh;
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  width: 100%;

  padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left); /* iOS 11.0 */
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); /* iOS 11.2 */
}


h1,
h2,
h3,
h4,
h5,
h6,
p,
ul[class],
ol,
li,
figure,
figcaption,
blockquote,
dl,
dd,
a {
    margin: 0;
    padding: 0;
list-style-type: none;
text-decoration: none;
}
textarea:focus,
input:focus {
  outline: none;
}

a {
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
`;

export const HeaderEl = styled.header`
  padding: 20px 10px;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, .5);
  background: linear-gradient(90deg,rgba(149,145,222,1) 0%,rgb(40 40 201 / 74%) 35%,rgba(31,128,167,1) 80%,rgb(17 173 205) 100%);
  @media ${device.mobileL} {
    padding:10px 5px;
  }
`;

export const H2 = styled.h2<{
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
}>`
  font-size: ${(props) => props.fontSize || "54px"};
  font-weight: ${(props) => props.fontWeight || "700"};
  line-height: 100%;
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  word-break: break-all;
`;

export const H5 = styled.h5<{
  margin?: string;
  fontWeight?: string;
  color?: string;
  fontSize?:string;
  textShadow?:string
}>`
  font-weight: ${(props) => props.fontWeight || "700"};
  font-size: ${(props) => props.fontSize || '34px'};
  word-break: break-all;
  line-height: 32px;
  margin: ${(props) => props.margin || "0"};
  color: ${(props) => props.color || "#000"};
  text-shadow:${(props) => props.textShadow || 'none'}
  @media ${device.mobileL} {
  }
`;

export const H6 = styled.h6<{
  margin?: string;
  color?: string;
  fontWeight?: string;
  width?: string;
  fontSize?: string;
  textAlign?:string;
}>`
  font-weight: ${(props) => props.fontWeight || "600"};
  font-size: ${(props) => props.fontSize || "16px"};
  word-break: break-all;
  line-height: 100%;
  word-wrap: break-word;
  color: ${(props) => props.color || "#000"};
  margin: ${(props) => props.margin || "0"};
  width: ${(props) => props.width || "auto"};
  text-align: ${(props) => props.textAlign || "left"};
`;
export const PDiscriptionEl = styled.p<{
  display?: string;
  flexDirectin?: string;
  textAlign?: string;
  margin?: string;
  color?: string;
  lineHeight?: string;
  fontSize?: string;
  fontWeight?: string;
  cursor?: string;
  textDecoration?: string;
  whiteSpace?:string;
}>`
  color: ${(props) => props.color || "#5e6c84"};
  font-size: ${(props) => props.fontSize || "14px"};
  line-height: ${(props) => props.lineHeight || "32px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  text-align: ${(props) => props.textAlign || "left"};
  display: ${(props) => props.display || "block"};
  flex-direction: ${(props) => props.flexDirectin || "start"};
  margin: ${(props) => props.margin || "0"};
  cursor: ${(props) => props.cursor || "default"};
  word-break: break-all;
  text-decoration: ${(props) => props.textDecoration || "none"};
  white-space:${props => props.whiteSpace || 'normal'};
  &span {
    text-decoration: underline;
  }
`;

export const ContainerEl = styled.div`
min-height: calc(100vh - 80px);
  padding: 10px 15px;
  max-width: 1440px;
  margin: 0 auto;
  height:100%;
`;

export const Flex = styled.div<{
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
  flexDirection?: string;
  width?: string;
  padding?: string;
  position?: string;
  maxWidth?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}>`
  position: ${(props) => props.position || "initial"};
  width: ${(props) => props.width || "auto"};
  max-width: ${(props) => props.maxWidth || "auto"};
  display: flex;
  justify-content: ${(props) => props.justifyContent || "start"};
  align-items: ${(props) => props.alignItems || "left"};
  margin: ${(props) => props.margin || "0"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  padding: ${(props) => props.padding || "0"};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;

export const WrapperEl = styled.div<{ margin?: string; padding?: string }>`
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
`;

export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const NavLinkEL = styled(NavLink)<{
  display?: string;
  alignItems?: string;
  color?: string;
  margin?: string;
  fontSize?: string;
  width?: string;
  minHeight?: string;
}>`
  display: ${(props) => props.display || "flex"};
  align-items: ${(props) => props.alignItems || "start"};
  font-size: ${(props) => props.fontSize || "16px"};
  width: ${(props) => props.width || "auto"};
  font-weight: 600;
  line-height: 133%;
  margin: ${(props) => props.margin || "0"};
  color: ${(props) => props.color || "#000"};
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  min-height: ${(props) => props.minHeight || "auto"};

 
`;

export const ContainerIcon = styled.div<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  display?:string;
}>`
  position: absolute;
  z-index: 2;
  overflow: hidden;
  padding: 4px;
  margin: 4px;
  top: ${(props) => props.top || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};

  @media ${device.mobileL} {
    display:${props => props.display || 'none'};
  };
`;

export const ModalTextArea = styled.textarea<{
  height?: string;
  fontSize: string;
  boxShadow?: string;
  margin?: string;
  focusBoxShadow?: string;
}>`
  font-size: ${(props) => props.fontSize || "16px"};
  overflow: hidden;
  overflow-wrap: break-word;
  height: ${(props) => props.height || "80px"};
  resize: none;
  width: 100%;
  outline: none;
  border: none;
  padding: 5px 2px 2px 5px;
  margin: ${(props) => props.margin || "0"};
  box-shadow: inset 0 0 0 2px #dfe1e6;
  border-radius: 5px;
  position: relative;
  line-height: 17px;
  &:focus {
    box-shadow: inset 0 0 0 2px #5f9ea0;
  }
`;

export const WrapperBlock = styled(Flex)`
@media ${device.mobileL} {
  margin:0;
};`
