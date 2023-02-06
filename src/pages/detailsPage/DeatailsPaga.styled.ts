import styled from "styled-components";
import { device } from "../../styles/device.styled";

import { ContainerEl, Flex } from "../../styles/index.styled";

export const ContainerColumn = styled(Flex)`
min-height:calc(100vh - 160px);
@media ${device.mobileL} {
  min-height:calc(100vh - 166px);
}
`
export const WrapperColumn = styled.div`
  min-width: 341px;
  width:100%;
  @media ${device.mobileM} {
    min-width: 283px;
  }
`;

export const ContainerDetailsPage = styled(ContainerEl)`
    overflow-x: auto;
    overflow-y: hidden;
`