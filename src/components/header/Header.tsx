import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiTask } from "react-icons/bi";

import {
  setOpenEditTaskModal,
  setSearchTask,
  setSelectTask,
} from "../../store/actions/actionTypes";
import {   ITask } from "../../store/types/store.types";
import { PopupClick } from "./Header.types";

import Input from "../input/Input";

import { routesConfig } from "../../routes/routesConfig";

import {
  Flex,
  H5,
  HeaderEl,
  PDiscriptionEl,
} from "../../styles/index.styled";
import {
  ContainerTask,
  NavLinkEl,
  NavLinkSelectTask,
  WrapperResultSearch,
  WrapperSearch,
} from "./Header.styled";
import { RootState } from "../../store/store";


const Header: FC = () => {
  const [search, setSearch] = useState<string>("");
  const wrapResRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const foundTask = useSelector(
    (state: RootState) => state.createCardProject.searchTask
  );
 
  const searchTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
   if(search !== ''){
    dispatch(setSearchTask(search));
   }
  };

  const selectTask = (task: ITask, column: string) => {
    dispatch(setOpenEditTaskModal());
    dispatch(setSelectTask(task, column?.toLowerCase()));
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (wrapResRef.current && !_event.path?.includes(wrapResRef.current))  {
          setSearch("");
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <HeaderEl>
      <Flex alignItems="end">
        <H5>Kanban</H5>
        <NavLinkEl to={routesConfig.home.path} >
          {routesConfig.home.title}
        </NavLinkEl>
        <WrapperSearch onClick={(e) => e.stopPropagation()}>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              searchTask(event)
            }
            
            value={search}
            label="Search by task:"
            type="text"
            width="250px"
            labelColor='#fff'
            marginLabel="0"
            border="#fff 2px solid "
            borderFocus="#000 2px solid"
            borderRadius="3px"
          />
          {search.length > 1 && foundTask.length ? (
            <WrapperResultSearch ref={wrapResRef}>
              {foundTask &&
                foundTask.map((task:ITask, i:number) => (
                  <ContainerTask
                    key={i}
                    onClick={() => selectTask(task, task.column)}
                  >
                    <NavLinkSelectTask
                      to={task.projectId}
                    >
                      <Flex width="100%" alignItems="center">
                        <BiTask fontSize="25px" />
                        <PDiscriptionEl
                          cursor="pointer"
                          lineHeight="normal"
                          fontSize="13px"
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
              <PDiscriptionEl color="#172b4d">
                Нечего не найдено.
              </PDiscriptionEl>
            </WrapperResultSearch>
          ) : null}
        </WrapperSearch>
      </Flex>
    </HeaderEl>
  );
};

export default Header;
