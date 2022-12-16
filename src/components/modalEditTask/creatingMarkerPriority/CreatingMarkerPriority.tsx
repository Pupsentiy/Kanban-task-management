import { FC, useState } from "react";
import styled from "styled-components";
import {
  IPriorityMarker,
  ITask,
} from "../../../store/reducers/createCardProjectReducer";
import { PDiscriptionEl } from "../../../styles/index.styled";
import Button from "../../button/Button";
import CheckBox from "../../checkBox/CheckBox";

export const WrapperMarker = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 6px 0px;
  padding: 0 0 3px 3px;
`;

export const ContentMarker = styled.div<{
  background: string;
  beforeBackground: string;
}>`
  background: ${(props) => props.background};
  height: 30px;
  width: 100%;
  margin: 0 0 0 10px;
  border-radius: 3px;
  position: relative;
  padding-left: 35px;
  &:before {
    content: "";
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 8px;
    border-radius: 8px;
    width: 16px;
    height: 16px;
    background: ${(props) => props.beforeBackground};
  }
`;

export interface ICreatingMarkerPriority {
  setActiveDropDownMarker: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  task: ITask;
}

const CreatingMarkerPriority: FC<ICreatingMarkerPriority> = ({
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
  };

  const removeMarker = () => {
    setTask({
      ...task,
      priorityMarker: null,
    });
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
