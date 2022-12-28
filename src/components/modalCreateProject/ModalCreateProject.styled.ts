import styled from "styled-components";

export const SectionEl = styled.section`
  position: absolute;
  width: 350px;
  will-change: top, left;
  top: 100px;
  left: 550px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  outline: 0;
  overflow: hidden;
  z-index: 5;
`;

export const HeaderModal = styled.div`
  display: flex;
  justify-conten: space-between;
`;