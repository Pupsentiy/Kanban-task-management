import styled from "styled-components";

export const ListCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
export const LiCard = styled.li<{ width?: string }>`
  box-sizing: border-box;
  cursor: pointer;
  padding: 4px 8px;
  width: ${(props) => props.width || "25%"};
`;

export const WrapperCard = styled.div<{ background?: string }>`
  border-radius: 5px;
  background-color: ${(props) => props.background || "#091e421c"};
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  -webkit-transition: all 0.1ms ease;
  transition: all 0.3ms ease;
  &:hover {
    background-color: ${(props) => props.background || "#091e421c"};
    opacity: 0.7;
  }
`;