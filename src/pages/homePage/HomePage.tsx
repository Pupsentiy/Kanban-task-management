import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";

import ModalCreateBoard from "../../components/modalCreateBoard/ModalCreateBoard";

import {
  setDeleteBoard,
  setOpenCreateProjModal,
} from "../../store/actions/actionTypes";

import { IBoard } from "../../store/types/store.types";
import { RootState } from "../../store/store";

import {
  ContainerEl,
  H5,
  H6,
  NavLinkEL,
  WrapperEl,
} from "../../styles/index.styled";
import { ListCards, LiCard, WrapperCard, ButtonTrash } from "./HomePage.styled";

const HomePage = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);
  const toggleModalCreProject = useSelector(
    (state: RootState) => state.toggleCreateProModal.toggleModal
  );
  const boards = useSelector(
    (state: RootState) => state.createCardProject.boards
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
  });

  const getIdBoard = (i: number) => {
    setIndex(i);
  };

  const deleteBoard = (id: string) => {
    dispatch(setDeleteBoard(id));
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
          {boards &&
            boards.map((project: IBoard, i: number) => (
              <LiCard
                width="25%"
                key={i}
                onMouseEnter={() => {
                  getIdBoard(i);
                }}
              >
                <NavLinkEL
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
                  </WrapperCard>
                </NavLinkEL>
                {index === i ? (
                  <ButtonTrash
                    type="button"
                    margin="0"
                    padding="0"
                    onClick={() => {
                      deleteBoard(project.id);
                    }}
                  >
                    <IoTrashBin fontSize="16px" />
                  </ButtonTrash>
                ) : null}
              </LiCard>
            ))}
        </ListCards>
      </WrapperEl>
      {toggleModalCreProject ? <ModalCreateBoard /> : null}
    </ContainerEl>
  );
};

export default HomePage;
