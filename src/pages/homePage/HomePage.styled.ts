import styled, { keyframes } from "styled-components";
import { ButtonEl } from "../../components/button/Button.styled";
import { device } from "../../styles/device.styled";

const scale = keyframes`
  0 {
    transform: scale(0);
    opacity: 0;
  }
  

  100% {
    transform: scale(1);
    opacity: 1;
  }
 
`;

export const ButtonTrash = styled(ButtonEl)`
position:absolute;
top: 5px;
right: 10px;
display: flex;
z-index: 10;
align-items: center;
margin: 3px 0 0 0;
padding: 2px 2px;
&:hover {
  background: #ebecf0b8;
  border-radius: 3px;
}
transform: scale(0);
z-index:10;
`

export const ListCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media ${device.mobileL} {
    flex-direction: column;
  }
  &:hover ${ButtonTrash} {
    animation: ${scale} 1s ease alternate;
    animation-fill-mode:forwards
  }
  justify-conten:center;
`;
export const LiCard = styled.li<{ width?: string }>`
  box-sizing: border-box;
  cursor: pointer;
  padding: 4px ;
  width: ${(props) => props.width || "25%"};
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.mobileL} {
    width: 100%;
  }
  
    position: relative;
    overflow: hidden;
    -webkit-transition: all 0.3ms ease;
    transition: all 0.3ms ease;
    &:hover{
      transform: scale(1.01);
      border-radius:3px;
    }
`;

export const WrapperCard = styled.div<{ background?: string }>`
  position: relative;
  border-radius: 3px;
  background-color: ${(props) => props.background || "#091e421c"};
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  -webkit-transition: all 0.5ms ease;
  transition: all 0.3ms ease;
  &:hover {
    background-color: ${(props) => props.background || "#091e421c"};
    opacity: 0.85;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;






