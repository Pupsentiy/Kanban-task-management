import { FC, useState } from "react";

import Button from "../../button/Button";
import CheckBox from "../../checkBox/CheckBox";

import { ICreatingMarkerPriorityProps } from "./CreatingMarkerPriority.types";
import { IPriorityMarker } from "../../../store/types/store.types";

import { PDiscriptionEl } from "../../../styles/index.styled";
import { ContentMarker, WrapperMarker } from "./CreatingMarkerPriority.styled";

const CreatingMarkerPriority: FC<ICreatingMarkerPriorityProps> = ({
  setActiveDropDownMarker,
  setTask,
  task,
}) => {
  const [toggle, setToggle] = useState(false);

  const marking: IPriorityMarker[] = [
    {
      id: 0,
      name: "Приоритет - 1",
      color: "#F5D3CE",
      colorCircle: "#EF7564",
      check: false,
    },
    {
      id: 1,
      name: "Приоритет - 2",
      color: "#D6ECD2",
      colorCircle: "#7BC86C",
      check: false,
    },
    {
      id: 2,
      name: "Приоритет - 3",
      color: "#FAF3C0",
      colorCircle: "#F5DD29",
      check: false,
    },
  ];

  const addMarker = (index: number, marker: IPriorityMarker) => {
    if (index === marker.id) {
      setToggle(!toggle);
      setTask({
        ...task,
        priorityMarker: {
          ...(task.priorityMarker = { ...marker, check: true }),
        },
      });
    }

    setActiveDropDownMarker(false);
  };

  const removeMarker = () => {
    setTask({
      ...task,
      priorityMarker: null,
    });
    setActiveDropDownMarker(false);
  };

  return (
    <>
      {marking &&
        marking.map((marker, i) => (
          <WrapperMarker key={i}>
            <CheckBox
              onClick={() => addMarker(i, marker)}
              active={
                task.priorityMarker !== null &&
                task.priorityMarker?.id === i &&
                task.priorityMarker?.check
              }
            />
            <ContentMarker
              background={marker.color}
              beforeBackground={marker.colorCircle}
            >
              <PDiscriptionEl lineHeight="32px" fontSize="14px">
                {marker.name}
              </PDiscriptionEl>
            </ContentMarker>
          </WrapperMarker>
        ))}
      <Button
        onClick={() => removeMarker()}
        padding="6px 12px"
        background="#5f9ea094"
        hoverBackColor="#5f9ea0"
        width="100%"
      >
        Удалить Метку
      </Button>
    </>
  );
};

export default CreatingMarkerPriority;
