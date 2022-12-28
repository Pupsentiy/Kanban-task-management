import styled from "styled-components";

export const WrapperMarker = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 6px 0px;
  padding: 0 0 3px 3px;
`;

export const ContentMarker = styled.div<{
  background: string;
  beforeBackground: string;
}>`
  background: ${(props) => props.background};
  height: 30px;
  width: 100%;
  margin: 0 0 0 10px;
  border-radius: 3px;
  position: relative;
  padding-left: 35px;
  &:before {
    content: "";
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 8px;
    border-radius: 8px;
    width: 16px;
    height: 16px;
    background: ${(props) => props.beforeBackground};
  }
`;