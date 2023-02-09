export enum ActionTypes {
  CREATE_CARD_PROJECT = "CREATE_CARD_PROJECT",
  CREATE_TASK = "CREATE_TASK",
  OPEN_EDIT_TASK_MODAL = "OPEN_EDIT_TASK_MODAL",
  CLOSE_EDIT_TASK_MODAL = "CLOSE_EDIT_TASK_MODAL",
  SELECTE_TASK = "SELECTE_TASK",
  EDIT_TASK = "EDIT_TASK",
  DRAGGABLE_QUEUE = "DRAGGABLE_QUEUE",
  DRAGGABLE_DEVELOPMENT = "DRAGGABLE_DEVELOPMENT",
  DRAGGABLE_DONE = "DRAGGABLE_DONE",
  SEARCH_TASK = "SEARCH_TASK",
  ACTIVE_BUTTON ='ACTIVE_BUTTON',
  DEACTIVE_BUTTON='DEACTIVE_BUTTON',
  DELETE_TASK = 'DELETE_TASK',
  DELETE_BOARD='DELETE_BOARD'
}

export type IColumn = {
    queue: ITask[];
    development: ITask[];
    done: ITask[];
}

export interface IProject {
  id: string;
  name: string;
  background: string;
  queue: ITask[];
  development: ITask[];
  done: ITask[];
}

export type TFinishTDate = {
  date?: Date;
  checkDate: boolean;
};

export interface ITask {
  projectId: string;
  column: string;
  id: string;
  numberTask: string;
  titleTask: string;
  description: string;
  createTaskDate: Date;
  proccesTime: string;
  finishDate: TFinishTDate | null;
  priorityMarker: IPriorityMarker | null;
  files: File[];
  currentStatus: string;
  subTasks: ISubTask[];
  comments: TComment[];
}

export interface IPriorityMarker {
  id: number;
  name: string;
  color: string;
  colorCircle: string;
  check: boolean;
}

export interface ISubTask {
  id: string;
  description: string;
  check: boolean;
}

export type TComment = {
  id: string;
  text: string;
  subComments: TComment[];
};

export type TIinitialState = {
  projects: IProject[];
  selectTask: ITask;
  searchTask: ITask[];
  toggleModalEditTask: boolean;
  activeButtonDelete:boolean
};
export interface IToggleCreProModal {
  toggleModal: boolean;
}

export type TCreateCardProjects = {
  type: ActionTypes.CREATE_CARD_PROJECT;
  payload: { name: string; color: string };
};

export type TCreateTask = {
  type: ActionTypes.CREATE_TASK;
  payload: { titleTask: string; id: string | undefined };
};

export type TOpenModalEditTask = {
  type: ActionTypes.OPEN_EDIT_TASK_MODAL;
  payload: boolean;
};

export type TCloseModalEditTask = {
  type: ActionTypes.CLOSE_EDIT_TASK_MODAL;
  payload: boolean;
};

export type TSelectedTask = {
  type: ActionTypes.SELECTE_TASK;
  payload: { task: ITask; column: string };
};

export type TEditTask = {
  type: ActionTypes.EDIT_TASK;
  payload: { task: ITask; column: string; id: string | undefined };
};

export type TDraggableQueueTask = {
  type: ActionTypes.DRAGGABLE_QUEUE;
  payload: { queue: ITask[]; id: string | undefined };
};

export type TDraggableDevelopmentTask = {
  type: ActionTypes.DRAGGABLE_DEVELOPMENT;
  payload: { development: ITask[]; id: string | undefined };
};

export type TDraggableDoneTask = {
  type: ActionTypes.DRAGGABLE_DONE;
  payload: { done: ITask[]; id: string | undefined };
};

export type TSearchTask = {
  type: ActionTypes.SEARCH_TASK;
  payload: string;
};

export type TActiveButton = {
  type: ActionTypes.ACTIVE_BUTTON;
  payload: boolean;
};

export type TDeactiveButton = {
  type: ActionTypes.DEACTIVE_BUTTON;
  payload: boolean;
};
export type TDeleteTask = {
  type: ActionTypes.DELETE_TASK;
  payload: ITask;
};
export type TDeleteBoard = {
  type: ActionTypes.DELETE_BOARD;
  payload: string;
};

export type TActionTypes =
  | TCreateCardProjects
  | TCreateTask
  | TOpenModalEditTask
  | TCloseModalEditTask
  | TSelectedTask
  | TEditTask
  | TDraggableQueueTask
  | TDraggableDevelopmentTask
  | TDraggableDoneTask
  | TSearchTask
  | TActiveButton
  | TDeactiveButton
  | TDeleteTask
  | TDeleteBoard

