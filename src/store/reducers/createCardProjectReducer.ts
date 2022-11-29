import { v4 as uuidv4 } from "uuid";
import { OtherColumn } from "../../components/column/Column";
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

export interface ITask {
  id: string;
  numberTask: string;
  titleTask: string;
  description: string;
  cretateTaskDate: string; //Date
  proccesTime: string; //Date
  finishDate: string; //date
  priorityTask: string;
  files: string; // File
  currentStatus: string;
  // subTask?: [];
  comment: string;
}

type TCreateTaskPayload = {
  id: string;
  titleTask: string;
};

export interface ICreateCardProject {
  projects: ICard[];
  selectTask: ITask;
  toggleModalEditTask: boolean;
}

type TCreateProjectPayload = string;

// type TActions = TCreateTaskPayload | TCreateProjectPayload | ICreateCardProject | ITask | ICard | any

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

const initialState: ICreateCardProject = {
  projects: getFromLocalStorage("card")
    ? JSON.parse(getFromLocalStorage("card") || "{}")
    : ([] as any[]),
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
      const id = uuidv4().slice(0, 4);
      let currentTime = new Date().toLocaleString();
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            const newTask = {
              id: uuidv4(),
              titleTask: action.payload.titleTask,
              numberTask: id,
              description: "",
              cretateTaskDate: currentTime,
              proccesTime: "",
              finishDate: "",
              priorityTask: "",
              files: "",
              currentStatus: "",
              comment: "",
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
      const { title }: any = action.payload;
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            return{
              ...project,
               [title]:project[title].map((item: any) => {
                if (item.id === action.payload.task.id) {
                  const newObj = {
                    id: action.payload.task.id,
                    titleTask: action.payload.task.titleTask,
                    numberTask: action.payload.task.numberTask,
                    description: action.payload.task.description,
                    cretateTaskDate: action.payload.task.currentTime,
                    proccesTime: action.payload.task.proccesTime,
                    finishDate: action.payload.task.finishDate,
                    priorityTask: action.payload.task.priorityTask,
                    files: action.payload.task.files,
                    currentStatus: action.payload.task.currentStatus,
                    comment: action.payload.task.comment,
                  };
                  return newObj
                }
                return item
              })
          
            }
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
