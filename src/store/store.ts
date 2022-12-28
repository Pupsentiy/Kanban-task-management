import { compose, legacy_createStore } from "redux";
import { combineReducers } from "redux";

import { createCardProject } from "./reducers/createCardProjectReducer";
import { toggleCreateProModal } from "./reducers/creteProModalToggleReducer";

import { ICard } from "./types/store.types";

const saveToLocalStorage = (state: ICard[]) => {
  try {
    localStorage.setItem("card", JSON.stringify(state));
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
const store = legacy_createStore(
  rootReducer,
  composeEnhancers()
);

store.subscribe(() => {
  saveToLocalStorage(store.getState().createCardProject.projects);
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
