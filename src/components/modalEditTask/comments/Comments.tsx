import { FC } from "react";

import Button from "../../button/Button";

import { ICommentsProps } from "./Comments.types";
import { TComment } from "../../../store/types/store.types";

import { Flex, PDiscriptionEl, WrapperEl } from "../../../styles/index.styled";
import { CommentsWrapper, ContainerEL } from "./Comments.styled";

const Comments: FC<ICommentsProps> = ({
  items,
  setIdSelectComment,
  setSelectComments,
  addSubCommetns,
  TextAreaRef,
}) => {
  return (
    <>
      {items &&
        items.map((comment: TComment, i: number) => (
          <CommentsWrapper key={i}>
            <Flex
              alignItems="center"
              padding="8px 3px 8px 12px"
              justifyContent="space-between"
              width="100%"
            >
              <WrapperEl margin="0 5px 0 0">
                <PDiscriptionEl color="#000" lineHeight="normal">
                  {comment.text}
                </PDiscriptionEl>
              </WrapperEl>
              <Button
                onClick={() => {
                  setIdSelectComment(comment.id);
                  TextAreaRef?.current?.focus();
                  setSelectComments(comment);
                  addSubCommetns();
                }}
                fontSize="14px"
                padding="6px 12px"
                background="transparent"
                hoverBackColor="#dfdfdf"
              >
                Ответить
              </Button>
            </Flex>
            <ContainerEL>
              {comment?.subComments && comment?.subComments?.length ? (
                <Comments
                  items={comment.subComments}
                  setIdSelectComment={setIdSelectComment}
                  addSubCommetns={addSubCommetns}
                  setSelectComments={setSelectComments}
                  TextAreaRef={TextAreaRef}
                />
              ) : null}
            </ContainerEL>
          </CommentsWrapper>
        ))}
    </>
  );
};

export default Comments;
