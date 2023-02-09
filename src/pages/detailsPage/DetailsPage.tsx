import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useEffect } from "react";
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
import { IBoard } from "../../store/types/store.types";

import {
  Flex,
  H5,
} from "../../styles/index.styled";
import { ContainerColumn, ContainerDetailsPage, WrapperColumn } from "./DeatailsPaga.styled";

const DetailsPage = () => {
  const { id } = useParams();

  const boards = useSelector(
    (state: RootState) => state.createCardProject.boards
  );
  const dispatch = useDispatch();

  const title = { queue: "Queue", development: "Development", done: "Done" };

  const selectBoard: IBoard | undefined = Object.values(boards).find(
    (board) => board.id === id
  );
  
  const onDragEnd = (result: DropResult) => {
    if (selectBoard) {
      if (!result.destination) return;
      if (
        result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index
      )
        return;
      const { source, destination } = result;
      let add,
        queue = selectBoard.queue,
        development = selectBoard.development,
        done = selectBoard.done;

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
      dispatch(setDraggableQueueTask(queue, id));
      dispatch(setDraggableDevelopmentTask(development, id));
      dispatch(setDraggableDoneTask(done, id));
    }
  };

  useEffect(() => {
    if(selectBoard !== undefined){
      document.body.style.backgroundColor = selectBoard?.background;
    }
  });

  return (
    <>
      {selectBoard && (
        <ContainerDetailsPage >
          <Flex margin="0 0 10px 0" padding="0 8px" justifyContent="center">
            <H5 fontWeight="500" color="#181717" fontSize="28px">
              Board: {selectBoard.name}
            </H5>
          </Flex>
          <ContainerColumn justifyContent="space-beetwen" >
            <DragDropContext onDragEnd={onDragEnd} >
              <Droppable droppableId="Queue">
                {(provided, snapshot) => (
                  <WrapperColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Column
                      project={selectBoard?.queue}
                      column={title.queue}
                      background={snapshot.isDraggingOver ? "#dadadb" : ""}
                      borderColor="#ff0000"
                      provided={provided}
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
                      project={selectBoard?.development}
                      column={title.development}
                      background={snapshot.isDraggingOver ? "#dadadb" : ""}
                      borderColor="#ffa500"
                      provided={provided}
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
                      project={selectBoard?.done}
                      column={title.done}
                      background={snapshot.isDraggingOver ? "#dadadb" : ""}
                      borderColor="#41cd3f"
                      provided={provided}
                    />
                    {provided.placeholder}
                  </WrapperColumn>
                )}
              </Droppable>
            </DragDropContext>
            <ModalEditTask />
          </ContainerColumn>
        </ContainerDetailsPage>
      )}
    </>
  );
};

export default DetailsPage;
