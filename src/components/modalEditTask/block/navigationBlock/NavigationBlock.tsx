import { FC, useState } from "react";

import Button from "../../../button/Button";

import { INavigationBlockProps } from "./NavigationBlock.types";

import { WrapperEl } from "../../../../styles/index.styled";

const NavigationBlock: FC<INavigationBlockProps> = ({
  setActiveDropDownDate,
  setActiveDropDownSubTask,
  setActiveDropDownMarker,
  setActiveBlockInvestment,
}) => {
  const [activeButton, setActiveButton] = useState<boolean>(false);

  const mockButton = [
    { name: "Date" },
    { name: "Tasks" },
    { name: "Priority" },
    { name: "Attach file" },
    { name: "Archiving" },
  ];

  const onChangeButton = (name: string) => {
    switch (name) {
      case "Date":
        setActiveDropDownDate(true);
        break;
      case "Tasks":
        setActiveDropDownSubTask(true);
        break;
      case "Priority":
        setActiveDropDownMarker(true);
        break;
      case "Attach file":
        setActiveBlockInvestment(true);
        break;
      case "Archiving":
        setActiveButton(true);
        break;
      case "Back":
        setActiveButton(false);
        break;
      default:
        break;
    }
  };

  const ButtonBack = (
    <Button
      background="#5f9ea094"
      width="100%"
      hoverBackColor="#5f9ea0"
      onClick={() => onChangeButton("Back")}
    >
      Back
    </Button>
  );
  return (
    <>
      {mockButton &&
        mockButton.map((item, i) => (
          <WrapperEl margin="0 0 6px 0" key={i}>
            {activeButton && item.name === "Archiving" ? (
              ButtonBack
            ) : (
              <Button
                background="#5f9ea094"
                width="100%"
                hoverBackColor="#5f9ea0"
                onClick={() => onChangeButton(item.name)}
              >
                {item.name}
              </Button>
            )}
          </WrapperEl>
        ))}
      {activeButton ? (
        <Button background="#b04632" width="100%" hoverBackColor="#933b27">
          Delete
        </Button>
      ) : null}
    </>
  );
};

export default NavigationBlock;
