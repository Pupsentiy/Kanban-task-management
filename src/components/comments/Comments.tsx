import React, { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { TComment } from "../../store/reducers/createCardProjectReducer";
import { Flex, PDiscriptionEl } from "../../styles/index.styled";

export const CommentsWrapper = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214;
  box-sizing: border-box;
  clear: both;
  display: inline-block;
  margin: 4px 2px 4px 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface IComments {
  items: TComment[];
  setIdSelectComment: React.Dispatch<React.SetStateAction<string>>;
  setCheckFocusTextArComments: React.Dispatch<React.SetStateAction<boolean>>;
  TextAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const Comments: FC<IComments> = ({
  items,
  setIdSelectComment,
  setCheckFocusTextArComments,
  TextAreaRef,
}) => {
  return (
    <>
      {items &&
        items.map((comment: TComment, i: number) => (
          <CommentsWrapper key={i}>
            <Flex
              alignItems="center"
              padding="8px 12px"
              justifyContent="space-between"
            >
              <PDiscriptionEl color="#000" lineHeight="0">
                {comment.text}
              </PDiscriptionEl>
              <AiOutlinePlus
                cursor="pointer"
                onClick={() => (
                  setIdSelectComment(comment.id),
                  TextAreaRef?.current?.focus(),
                  setCheckFocusTextArComments(true)
                )}
              />
            </Flex>
            <div>
              {comment?.subComments && comment?.subComments?.length ? (
                <Comments
                  items={comment.subComments}
                  setIdSelectComment={setIdSelectComment}
                  setCheckFocusTextArComments={setCheckFocusTextArComments}
                  TextAreaRef={TextAreaRef}
                />
              ) : null}
            </div>
          </CommentsWrapper>
        ))}
    </>
  );
};

export default Comments;
