export interface ReadonlyObj {
  readonly [index: string]: string;
}

export interface IProject {
  [key: string]:any
  id: string;
  name: string;
  queue: ITask[];
  development: ITask[];
  done: ITask[];
  background:string
}
export type TFinishTDate = {
  date?: Date;
  checkDate: boolean;
};

export interface ITask {
  projectId:string
  column:string;
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
  [key: string]: any;
};

export type TIinitialState = {
  projects:IProject[];
  selectTask: ITask;
  searchTask:ITask[]
  toggleModalEditTask: boolean;
}
export interface IToggleCreProModal {
  toggleModal: boolean;
}

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
  payload: { open: boolean };
};

export type TCloseModalEditTask = {
  type: ActionTypes.CLOSE_EDIT_TASK_MODAL;
  payload: { close: boolean };
};

export type TSelectedTask = {
  type: ActionTypes.SELECTE_TASK;
  payload: { task: ITask; column: string };
};

export type TEditTask = {
  type: ActionTypes.EDIT_TASK;
  payload: { task: ITask; id: string | undefined; column: string };
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
  payload: { serachText: string };
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
  | TSearchTask;