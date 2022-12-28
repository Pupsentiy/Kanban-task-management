import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Column from "../../components/column/Column";
import ModalEditTask from "../../components/modalEditTask/ModalEditTask";

import {
  setDraggableDevelopmentTask,
  setDraggableDoneTask,
  setDraggableQueueTask,
} from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";
import { ICard } from "../../store/types/store.types";

import { ContainerEl, Flex, WrapperColumn } from "../../styles/index.styled";

const DetailsPage = () => {
  const { id } = useParams();
  const cardProject = useSelector(
    (state: RootState) => state.createCardProject.projects
  );
  const dispatch = useDispatch();

  const title = { queue: "Queue", development: "Development", done: "Done" };

  const selectProject: ICard = Object.values(cardProject).find(
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
    dispatch(setDraggableQueueTask(queue,id));
    dispatch(setDraggableDevelopmentTask(development,id));
    dispatch(setDraggableDoneTask(done,id));
  };

  return (
    <>
      {selectProject && (
        <ContainerEl>
          <Flex justifyContent="space-beetwen">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="Queue">
                {(provided, snapshot) => (
                  <WrapperColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Column
                      project={selectProject?.queue}
                      column={title.queue}
                      background={snapshot.isDraggingOver ? "#dadadb" : ""}
                      borderColor="#ff0000"
                    />
                    {provided.placeholder}
                  </WrapperColumn>
                )}
              </Droppable>
              <Droppable droppableId="Development">
                {(provided, snapshot) => (
                  <WrapperColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Column
                      project={selectProject?.development}
                      column={title.development}
                      background={snapshot.isDraggingOver ? "#dadadb" : ""}
                      borderColor="#ffa500"
                    />
                    {provided.placeholder}
                  </WrapperColumn>
                )}
              </Droppable>
              <Droppable droppableId="Done">
                {(provided, snapshot) => (
                  <WrapperColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Column
                      project={selectProject?.done}
                      column={title.done}
                      background={snapshot.isDraggingOver ? "#dadadb" : ""}
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
