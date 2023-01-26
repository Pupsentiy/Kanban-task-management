import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { TfiClose } from "react-icons/tfi";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import {
  ContainerIcon,
  Flex,
  H2,
  PDiscriptionEl,
  WrapperEl,
  WrapperForm,
} from "../../styles/index.styled";

import Button from "../button/Button";
import Input from "../input/Input";

import {
  setCloseCreateProjModal,
  setCreateCardProject,
} from "../../store/actions/actionTypes";
import { HeaderModal, ItemColor, SectionEl } from "./ModalCreateBoard.styled";

const ModalCreateBoard: FC = () => {
  const [fields, setFields] = useState<string>("");
  const [idColor, setIdColor] = useState<number>(0);
  const dispatch = useDispatch();

  const colors = [
    { id: 0, color: "#0079bf" },
    { id: 1, color: "#d29034" },
    { id: 2, color: "#519839" },
    { id: 3, color: "#b04632" },
    { id: 4, color: "#89609e" },
    { id: 5, color: "#cd5a91" },
  ];

  const closeCreateProModal = () => {
    dispatch(setCloseCreateProjModal());
  };

  const creatingСardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields(event.target.value);
  };



  const getColorId = (id: number) => {
    setIdColor(id);
  };

  const getColor = () => { 
   return colors.find(item => item.id === idColor ?? item )
  }


const handleSubmit = (event: React.FormEvent) => {
  if (fields.length > 0) {
    dispatch(setCreateCardProject(fields,getColor()?.color));
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
              Create Board <AiOutlinePlus />
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
                label="Title board*"
                margin="5px 0 8px 0"
                borderRadius="3px"
                border="#dfe1e6 2px solid;"
                borderFocus="#5f9ea094 2px solid;"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  creatingСardName(event)
                }
                value={fields}
              />
              <Flex margin="0 0 10px 0" flexDirection="column">
                <PDiscriptionEl
                  lineHeight="normal"
                  fontSize="12px"
                  fontWeight="600"
                  margin="0 0 8px 0"
                >
                  Background
                </PDiscriptionEl>
                <Flex>
                  {colors &&
                    colors.map((item, index) => (
                      <ItemColor key={index}>
                        <Button
                          onClick={() => {
                            getColorId(item.id);
                          }}
                          type="button"
                          opacity="0.7"
                          background={item.color}
                          margin="0"
                          width="100%"
                          height="100%"
                        />
                        {item.id === idColor ? (
                          <ContainerIcon left="4px" top="0">
                            <AiOutlineCheck />
                          </ContainerIcon>
                        ) : null}
                      </ItemColor>
                    ))}
                </Flex>
              </Flex>
              <Button type="submit" background="#00000030">
                Create
              </Button>
            </WrapperForm>
          </Flex>
        </WrapperEl>
      </WrapperEl>
    </SectionEl>
  );
};

export default ModalCreateBoard;
