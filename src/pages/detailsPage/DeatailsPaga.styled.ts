import styled from "styled-components";

import { device } from "../../styles/device.styled";
import { Flex } from "../../styles/index.styled";

export const ContainerColumn = styled(Flex)`

@media ${device.tablet} {
 flex-direction:column;
}
`
export const WrapperColumn = styled.div`
  width: 33.33%;

  @media ${device.tablet} {
    width:75%;
    margin:0 auto;
    margin-bottom:15px;
   }
   @media ${device.mobileL} {
    width:100%;
    margin:0 auto;
    margin-bottom:15px;
   }
`;