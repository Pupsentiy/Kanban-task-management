import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { TfiClose } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";
import { Flex, H2, WrapperEl, WrapperForm } from "../../styles/index.styled";
import { HeaderModal, SectionEl } from "./ModalCreateProject.styled";

import Button from "../button/Button";
import Input from "../input/Input";

import {
  setCloseCreateProjModal,
  setCreateCardProject,
} from "../../store/actions/actionTypes";

const ModalCreateProject: FC = () => {
  const [fields, setFields] = useState<string>("");
  const dispatch = useDispatch();

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
