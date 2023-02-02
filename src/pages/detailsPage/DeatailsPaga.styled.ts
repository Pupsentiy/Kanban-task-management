import styled from "styled-components";

import { device } from "../../styles/device.styled";
import { Flex } from "../../styles/index.styled";

export const ContainerColumn = styled(Flex)`

@media ${device.mobileL} {
 flex-direction:column;
}
`
export const WrapperColumn = styled.div`
  width: 33.33%;

  @media ${device.mobileL} {
    width:100%;
    margin-bottom:15px;
   }
`;