import { ITask } from "../types/store.types";
import {
  CLOSE_EDIT_TASK_MODAL,
  CREATE_CARD_PROJECT,
  CREATE_TASK,
  CRETEPROMODAL__CLOSE,
  CRETEPROMODAL__OPEN,
  DRAGGABLE_DEVELOPMENT,
  DRAGGABLE_DONE,
  DRAGGABLE_QUEUE,
  EDIT_TASK,
  OPEN_EDIT_TASK_MODAL,
  SEARCH_TASK,
  SELECTE_TASK,
} from "./actionCreators";

export const setOpenCreateProjModal = () => ({
  type: CRETEPROMODAL__OPEN,
  payload: true,
});

export const setCloseCreateProjModal = () => ({
  type: CRETEPROMODAL__CLOSE,
  payload: false,
});

export const setCreateCardProject = (name: string) => ({
  type: CREATE_CARD_PROJECT,
  payload: name,
});

export const setCreateTask = (titleTask: string, id: string | undefined) => ({
  type: CREATE_TASK,
  payload: { titleTask, id },
});

export const setOpenEditTaskModal = () => ({
  type: OPEN_EDIT_TASK_MODAL,
  payload: true,
});

export const setCloseEditTaskModal = () => ({
  type: CLOSE_EDIT_TASK_MODAL,
  payload: false,
});

export const setSelectTask = (task: ITask, column: string) => ({
  type: SELECTE_TASK,
  payload: { task, column },
});

export const setEditTask = (
  task: ITask,
  id: string | undefined,
  column: string
) => ({
  type: EDIT_TASK,
  payload: { task, id, column },
});

export const setDraggableQueueTask = (
  queue: ITask[],
  id: string | undefined
) => ({
  type: DRAGGABLE_QUEUE,
  payload: { queue, id },
});

export const setDraggableDevelopmentTask = (
  development: ITask[],
  id: string | undefined
) => ({
  type: DRAGGABLE_DEVELOPMENT,
  payload: { development, id },
});

export const setDraggableDoneTask = (
  done: ITask[],
  id: string | undefined
) => ({
  type: DRAGGABLE_DONE,
  payload: { done, id },
});

export const setSearchTask = (searchText: string, idProject: string) => ({
  type: SEARCH_TASK,
  payload: { searchText, idProject },
});
