import { NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-color: #fafbfc;
  min-height: 100%;
  margin: 0;
  padding: 0;
  position:relative;
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
  box-shadow: 0px 0px 8px 1px #b7b6b6;
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
`;

export const H5 = styled.h5<{ margin?: string; fontWeight?: string }>`
  font-weight: ${(props) => props.fontWeight || "700"};
  font-size: 34px;
  line-height: 32px;
  margin: ${(props) => props.margin || "0"};
`;

export const H6 = styled.h6<{
  margin?: string;
  color?: string;
  fontWeight?: string;
  width?: string;
}>`
  font-weight: ${(props) => props.fontWeight || "600"};
  font-size: 16px;
  line-height: 100%;
  word-wrap: break-word;
  color: ${(props) => props.color || "#000"};
  margin: ${(props) => props.margin || "0"};
  width: ${(props) => props.width || "auto"};
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
}>`
  color: ${(props) => props.color || "#fff"};
  font-size: ${(props) => props.fontSize || "14px"};
  line-height: ${(props) => props.lineHeight || "32px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  text-align: ${(props) => props.textAlign || "left"};
  display: ${(props) => props.display || "block"};
  flex-direction: ${(props) => props.flexDirectin || "start"};
  margin: ${(props) => props.margin || "0"};
  cursor: ${(props) => props.cursor || "default"};
  &span {
    text-decoration: underline;
  }
`;

export const ContainerEl = styled.div`
  min-height: 100%;
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
`;

export const Flex = styled.div<{
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
  flexDirection?: string;
  width?: string;
  padding?: string;
  position?:string;
}>`
  position: ${props => props.position || 'initial' };
  width: ${(props) => props.width || "auto"};
  display: flex;
  justify-content: ${(props) => props.justifyContent || "start"};
  align-items: ${(props) => props.alignItems || "left"};
  margin: ${(props) => props.margin || "0"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  padding: ${(props) => props.padding || "0"};
  span {
    margin: 4px;
    padding: 4px;
    display: flex;
  }
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
