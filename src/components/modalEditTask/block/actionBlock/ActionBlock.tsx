import { FC } from "react";
import { BsTextIndentLeft } from "react-icons/bs";

import CommentsBlock from "../commentsBlock/CommentsBlock";
import Button from "../../../button/Button";

import { IActionBlock } from "./ActionBlock.types";

import { Flex, ContainerIcon, H6, ModalTextArea, WrapperBlock } from "../../../../styles/index.styled";

const ActionBlock: FC<IActionBlock> = ({
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
      <WrapperBlock
        flexDirection="column"
        margin="0 0 0 40px"
        width="100%"
      >
        <Flex alignItems="center" padding="12px 0">
          <H6>Action</H6>
        </Flex>
        <Flex margin="0 0 10px 0">
          <ModalTextArea
            fontSize="15px"
            height="36px"
            //
            ref={TextAreaRef}
            placeholder="Write a comment"
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
            Save
          </Button>
        </Flex>
        <CommentsBlock
          items={task?.comments}
          setIdSelectComment={setIdSelectComment}
          addSubCommetns={addSubCommetns}
          setSelectComments={setSelectComments}
          TextAreaRef={TextAreaRef}
        />
      </WrapperBlock>
    </Flex>
  );
};

export default ActionBlock;
