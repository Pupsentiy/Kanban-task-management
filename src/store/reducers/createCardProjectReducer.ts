import { v4 as uuidv4 } from "uuid";

import {
  CLOSE_EDIT_TASK_MODAL,
  CREATE_CARD_PROJECT,
  CREATE_TASK,
  DRAGGABLE_DEVELOPMENT,
  DRAGGABLE_DONE,
  DRAGGABLE_QUEUE,
  EDIT_TASK,
  OPEN_EDIT_TASK_MODAL,
  SEARCH_TASK,
  SELECTE_TASK,
} from "../actions/actionCreators";

import { ICard, ICreateCardProject, ITask } from "../types/store.types";

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
  searchTask:[],
  toggleModalEditTask: false,
};
export const createCardProject = (
  state = initialState,
  action: { type: string; payload: any }
) => {
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
              priorityMarker: null,
              files: [],
              currentStatus: "",
              subTasks: [],
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
                    priorityMarker: action.payload.task.priorityMarker,
                    files: action.payload.task.files,
                    currentStatus: action.payload.task.currentStatus,
                    subTasks: action.payload.task.subTasks,
                    comments: action.payload.task.comments,
                  };
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

    case DRAGGABLE_QUEUE:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            project.queue = action.payload.queue;
          }
          return project;
        }),
      };
    case DRAGGABLE_DEVELOPMENT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            project.development = action.payload.development;
          }
          return project;
        }),
      };

    case DRAGGABLE_DONE:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            project.done = action.payload.done;
          }
          return project;
        }),
      };

    case SEARCH_TASK:
      const allTask = state.projects.map(project => { 
        

        //  return [...project.queue,...project.development,...project.done].filter(task => {
        //   if(task.numberTask.includes(action.payload) || task.titleTask.includes(action.payload)){
        //     return task
        //   }
        //  })
      })
      // console.log(allTask);
      return {
        ...state,
        searchTask:[...state.searchTask,...allTask]
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
