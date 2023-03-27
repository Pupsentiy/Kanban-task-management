import { useSelector } from "react-redux";
import { useEffect } from "react";

import ModalCreateBoard from "../../components/modalCreateBoard/ModalCreateBoard";
import ListOfBoards from "../../components/listOfBoards/ListOfBoards";

import { RootState } from "../../store/store";

import { ContainerEl, H5, WrapperEl } from "../../styles/index.styled";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const id = useParams()
  console.log(id)
  const toggleModalCreProject = useSelector(
    (state: RootState) => state.toggleCreateProModal.toggleModal
  );

  useEffect(() => {
      document.body.style.backgroundColor = "#eef2f9";
  });

  return (
    <ContainerEl>
      <WrapperEl margin="15px 0 0 0" padding="0 8px">
        <H5 fontWeight="400">My Boards</H5>
      </WrapperEl>
      <ListOfBoards />
      {toggleModalCreProject ? <ModalCreateBoard /> : null}
    </ContainerEl>
  );
};

export default HomePage;
