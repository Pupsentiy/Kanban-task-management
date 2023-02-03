import { FC } from "react";

import Button from "../../../button/Button";

import { INavigationBlockProps } from "./NavigationBlock.types";

import { WrapperEl } from "../../../../styles/index.styled";

const NavigationBlock: FC<INavigationBlockProps> = ({
  setActiveDropDownDate,
  setActiveDropDownSubTask,
  setActiveDropDownMarker,
  setActiveBlockInvestment,
}) => {
  const mockButton = [
    { name: "Date", func: setActiveDropDownDate },
    { name: "Tasks", func: setActiveDropDownSubTask },
    { name: "Priority", func: setActiveDropDownMarker },
    { name: "Attach file", func: setActiveBlockInvestment },
  ];

  return (
    <>
      {mockButton &&
        mockButton.map((item, i) => (
          <WrapperEl margin="0 0 6px 0" key={i}>
            <Button
              background="#5f9ea094"
              width="100%"
              hoverBackColor="#5f9ea0"
              onClick={() => item.func(true)}
            >
              {item.name}
            </Button>
          </WrapperEl>
        ))}
    </>
  );
};

export default NavigationBlock;
