import styled from "styled-components";
import { device } from "../../styles/device.styled";

import { ContainerEl, Flex } from "../../styles/index.styled";

export const ContainerColumn = styled(Flex)`
`;
export const WrapperColumn = styled.div`
  min-width: 341px;
  width: 100%;
  height: 100%;
  @media ${device.mobileM} {
    min-width: 283px;
  }
`;

export const ContainerDetailsPage = styled(ContainerEl)`
  overflow-x: auto;
`;
