export interface ICard {
  id: string;
  name: string;
  queue: ITask[];
  development: ITask[];
  done: ITask[];
  [key: string]: any;
}
export type TFinishTDate = {
  date?: Date;
  checkDate: boolean;
};

export interface ITask {
  projectId:string
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

export interface ICreateCardProject {
  projects: ICard[];
  selectTask: ITask;
  searchTask:any[]
  toggleModalEditTask: boolean;
}
export interface IToggleCreProModal {
  toggleModal: boolean;
}