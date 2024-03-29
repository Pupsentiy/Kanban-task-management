import { compose, legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";

import { createCardProject } from "./reducers/createBoardReducer";
import { toggleCreateProModal } from "./reducers/creteProModalToggleReducer";

import { IBoard } from "./types/store.types";

const saveToLocalStorage = (state: IBoard[]) => {
  try {
    localStorage.setItem("boards", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

export const rootReducer = combineReducers({
  createCardProject,
  toggleCreateProModal,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers()
);

store.subscribe(() => {
  saveToLocalStorage(store.getState().createCardProject.boards);
});
 
export default store;

export type RootState = ReturnType<typeof rootReducer>;
