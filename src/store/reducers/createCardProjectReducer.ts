import { now } from "moment";
import { v4 as uuidv4 } from "uuid";
import {
  CLOSE_EDIT_TASK_MODAL,
  CREATE_CARD_PROJECT,
  CREATE_TASK,
  EDIT_TASK,
  OPEN_EDIT_TASK_MODAL,
  SELECTE_TASK,
} from "../actions/actionCreators";

// const card =
//   localStorage.getItem("card") !== null
//     ? JSON.parse(localStorage.getItem("card") as string)
//     : [];

export interface ICard {
  id: string;
  name: string;
  queue: ITask[];
  development: ITask[];
  done: ITask[];
  [key: string]: any;
}
export type TFinishTDate ={
  date:'';
  checkDate:true;
}

export interface ITask {
  id: string;
  numberTask: string;
  titleTask: string;
  description: string;
  createTaskDate: Date; //Date
  proccesTime: string; //Date
  finishDate: TFinishTDate | null; //date
  priorityTask: string;
  files: string; // File
  currentStatus: string;
  // subTask?: [];
  comments: TComment[];
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
  toggleModalEditTask: boolean;
}

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

const initialState: ICreateCardProject = {
  projects: getFromLocalStorage("card")
    ? JSON.parse(getFromLocalStorage("card") || "{}")
    : ([] as ICard[]),
  selectTask: {} as ITask,
  toggleModalEditTask: false,
};
export const createCardProject = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  console.log(state);

  switch (action.type) {
    case CREATE_CARD_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            id: uuidv4(),
            name: action.payload,
            queue: [],
            development: [],
            done: [],
          },
        ],
      };
    case CREATE_TASK:
      const id: string = uuidv4().slice(0, 4);
      let currentTime = new Date();
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            const newTask = {
              id: uuidv4(),
              titleTask: action.payload.titleTask,
              numberTask: id,
              description: "",
              createTaskDate: currentTime,
              proccesTime: "",
              finishDate: null,
              priorityTask: "",
              files: "",
              currentStatus: "",
              comments: [],
            };
            return {
              ...project,
              queue: [...project.queue, newTask],
            };
          } else {
            return project;
          }
        }),
      };
    case SELECTE_TASK:
      return {
        ...state,
        selectTask: { ...state.selectTask, ...action.payload },
      };

    case EDIT_TASK:
      const column: string = action.payload.column;
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            return {
              ...project,
              [column]: project[column].map((task: ITask) => {
                if (task.id === action.payload.task.id) {
                  const editTask = {
                    id: action.payload.task.id,
                    titleTask: action.payload.task.titleTask,
                    numberTask: action.payload.task.numberTask,
                    description: action.payload.task.description,
                    createTaskDate: action.payload.task.createTaskDate,
                    proccesTime: action.payload.task.proccesTime,
                    finishDate: action.payload.task.finishDate,
                    priorityTask: action.payload.task.priorityTask,
                    files: action.payload.task.files,
                    currentStatus: action.payload.task.currentStatus,
                    comments: action.payload.task.comments,
                  };
                  // console.log(editTask,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                  return editTask;
                }

                return task;
              }),
            };
          } else {
            return project;
          }
        }),
      };
    case OPEN_EDIT_TASK_MODAL:
      return {
        ...state,
        toggleModalEditTask: true,
      };
    case CLOSE_EDIT_TASK_MODAL:
      return {
        ...state,
        toggleModalEditTask: false,
      };
    default:
      return state;
  }
};
