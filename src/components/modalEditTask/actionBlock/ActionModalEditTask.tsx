import { FC } from "react";

import Button from "../../button/Button";
import Comments from "../comments/Comments";

import { IActionModalEditTask } from "./ActionModalEditTask.types";

import {
  ContainerIcon,
  Flex,
  H6,
  ModalTextArea,
} from "../../../styles/index.styled";
import { BsTextIndentLeft } from "react-icons/bs";

const ActionModalEditTask: FC<IActionModalEditTask> = ({
  setIdSelectComment,
  setSelectComments,
  addSubCommetns,
  saveComments,
  onChangeComment,
  commentTextValue,
  task,
  TextAreaRef,
}) => {
  return (
    <Flex alignItems="top" margin="5px 0">
      <ContainerIcon>
        <BsTextIndentLeft fontSize="22px" />
      </ContainerIcon>
      <Flex
        flexDirection="column"
        margin="0 0 0 40px"
        maxWidth="552px"
        width="100%"
      >
        <Flex alignItems="center" padding="12px 0">
          <H6>Действия</H6>
        </Flex>
        <Flex margin="0 0 10px 0">
          <ModalTextArea
            fontSize="15px"
            height="36px"
            //
            ref={TextAreaRef}
            placeholder="Напишите коментарий"
            name="comments"
            value={commentTextValue}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChangeComment(event)
            }
          />
          <Button
            margin="0 0 0 5px"
            background={commentTextValue === "" ? "#091e420a" : "#5f9ea094"}
            color={commentTextValue === "" ? "#a5adba" : "#000"}
            hoverBackColor={commentTextValue === "" ? "#091e420a" : "#5f9ea0"}
            cursor={commentTextValue === "" ? "not-allowed" : "pointer"}
            onClick={() => saveComments()}
          >
            Сохранить
          </Button>
        </Flex>
        <Comments
          items={task?.comments}
          setIdSelectComment={setIdSelectComment}
          addSubCommetns={addSubCommetns}
          setSelectComments={setSelectComments}
          TextAreaRef={TextAreaRef}
        />
      </Flex>
    </Flex>
  );
};

export default ActionModalEditTask;
