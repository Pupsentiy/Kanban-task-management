import {
  CRETEPROMODAL__CLOSE,
  CRETEPROMODAL__OPEN,
} from "../actions/actionCreators";

import { IToggleCreProModal } from "../types/store.types";

const initialState: IToggleCreProModal = {
  toggleModal: false,
};

export const toggleCreateProModal = (
  state = initialState,
  action: { type: string; payload: boolean }
) => {
  switch (action.type) {
    case CRETEPROMODAL__OPEN:
      return {
        ...state,
        toggleModal: true,
      };
    case CRETEPROMODAL__CLOSE:
      return {
        ...state,
        toggleModal: false,
      };

    default:
      return state;
  }
};
