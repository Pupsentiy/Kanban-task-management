import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiTask } from "react-icons/bi";

import Input from "../input/Input";

import { ITask } from "../../store/types/store.types";
import { PopupClick } from "../header/Header.types";
import { RootState } from "../../store/store";
import {
  setOpenEditTaskModal,
  setSelectTask,
  setSearchTask,
} from "../../store/actions/actionTypes";

import { Flex, PDiscriptionEl } from "../../styles/index.styled";
import {
  ContainerTask,
  NavLinkSelectTask,
  WrapperInputHeader,
  WrapperResultSearch,
  WrapperSearch,
} from "../header/Header.styled";

const TaskSearch: FC = () => {
  const wrapResRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const foundTask = useSelector(
    (state: RootState) => state.createCardProject.searchTask
  );

  const selectTask = (task: ITask, column: string) => {
    dispatch(setOpenEditTaskModal());
    dispatch(setSelectTask(task, column?.toLowerCase()));
    setSearch("");
  };

  const searchTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (search !== "") {
      dispatch(setSearchTask(search));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (wrapResRef.current && !_event.path?.includes(wrapResRef.current)) {
        setSearch("");
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <WrapperSearch onClick={(e) => e.stopPropagation()}>
      <WrapperInputHeader>
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            searchTask(event)
          }
          width="100%;"
          value={search}
          label="Search by task:"
          type="text"
          labelColor="#fff"
          marginLabel="0"
          border="#fff 2px solid "
          borderFocus="#000 2px solid"
          borderRadius="3px"
          boxShadow="0 2px 4px rgba(0, 0, 0, .2)"
        />
      </WrapperInputHeader>
      {search.length > 1 && foundTask.length ? (
        <WrapperResultSearch ref={wrapResRef}>
          {foundTask &&
            foundTask.map((task: ITask, i: number) => (
              <ContainerTask
                key={i}
                onClick={() => selectTask(task, task.column)}
              >
                <NavLinkSelectTask to={task.boardId}>
                  <Flex width="100%" alignItems="center">
                    <Flex>
                      <BiTask fontSize="25px" />
                    </Flex>
                    <PDiscriptionEl
                      cursor="pointer"
                      lineHeight="normal"
                      fontSize="14px"
                      color="#172b4d"
                      margin="0 0 0 5px"
                    >
                      {task.titleTask}
                    </PDiscriptionEl>
                  </Flex>
                </NavLinkSelectTask>
              </ContainerTask>
            ))}
        </WrapperResultSearch>
      ) : search.length > 0 ? (
        <WrapperResultSearch ref={wrapResRef}>
          <PDiscriptionEl color="#172b4d">Нечего не найдено.</PDiscriptionEl>
        </WrapperResultSearch>
      ) : null}
    </WrapperSearch>
  );
};

export default TaskSearch;
