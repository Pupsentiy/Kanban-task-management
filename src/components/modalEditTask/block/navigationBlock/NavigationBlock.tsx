import { FC, useState } from "react";

import Button from "../../../button/Button";

import { IMockButton, INavigationBlockProps } from "./NavigationBlock.types";

import { WrapperEl } from "../../../../styles/index.styled";

const NavigationBlock: FC<INavigationBlockProps> = ({
  setActiveDropDownDate,
  setActiveDropDownSubTask,
  setActiveDropDownMarker,
  setActiveBlockInvestment,
}) => {
  const [activeButton, setActiveButton] = useState(false)
 
  const mockButton:IMockButton[] = [
    { name: "Date", func: setActiveDropDownDate },
    { name: "Tasks", func: setActiveDropDownSubTask },
    { name: "Priority", func: setActiveDropDownMarker },
    { name: "Attach file", func: setActiveBlockInvestment },
    { name: "Archiving", func: setActiveButton },//замена
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
             {activeButton && item.name === 'Archiving' ? item.name = 'back' : item.name}
            </Button>
          </WrapperEl>
        ))}
         {activeButton ? <Button
              background="#b04632"
              width="100%"
              hoverBackColor="#933b27"
            >
              Delete
            </Button> : null}
    </>
  );
};

export default NavigationBlock;
