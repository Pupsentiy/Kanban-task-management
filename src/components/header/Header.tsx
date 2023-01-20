import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiTask } from "react-icons/bi";

import { setSearchTask } from "../../store/actions/actionTypes";

import Input from "../input/Input";

import { routesConfig } from "../../routes/routesConfig";

import {
  Flex,
  H5,
  HeaderEl,
  NavLinkEL,
  PDiscriptionEl,
} from "../../styles/index.styled";
import {
  ContainerTask,
  NavLinkEl,
  WrapperResultSearch,
  WrapperSearch,
} from "./Header.styled";
import { RootState } from "../../store/store";

const Header: FC = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const foundTask = useSelector(
    (state: RootState) => state.createCardProject.searchTask
  );
  const searchTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    dispatch(setSearchTask(search));
  };

  return (
    <HeaderEl>
      <Flex alignItems="end">
        <H5>UpTrader</H5>
        <NavLinkEl to={routesConfig.home.path}>
          {routesConfig.home.title}
        </NavLinkEl>
        <WrapperSearch>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              searchTask(event)
            }
            label="Поиск по задачам:"
            type="text"
            width="250px"
            marginLabel="0"
            border=" #dfe1e6 2px solid "
            borderFocus="#5f9ea094 2px solid"
            borderRadius="3px"
          />
          {search.length > 1 ? (
            <WrapperResultSearch>
              {foundTask &&
                foundTask.map((item, i) => (
                  <ContainerTask key={i}>
                    <NavLinkEL to={item.projectId}  width="100%" display="flex" alignItems="center">
                    <BiTask fontSize="25px" />
                      <PDiscriptionEl
                      cursor="pointer"
                        lineHeight="normal"
                        fontSize="13px"
                        color="#172b4d"
                        margin="0 0 0 5px"
                      >
                        {item.titleTask}
                      </PDiscriptionEl>
                    </NavLinkEL>
                  </ContainerTask>
                ))}
            </WrapperResultSearch>
          ) : null}
        </WrapperSearch>
      </Flex>
    </HeaderEl>
  );
};

export default Header;
