import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ModalCreateProject from "../../components/modalCreateProject/ModalCreateProject";

import { setOpenCreateProjModal } from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";
import { ICard } from "../../store/reducers/createCardProjectReducer";

import { AiOutlinePlus } from "react-icons/ai";
import {
  ContainerEl,
  H5,
  H6,
  NavLinkEL,
  WrapperEl,
} from "../../styles/index.styled";

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
  transition: all 0.1ms ease;
  &:hover {
    background-color: #c4c6cb33;
  }
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const toggleModalCreProject = useSelector(
    (state: RootState) => state.toggleCreateProModal.toggleModal
  );
  const cardProject = useSelector(
    (state: RootState) => state.createCardProject.projects
  );
  const openCreateProModal = () => {
    dispatch(setOpenCreateProjModal());
  };
  return (
    <ContainerEl>
      <WrapperEl margin="15px 0 0 0">
        <H5 fontWeight="400">Project</H5>
      </WrapperEl>
      <WrapperEl margin="20px 0 0 0">
        <ListCards>
          <LiCard onClick={openCreateProModal}>
            <WrapperCard>
              <H6 margin="0 5px 0 0">Создать доску</H6>
              <AiOutlinePlus fontSize="20px" />
            </WrapperCard>
          </LiCard>
          {cardProject &&
            cardProject.map((card: ICard, i: number) => (
              <NavLinkEL key={i} to={`${card.id}`} width="25%">
                <LiCard width="100%">
                  <WrapperCard background="#782175">
                    <H6>{card.name}</H6>
                  </WrapperCard>
                </LiCard>
              </NavLinkEL>
            ))}
        </ListCards>
      </WrapperEl>
      {toggleModalCreProject ? <ModalCreateProject /> : null}
    </ContainerEl>
  );
};

export default HomePage;
