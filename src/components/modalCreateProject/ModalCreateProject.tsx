import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { TfiClose } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";

import { Flex, H2, WrapperEl, WrapperForm } from "../../styles/index.styled";
import Button from "../button/Button";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  setCloseCreateProjModal,
  setCreateCardProject,
} from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";

export const SectionEl = styled.section`
  position: absolute;
  width: 350px;
  will-change: top, left;
  top: 100px;
  left: 550px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  outline: 0;
  overflow: hidden;
  z-index: 5;
`;

export const HeaderModal = styled.div`
  display: flex;
  justify-conten: space-between;
`;

export type PopupClick = MouseEvent & {
  path: Node[];
};

const ModalCreateProject: FC = () => {
  const [fields, setFields] = useState<any>("");
  const dispatch = useDispatch();
  const cardProject = useSelector(
    (state: RootState) => state.createCardProject.projects
  );
  const closeCreateProModal = () => {
    dispatch(setCloseCreateProjModal());
  };

  const creatingСardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    if (fields.length > 0) {
      dispatch(setCreateCardProject(fields));
      setFields("");
      dispatch(setCloseCreateProjModal());
    }
  };

  return (
    <SectionEl>
      <WrapperEl padding="0 10px">
        <HeaderModal>
          <Flex width="100%" justifyContent="space-between">
            <H2 fontSize="14px" fontWeight="400" padding="10px 0">
              Создать доску <AiOutlinePlus />
            </H2>
            <Button type="button" onClick={closeCreateProModal}>
              <TfiClose />
            </Button>
          </Flex>
        </HeaderModal>
        <WrapperEl padding="15px 0">
          <Flex justifyContent="center">
            <WrapperForm onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Название проекта*"
                margin="5px 0 10px 0"
                width="250px;"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  creatingСardName(event)
                }
                value={fields}
              />
              <Button type="submit" background="#00000030">
                Создать
              </Button>
            </WrapperForm>
          </Flex>
        </WrapperEl>
      </WrapperEl>
    </SectionEl>
  );
};

export default ModalCreateProject;
