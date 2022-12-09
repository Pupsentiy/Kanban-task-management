import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Column from "../../components/column/Column";
import ModalEditTask from "../../components/modalEditTask/ModalEditTask";
import { RootState } from "../../store/store";
import { ContainerEl, Flex } from "../../styles/index.styled";

const DetailsPage = () => {
  const { id } = useParams();
  const [activeInputDate,setActiveInputDate] = useState(false)
  const cardProject = useSelector(
    (state: RootState) => state.createCardProject.projects
  );
  console.log(activeInputDate);
  
  const title = { queue: "Queue", development: "Development", done: "Done" };

  const selectProject = Object.values(cardProject).find(
    (card) => card.id === id
  );
  return (
    <ContainerEl>
      <Flex>
        <Column
          setActiveInputDate={setActiveInputDate}
          project={selectProject?.queue}
          column={title.queue}
          borderColor="#ff0000"
        />
        <Column
          setActiveInputDate={setActiveInputDate}
          project={selectProject?.development}
          column={title.development}
          borderColor="#ffa500"
        />
        <Column
          setActiveInputDate={setActiveInputDate}
          project={selectProject?.done}
          column={title.done}
          borderColor="#04ff00"
        />
      <ModalEditTask  setActiveInputDate={setActiveInputDate} activeInputDate={activeInputDate}/>
      </Flex>
    </ContainerEl>
  );
};

export default DetailsPage;
