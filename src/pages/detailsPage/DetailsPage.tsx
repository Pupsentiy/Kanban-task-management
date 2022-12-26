import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Column from "../../components/column/Column";
import ModalEditTask from "../../components/modalEditTask/ModalEditTask";
import {
  setDraggableDevelopmentTask,
  setDraggableQueueTask,
} from "../../store/actions/actionTypes";
import { ICard } from "../../store/reducers/createCardProjectReducer";
import { RootState } from "../../store/store";
import { ContainerEl, Flex } from "../../styles/index.styled";

export const WrapperColumn = styled.div`
width:33.33%;
`

const DetailsPage = () => {
  const { id } = useParams();
  const cardProject = useSelector(
    (state: RootState) => state.createCardProject.projects
  );

  const title = { queue: "Queue", development: "Development", done: "Done" };

  const selectProject = Object.values(cardProject).find(
    (card) => card.id === id
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    let add,
      queue = selectProject.queue,
      development = selectProject.development,
      done = selectProject.done
      
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (source.droppableId === "Queue") {
      add = queue[source.index];
      queue.splice(source.index, 1);
    } else {
      add = development[source.index];
      development.splice(source.index, 1);
    }

    if (destination.droppableId === "Queue") {
      queue.splice(destination.index, 0, add);
    } else {
      development.splice(destination.index, 0, add);
    }

    setDraggableQueueTask(queue);
    setDraggableDevelopmentTask(development);
  };
console.log(selectProject);
  return (
    <ContainerEl>
      <Flex justifyContent="space-beetwen">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Queue">
            {(provided) => (
              <WrapperColumn ref={provided.innerRef} {...provided.droppableProps}>
                <Column
                  project={selectProject?.queue}
                  column={title.queue}
                  borderColor="#ff0000"
                />
                {provided.placeholder}
              </WrapperColumn>
            )}
          </Droppable>
          <Droppable droppableId="Development">
            {(provided) => (
              <WrapperColumn ref={provided.innerRef} {...provided.droppableProps}>
                <Column
                  project={selectProject?.development}
                  column={title.development}
                  borderColor="#ffa500"
                />
                {provided.placeholder}
              </WrapperColumn>
            )}
          </Droppable>
          <Droppable droppableId="Done">
            {(provided) => (
              <WrapperColumn ref={provided.innerRef} {...provided.droppableProps}>
                <Column
                  project={selectProject?.done}
                  column={title.done}
                  borderColor="#04ff00"
                />
                {provided.placeholder}
              </WrapperColumn>
            )}
          </Droppable>
        </DragDropContext>
        <ModalEditTask />
      </Flex>
    </ContainerEl>
  );
};

export default DetailsPage;
