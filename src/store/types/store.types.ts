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

export interface IIinitialState {
  projects: IProject[];
  selectTask: ITask;
  searchTask:ITask[]
  toggleModalEditTask: boolean;
}
export interface IToggleCreProModal {
  toggleModal: boolean;
}