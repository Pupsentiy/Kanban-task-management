import { FC, useState } from "react";

import Input from "../../input/Input";

import { IInvestmentProps } from "./Investment.types";

import { BsPinAngle } from "react-icons/bs";
import { ContainerIcon, Flex, H6 } from "../../../styles/index.styled";
import { ButtonLoadFile, WrapperInput } from "./Investment.styled";

const Investment: FC<IInvestmentProps> = ({ task, setTask }) => {
  const [loadFiles, setLocadFiles] = useState<FileList | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      setLocadFiles(event.target.files?.[0] || null)
    }
  }
  console.log();
  return (
    <Flex alignItems="top" margin="5px 0">
      <ContainerIcon>
        <BsPinAngle fontSize="22px" />
      </ContainerIcon>
      <Flex
        flexDirection="column"
        margin="0 0 0 40px"
        maxWidth="552px"
        width="100%"
      >
        <Flex alignItems="center" padding="12px 0">
          <H6>Вложения</H6>
        </Flex>
        <Flex margin="0 0 10px 0" position="relative">
          <ButtonLoadFile htmlFor="investment">
            Прикрепить файл
            <WrapperInput>
              <Input
                fontSize="15px"
                height="36px"
                type="file" //
                id="investment"
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
            </WrapperInput>
          </ButtonLoadFile>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Investment;
