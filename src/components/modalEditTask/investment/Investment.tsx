import { FC, useState } from "react";
import Moment from "react-moment";

import Input from "../../input/Input";

import { IInvestmentProps } from "./Investment.types";

import { BsPinAngle } from "react-icons/bs";
import {
  ContainerIcon,
  Flex,
  H6,
  PDiscriptionEl,
} from "../../../styles/index.styled";
import {
  ButtonLoadFile,
  Preview,
  WrapperInput,
  WrapperNameFile,
} from "./Investment.styled";
import Button from "../../button/Button";

const Investment: FC<IInvestmentProps> = ({ task, setTask }) => {
  const [loadFiles, setLoadFiles] = useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    // setLoadFiles([...loadFiles,event.target.files?.[0]]);

    setTask({
      ...task,
      files: [...task.files, event.target.files?.[0]],
    });
  };
  console.log(task.files);
  // const preview = loadFiles?.name.slice(
  //   loadFiles?.name.indexOf(".") + 1,
  //   loadFiles?.name.length
  // );

  const onDeleteFile = (name: string) => {
    setTask({
      ...task,
      files: task.files.filter((file) => file.name !== name),
    });
  };

  return (
    <>
      {/* {task.files.length !== 0 ? ( */}
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
            <>
              {task?.files &&
                task?.files.map((file, i) => (
                  <Flex margin="0 0 10px 0" alignItems="flex-start" key={i}>
                    <Preview>
                      {file?.name?.slice(
                        file?.name?.indexOf(".") + 1,
                        file?.name?.length
                      )}
                    </Preview>
                    <Flex flexDirection="column" alignItems="flex-start">
                      <WrapperNameFile>
                        <PDiscriptionEl
                          lineHeight="normal"
                          fontSize="14px"
                          fontWeight="700"
                        >
                          {file?.name}
                        </PDiscriptionEl>
                      </WrapperNameFile>
                      <PDiscriptionEl
                        lineHeight="normal"
                        fontSize="14px"
                        margin="0 0 6px 0"
                      >
                        <Moment format=" DD.MM.YY - HHч. : mmм.">
                          {Date.now()}
                        </Moment>
                      </PDiscriptionEl>
                      <Button
                        onClick={() => onDeleteFile(file?.name)}
                        padding="6px 12px"
                        background="transparent"
                        hoverBackColor="#dfdfdf"
                      >
                        удалить
                      </Button>
                    </Flex>
                  </Flex>
                ))}
            </>
            <Flex margin="0 0 10px 0" position="relative">
              <ButtonLoadFile htmlFor="investment">
                Прикрепить файл
                <WrapperInput>
                  <Input
                    fontSize="15px"
                    height="36px"
                    type="file" //
                    id="investment"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                  />
                </WrapperInput>
              </ButtonLoadFile>
            </Flex>
          </Flex>
        </Flex>
      {/* ) : null} */}
    </>
  );
};

export default Investment;
