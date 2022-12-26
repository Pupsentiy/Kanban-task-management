import { ITask } from "../reducers/createCardProjectReducer";
import {
  CLOSE_EDIT_TASK_MODAL,
  CREATE_CARD_PROJECT,
  CREATE_TASK,
  CRETEPROMODAL__CLOSE,
  CRETEPROMODAL__OPEN,
  DRAGGABLE_DEVELOPMENT,
  DRAGGABLE_QUEUE,
  EDIT_TASK,
  OPEN_EDIT_TASK_MODAL,
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

export const setDraggableQueueTask = (queue: ITask[]) => ({
  type: DRAGGABLE_QUEUE,
  payload: queue,
});

export const setDraggableDevelopmentTask = (development: ITask[]) => ({
  type: DRAGGABLE_DEVELOPMENT,
  payload: development,
});
