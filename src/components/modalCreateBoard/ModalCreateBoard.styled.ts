import styled from "styled-components";
import { device } from "../../styles/device.styled";

export const SectionEl = styled.section`
  position: absolute;
  width: 350px;
  will-change: top, left;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  outline: 0;
  overflow: hidden;
  z-index: 5;
  display:block;
  @media ${device.mobileL} {
    width:300px;
  }
`;

export const HeaderModal = styled.div`
  display: flex;
  justify-conten: space-between;
`;

export const ItemColor = styled.div`
width:40px;
height:32px;
margin-right:3px;
&:last-child{
  margin:0;
}
position:relative;
`