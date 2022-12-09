import React, { FC } from "react";
import styled from "styled-components";
import { TComment } from "../../store/reducers/createCardProjectReducer";
import { Flex, PDiscriptionEl, WrapperEl } from "../../styles/index.styled";
import Button from "../button/Button";

export const CommentsWrapper = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214;
  box-sizing: border-box;
  clear: both;
  margin: 4px 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 0;
`;

export const ContainerEL = styled.div`
  padding: 0px 0 0 10px;
`;

export interface IComments {
  items: TComment[];
  setIdSelectComment: React.Dispatch<React.SetStateAction<string>>;
  setSelectComments: React.Dispatch<React.SetStateAction<TComment | null>>;
  TextAreaRef: React.RefObject<HTMLTextAreaElement>;
  addSubCommetns: () => void;
}

const Comments: FC<IComments> = ({
  items,
  setIdSelectComment,
  setSelectComments,
  TextAreaRef,
  addSubCommetns,
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
                onClick={() => (
                  setIdSelectComment(comment.id),
                  TextAreaRef?.current?.focus(),
                  setSelectComments(comment),
                  addSubCommetns()
                )}
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
                  TextAreaRef={TextAreaRef}
                  addSubCommetns={addSubCommetns}
                  setSelectComments={setSelectComments}
                />
              ) : null}
            </ContainerEL>
          </CommentsWrapper>
        ))}
    </>
  );
};

export default Comments;
