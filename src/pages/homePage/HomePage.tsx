import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ModalCreateBoard from "../../components/modalCreateBoard/ModalCreateBoard";

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

import { IProject } from "../../store/types/store.types";

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

  const onChangeBackgroundColorBody = (backgroundColor: string) => {
    document.body.style.backgroundColor = backgroundColor;
  };

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      document.body.style.backgroundColor = "#eef2f9";
    }
  }, []);

  return (
    <ContainerEl>
      <WrapperEl margin="15px 0 0 0" padding="0 8px">
        <H5 fontWeight="400">My Boards</H5>
      </WrapperEl>
      <WrapperEl margin="20px 0 0 0">
        <ListCards>
          <LiCard onClick={openCreateProModal}>
            <WrapperCard>
              <H6 margin="0 5px 0 0">Ceate board</H6>
              <AiOutlinePlus fontSize="20px" />
            </WrapperCard>
          </LiCard>
          {projects &&
            projects.map((project: IProject, i: number) => (
              <LiCard width="25%" >
              <NavLinkEL
                key={i}
                to={`${project.id}`}
                
                onClick={() => onChangeBackgroundColorBody(project.background)}
              >
                  <WrapperCard background={project.background}>
                    <H6>{project.name}</H6>
                  </WrapperCard>
              </NavLinkEL>
              </LiCard>
            ))}
        </ListCards>
      </WrapperEl>
      {toggleModalCreProject ? <ModalCreateBoard /> : null}
    </ContainerEl>
  );
};

export default HomePage;
