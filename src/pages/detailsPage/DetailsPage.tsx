import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Column from "../../components/column/Column";
import ModalEditTask from "../../components/modalEditTask/ModalEditTask";
import {
  setDraggableDevelopmentTask,
  setDraggableDoneTask,
  setDraggableQueueTask,
} from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";
import { ContainerEl, Flex } from "../../styles/index.styled";

export const WrapperColumn = styled.div`
  width: 33.33%;
`;

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
    if (!result.destination) return;
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    )
      return;
    const { source, destination } = result;
    let add,
      queue = selectProject.queue,
      development = selectProject.development,
      done = selectProject.done;

    if (source.droppableId === "Queue") {
      add = queue[source.index];
      queue.splice(source.index, 1);
    } else if (source.droppableId === "Development") {
      add = development[source.index];
      development.splice(source.index, 1);
    } else {
      add = done[source.index];
      done.splice(source.index, 1);
    }

    if (destination.droppableId === "Queue") {
      queue.splice(destination.index, 0, add);
    } else if (destination.droppableId === "Development") {
      development.splice(destination.index, 0, add);
    } else {
      done.splice(destination.index, 0, add);
    }

    setDraggableQueueTask(queue);
    setDraggableDevelopmentTask(development);
    setDraggableDoneTask(done);
  };
  return (
    <>
      {selectProject && (
        <ContainerEl>
          <Flex justifyContent="space-beetwen">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="Queue">
                {(provided) => (
                  <WrapperColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
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
                  <WrapperColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
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
                  <WrapperColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
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
      )}
    </>
  );
};

export default DetailsPage;
