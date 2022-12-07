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
  margin: 4px 2px 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContainerEL = styled.div`
padding: 0px 0 0 10px;
`

export interface IComments {
  items: TComment[];
  setIdSelectComment: React.Dispatch<React.SetStateAction<string>>;
  setCheckFocusTextArComments: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectComments:React.Dispatch<React.SetStateAction<TComment | null>>
  TextAreaRef: React.RefObject<HTMLTextAreaElement>;
  addSubCommetns:() => void
}

const Comments: FC<IComments> = ({
  items,
  setIdSelectComment,
  setCheckFocusTextArComments,
  setSelectComments,
  TextAreaRef,
  addSubCommetns
}) => {
  return (
    <>
      {items &&
        items.map((comment: TComment, i: number) => (
          <CommentsWrapper key={i}>
            <Flex
              alignItems="center"
              padding="8px 3px 2px 12px"
              justifyContent="space-between"
              width="100%"
            >
              <PDiscriptionEl color="#000" lineHeight="normal">
                {comment.text}
              </PDiscriptionEl>
              <AiOutlinePlus
                cursor="pointer"
                onClick={() => (
                  setIdSelectComment(comment.id),
                  TextAreaRef?.current?.focus(),
                  setCheckFocusTextArComments(true),
                  setSelectComments(comment),
                  addSubCommetns()
                )}
              />
            </Flex>
             <ContainerEL>
             {comment?.subComments && comment?.subComments?.length ? (
                <Comments
                  items={comment.subComments}
                  setIdSelectComment={setIdSelectComment}
                  setCheckFocusTextArComments={setCheckFocusTextArComments}
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
