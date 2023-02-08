import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";

import ModalCreateBoard from "../../components/modalCreateBoard/ModalCreateBoard";

import { setOpenCreateProjModal } from "../../store/actions/actionTypes";
import { IProject } from "../../store/types/store.types";
import { RootState } from "../../store/store";

import { ContainerEl, H5, H6, WrapperEl } from "../../styles/index.styled";
import {
  ListCards,
  LiCard,
  WrapperCard,
  ContainerIconEl,
  NavLinkA,
} from "./HomePage.styled";

const HomePage = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);
  const [color, setColor] = useState<string>('');
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
    setColor(backgroundColor)
      document.body.style.backgroundColor = color;
  };

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      document.body.style.backgroundColor = "#eef2f9";
    }
  }, []);

  const getIdBoard = (i: number) => {
    setIndex(i);
  };

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
              <LiCard
                width="25%"
                key={i}
                onMouseEnter={() => {
                  getIdBoard(i);
                }}
              >
                <NavLinkA
                  key={i}
                  to={`${project.id}`}
                  onClick={() =>
                    onChangeBackgroundColorBody(project.background)
                  }
                >
                  <WrapperCard background={project.background}>
                    <WrapperEl padding="10px">
                      <H6 textAlign="center">{project.name}</H6>
                    </WrapperEl>

                    {index === i ? (
                      <ContainerIconEl right="5px" top="1px">
                        <IoTrashBin fontSize="16px" />
                      </ContainerIconEl>
                    ) : null}
                  </WrapperCard>
                </NavLinkA>
              </LiCard>
            ))}
        </ListCards>
      </WrapperEl>
      {toggleModalCreProject ? <ModalCreateBoard /> : null}
    </ContainerEl>
  );
};

export default HomePage;
