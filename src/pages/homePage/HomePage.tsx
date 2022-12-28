import { useDispatch, useSelector } from "react-redux";

import ModalCreateProject from "../../components/modalCreateProject/ModalCreateProject";

import { setOpenCreateProjModal } from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";

import { AiOutlinePlus } from "react-icons/ai";
import {
  ContainerEl,
  H5,
  H6,
  NavLinkEL,
  WrapperEl,
} from "../../styles/index.styled";
import { ListCards, LiCard, WrapperCard } from "./HomePage.styled";

import { ICard } from "../../store/types/store.types";

const HomePage = () => {
  const dispatch = useDispatch();
  const toggleModalCreProject = useSelector(
    (state: RootState) => state.toggleCreateProModal.toggleModal
  );
  const projects = useSelector(
    (state: RootState) => state.createCardProject.projects
  );
  const openCreateProModal = () => {
    dispatch(setOpenCreateProjModal());
  };
  return (
    <ContainerEl>
      <WrapperEl margin="15px 0 0 0" padding="0 8px">
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
          {projects &&
            projects.map((project: ICard, i: number) => (
              <NavLinkEL key={i} to={`${project.id}`} width="25%">
                <LiCard width="100%">
                  <WrapperCard background="#782175">
                    <H6>{project.name}</H6>
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
