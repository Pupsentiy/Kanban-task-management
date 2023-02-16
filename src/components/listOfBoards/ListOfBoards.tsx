import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";

import { IBoard } from "../../store/types/store.types";
import {
  setOpenCreateProjModal,
  setDeleteBoard,
} from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";

import {
  ListCards,
  LiCard,
  WrapperCard,
  ButtonTrash,
} from "../../pages/homePage/HomePage.styled";
import { WrapperEl, H6, NavLinkEL } from "../../styles/index.styled";

const ListOfBoards: FC = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);

  const boards = useSelector(
    (state: RootState) => state.createCardProject.boards
  );

  const openCreateProModal = () => {
    dispatch(setOpenCreateProjModal());
  };

  const onChangeBackgroundColorBody = (backgroundColor: string) => {
    document.body.style.backgroundColor = backgroundColor;
  };

  const deleteBoard = (id: string) => {
    dispatch(setDeleteBoard(id));
  };

  const getIdBoard = (i: number) => {
    setIndex(i);
  };

  return (
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
                onClick={() => onChangeBackgroundColorBody(project.background)}
              >
                <WrapperCard background={project.background}>
                  <WrapperEl padding="10px" margin="5px 0 0 0">
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
  );
};

export default ListOfBoards;
