import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../button/Button";

import { INavigationBlockProps } from "./NavigationBlock.types";
import { RootState } from "../../../../store/store";

import { WrapperEl } from "../../../../styles/index.styled";
import {
  setActiveButton,
  setDeactiveButton,
} from "../../../../store/actions/actionTypes";

const NavigationBlock: FC<INavigationBlockProps> = ({
  setActiveModalDate,
  setActiveModalSubTask,
  setActiveModalMarker,
  setActiveBlockInvestment,
  setActiveModalDelete,
}) => {
  const dispatch = useDispatch();
  const activeButton = useSelector(
    (state: RootState) => state.createCardProject.activeButtonDelete
  );
  const mockButton = [
    { name: "Date" },
    { name: "Tasks" },
    { name: "Priority" },
    { name: "Attach file" },
    { name: "Archiving" },
  ];

  const onActiveModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = (event.target as HTMLButtonElement).innerHTML;
    switch (name) {
      case "Date":
        setActiveModalDate(true);
        break;
      case "Tasks":
        setActiveModalSubTask(true);
        break;
      case "Priority":
        setActiveModalMarker(true);
        break;
      case "Attach file":
        setActiveBlockInvestment(true);
        break;
      case "Archiving":
        dispatch(setActiveButton());
        break;
      case "Back":
        dispatch(setDeactiveButton());
        break;
      case "Delete":
        setActiveModalDelete(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {mockButton &&
        mockButton.map((item, i) => (
          <WrapperEl margin="0 0 6px 0" key={i}>
            {activeButton && item.name === "Archiving" ? (
              <Button
                background="#5f9ea094"
                width="100%"
                hoverBackColor="#5f9ea0"
                onClick={(event) => onActiveModal(event)}
              >
                Back
              </Button>
            ) : (
              <Button
                background="#5f9ea094"
                width="100%"
                hoverBackColor="#5f9ea0"
                onClick={(event) => onActiveModal(event)}
              >
                {item.name}
              </Button>
            )}
          </WrapperEl>
        ))}
      {activeButton ? (
        <Button
          background="#b04632"
          width="100%"
          hoverBackColor="#933b27"
          onClick={(event) => onActiveModal(event)}
        >
          Delete
        </Button>
      ) : null}
    </>
  );
};

export default NavigationBlock;
