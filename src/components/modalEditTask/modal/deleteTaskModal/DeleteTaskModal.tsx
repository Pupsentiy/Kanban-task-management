import { FC } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Button from "../../../button/Button";

import { RootState } from "../../../../store/store";
import { ITask } from "../../../../store/types/store.types";

import { PDiscriptionEl } from "../../../../styles/index.styled";
import { setCloseEditTaskModal, setDeleteTask } from "../../../../store/actions/actionTypes";

const DeleteTaskModal: FC = () => {
  const dispatch = useDispatch()
  const selectTask = useSelector(
    (state: RootState) => state.createCardProject.selectTask
  );

    const toDeletTask = (selectTask:ITask) => { 
      dispatch(setDeleteTask(selectTask))
      dispatch(setCloseEditTaskModal());
    }

  return (
    <>
      <PDiscriptionEl lineHeight="22px">
        All activities will be removed from the feed and you will not be able to
        reopen the card. Cancellation is not possible.
      </PDiscriptionEl>
      <Button
          background="#b04632"
          width="100%"
          hoverBackColor="#933b27"
          margin="10px 0 0 0"
          onClick={() => toDeletTask(selectTask)}
        >
          Delete
        </Button>
    </>
  );
};

export default DeleteTaskModal;
