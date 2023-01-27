import { v4 as uuidv4 } from "uuid";

import {
  IProject,
  IIinitialState,
  ITask,
  TComment,
  ISubTask,
} from "../types/store.types";

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

const initialState: IIinitialState = {
  projects: getFromLocalStorage("projects")
    ? JSON.parse(getFromLocalStorage("projects") || "{}")
    : ([] as IProject[]),
  selectTask: {} as ITask,
  searchTask: [] as ITask[],
  toggleModalEditTask: false,
};

enum ActionTypes {
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

type TCreateCardProjects = {
  type: ActionTypes.CREATE_CARD_PROJECT;
  payload: { name: string; color: string | undefined };
};

type TCreateTask = {
  type: ActionTypes.CREATE_TASK;
  payload: { titleTask: string; id: string | undefined };
};

type TOpenModalEditTask = {
  type: ActionTypes.OPEN_EDIT_TASK_MODAL;
  payload: { open: boolean };
};

type TCloseModalEditTask = {
  type: ActionTypes.CLOSE_EDIT_TASK_MODAL;
  payload: { close: boolean };
};

type TSelectedTask = {
  type: ActionTypes.SELECTE_TASK;
  payload: { task: ITask; column: string };
};

type TEditTask = {
  type: ActionTypes.EDIT_TASK;
  payload: { task: ITask; id: string | undefined; column: string };
};

type TDraggableQueueTask = {
  type: ActionTypes.DRAGGABLE_QUEUE;
  payload: { queue: ITask[]; id: string | undefined };
};

type TDraggableDevelopmentTask = {
  type: ActionTypes.DRAGGABLE_DEVELOPMENT;
  payload: { development: ITask[]; id: string | undefined };
};

type TDraggableDoneTask = {
  type: ActionTypes.DRAGGABLE_DONE;
  payload: { done: ITask[]; id: string | undefined };
};

type TSearchTask = {
  type: ActionTypes.SEARCH_TASK;
  payload: { serachText: string };
};

type TActionTypes =
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
  | any
export const createCardProject = (
  state = initialState,
  action: TActionTypes
) => {
  switch (action.type) {
    case ActionTypes.CREATE_CARD_PROJECT:
      const newProjectId: string = uuidv4();
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            id: newProjectId,
            name: action.payload.name,
            queue: [] as ITask[],
            development: [] as ITask[],
            done: [] as ITask[],
            background: action.payload.color,
          },
        ],
      };
    case ActionTypes.CREATE_TASK:
      const id: string = uuidv4().slice(0, 4);
      const newIdTask: string = uuidv4();
      let currentTime = new Date();
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload?.id) {
            const newTask = {
              projectId: project.id,
              column: "queue",
              id: newIdTask,
              titleTask: action.payload.titleTask,
              numberTask: id,
              description: "",
              createTaskDate: currentTime,
              proccesTime: "",
              finishDate: null,
              priorityMarker: null,
              files: [] as File[],
              currentStatus: "",
              subTasks: [] as ISubTask[],
              comments: [] as TComment[],
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
    case ActionTypes.SELECTE_TASK:
      return {
        ...state,
        selectTask: { ...state.selectTask, ...action.payload.task },
      };

    case ActionTypes.EDIT_TASK:
      const column: string = action.payload.column;
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload?.id) {
            return {
              ...project,
              [column]: project[column].map((task: ITask) => {
                if (task.id === action.payload.task.id) {
                  const editTask = {
                    column: column,
                    projectId: project.id,
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

    case ActionTypes.DRAGGABLE_QUEUE:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload?.id) {
            project.queue = action.payload.queue;
          }
          return project;
        }),
      };
    case ActionTypes.DRAGGABLE_DEVELOPMENT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload?.id) {
            project.development = action.payload.development;
          }
          return project;
        }),
      };

    case ActionTypes.DRAGGABLE_DONE:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            project.done = action.payload.done;
          }
          return project;
        }),
      };

    case ActionTypes.SEARCH_TASK:
      let arr: ITask[] = [];
      state.projects.map((project) =>
        Object.values(project).forEach((column:IProject) => {
          if (Array.isArray(column)) {
            let newArr = column.filter((task) =>
            console.log(task)
            );
            if (newArr.length > 0) {
              newArr.forEach((element) => {
                if (element !== undefined) {
                  if (!arr.includes(element)) {
                    arr.push(element);
                  }
                }
              });
            }
          }
        })
      );
      return {
        ...state,
        searchTask: arr,
      };
    case ActionTypes.OPEN_EDIT_TASK_MODAL:
      return {
        ...state,
        toggleModalEditTask: action.payload,
      };
    case ActionTypes.CLOSE_EDIT_TASK_MODAL:
      return {
        ...state,
        toggleModalEditTask: action.payload,
      };
    default:
      return state;
  }
};
