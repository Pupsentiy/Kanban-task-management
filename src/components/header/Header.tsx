import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchTask } from "../../store/actions/actionTypes";

import Input from "../input/Input";

import { routesConfig } from "../../routes/routesConfig";

import { Flex, H5, HeaderEl } from "../../styles/index.styled";
import { NavLinkEl, WrapperSearch } from "./Header.styled";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store/store";

const Header: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const foundTask = useSelector(
    (state: RootState) => state.createCardProject.searchTask
  );
  const searchTask = (event: React.ChangeEvent<HTMLInputElement>) => { 
    // const idProject = location.pathname.replace('/','')
    dispatch(setSearchTask(event.target.value ))
  }

 const ad =foundTask.map(item => {if(Array.isArray(item)){ return item.filter(v => v !== undefined)}}).filter((d:any) => d.length > 0)
 console.log(ad)
  return (
    <HeaderEl>
      <Flex alignItems="end">
        <H5>UpTrader</H5>
        <NavLinkEl to={routesConfig.home.path}>
          {routesConfig.home.title}
        </NavLinkEl>
        <WrapperSearch>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchTask(event)}
            label="Поиск по задачам:"
            type="text"
            width="250px"
            marginLabel="0"
            border=" #dfe1e6 2px solid "
            borderFocus="#5f9ea094 2px solid"
            borderRadius="3px"
          />
        </WrapperSearch>
      </Flex>
    </HeaderEl>
  );
};

export default Header;
