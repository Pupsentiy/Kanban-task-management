import { v4 as uuidv4 } from "uuid";

import {
  IBoard,
  TIinitialState,
  ITask,
  TComment,
  ISubTask,
  ActionTypes,
  TActionTypes,
  IColumn,
} from "../types/store.types";

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

const initialState: TIinitialState = {
  boards: getFromLocalStorage("boards")
    ? JSON.parse(getFromLocalStorage("boards") || "{}")
    : ([] as IBoard[]),
  selectTask: {} as ITask,
  searchTask: [] as ITask[],
  toggleModalEditTask: false,
  activeButtonDelete: false,
};

export const createCardProject = (
  state = initialState,
  action: TActionTypes
): TIinitialState => {
  switch (action.type) {
    case ActionTypes.CREATE_CARD_PROJECT:
      const newProjectId: string = uuidv4();
      return {
        ...state,
        boards: [
          ...state.boards,
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
        boards: state.boards.map((board) => {
          if (board.id === action.payload?.id) {
            const newTask = {
              boardId: board.id,
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
              ...board,
              queue: [...board.queue, newTask],
            };
          } else {
            return board;
          }
        }),
      };
    case ActionTypes.SELECTE_TASK:
      const editTask = {
        boardId: action.payload.task.boardId,
        column: action.payload.column,
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
      return {
        ...state,
        selectTask: { ...state.selectTask, ...editTask },
      };

    case ActionTypes.EDIT_TASK:
      const column: string = action.payload.column;
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload?.id) {
            return {
              ...board,
              [column]: board[column as keyof IColumn].map((task: ITask) => {
                if (task.id === action.payload.task.id) {
                  const editTask = {
                    boardsId: board.id,
                    column: column,
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
            return board;
          }
        }),
      };

    case ActionTypes.DRAGGABLE_QUEUE:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload.id) {
            board.queue = action.payload.queue;
          }
          return board;
        }),
      };
    case ActionTypes.DRAGGABLE_DEVELOPMENT:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload.id) {
            board.development = action.payload.development;
          }
          return board;
        }),
      };

    case ActionTypes.DRAGGABLE_DONE:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload.id) {
            board.done = action.payload.done;
          }
          return board;
        }),
      };

    case ActionTypes.SEARCH_TASK:
      let arr: ITask[] = [];
      state.boards.map((board) =>
        Object.values(board).forEach((board: IBoard) => {
          if (Array.isArray(board)) {
            let newArr: ITask[] = board.filter((task: ITask) =>
              task.titleTask.includes(action.payload)
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
    case ActionTypes.ACTIVE_BUTTON:
      return {
        ...state,
        activeButtonDelete: action.payload,
      };
    case ActionTypes.DEACTIVE_BUTTON:
      return {
        ...state,
        activeButtonDelete: action.payload,
      };
    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload.boardId) {
            return {
              ...board,
              [action.payload.column]: board[
                action.payload.column as keyof IColumn
              ].filter((task) => task.id !== action.payload.id),
            };
          } else {
            return board;
          }
        }),
      };
    case ActionTypes.DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(
          (board) => board.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
