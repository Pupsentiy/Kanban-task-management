import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "moment/locale/ru";

import ActionBlock from "./block/actionBlock/ActionBlock";
import DescriptionBlock from "./block/descriptionBlock/DescriptionBlock";
import InvestmentBlock from "./block/investmentBLock/InvestmentBlock";
import NavigationBlock from "./block/navigationBlock/NavigationBlock";
import SubTasksBlock from "./block/subTasksBLock/SubTasksBlock";
import DatesModal from "./modal/datesModal/DatesModal";
import HeaderBlock from "./block/headerBlock/HeaderBlock";
import MarkerPriorityModal from "./modal/MarkerPriorityModal/MarkerPriorityModal";
import SubTaskModal from "./modal/subTaskModal/SubTaskModal";
import DeleteTaskModal from "./modal/deleteTaskModal/DeleteTaskModal";
import ModalNavigation from "../modalNavigation/ModalNavigation";
 
import {
  setCloseEditTaskModal,
  setDeactiveButton,
  setEditTask,
} from "../../store/actions/actionTypes";
import { RootState } from "../../store/store";
import { ITask, TComment } from "../../store/types/store.types";

import {
  Modal,
  ModalBodyWrapper,
  ModalContent,
  WrapperNavigation,
  ModalOtherBlock,
  ModalWrapperHeader,
  ContainerModal,
} from "./ModalEditTask.styled";
import { H6, PDiscriptionEl, WrapperBlock } from "../../styles/index.styled";
import DetailsBlock from "./block/detailsBlock/DetailsBlock";

const ModalEditTask: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);

  const selectTask = useSelector(
    (state: RootState) => state.createCardProject.selectTask
  );
  const activeModal = useSelector(
    (state: RootState) => state.createCardProject.toggleModalEditTask
  );

  const [changeHeaderTask, setChangeHeaderTask] = useState<boolean>(false);
  const [changeDescriptionTask, setChangeDescriptionTask] =
    useState<boolean>(false);
  const [idSelectComment, setIdSelectComment] = useState("");
  const [task, setTask] = useState<ITask>(selectTask);
  const [commentTextValue, setCommentTextValue] = useState<string>("");
  const [selectComment, setSelectComments] = useState<TComment | null>(null);
  const [activeInputDate, setActiveInputDate] = useState<boolean>(false);
  const [activeModalDate, setActiveModalDate] = useState<boolean>(false);
  const [activeModalSubTask, setActiveModalSubTask] =
    useState<boolean>(false);
  const [activeModalMarker, setActiveModalMarker] =
    useState<boolean>(false);
  const [activeBlockInvestment, setActiveBlockInvestment] =
    useState<boolean>(false);
  const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
  useEffect(() => {
    setTask(selectTask);
  }, [selectTask]);
  const onChangeTask = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const onChangeComment = (event: { target: { value: string } }) => {
    setCommentTextValue(event.target.value);
  };

  const closeModal = () => {
    dispatch(setCloseEditTaskModal());
  };

  const newComment: TComment = {
    id: uuidv4(),
    text: commentTextValue,
    subComments: [],
  };

  const addSubCommetns = () => {
    if (commentTextValue !== "") {
      if (selectComment?.id === idSelectComment) {
        selectComment?.subComments.push(newComment);
      }
    }
    setCommentTextValue("");
  };

  const saveComments = () => {
    if (commentTextValue !== "") {
      if (idSelectComment !== "") {
        addSubCommetns();
      } else {
        setTask({
          ...task,
          comments: [...task.comments, newComment],
        });
        setCommentTextValue("");
      }
    }
    setIdSelectComment("");
    setCommentTextValue("");
  };

  const saveTask = () => {
    dispatch(setEditTask(task, id, selectTask.column));
    setActiveInputDate(false);
    setActiveModalDate(false);
    setActiveModalMarker(false);
    setActiveModalSubTask(false);
    setActiveModalDelete(false)
    if (!task.files.length) {
      setActiveBlockInvestment(false);
    }
    setCommentTextValue("");
    dispatch(setDeactiveButton())
  };

  const timeIsOverdueDate =
    Date.parse(String(task?.finishDate?.date)) - new Date().getTime() + 60000;

  const changeLabelDeadline = () => {
    setTask({
      ...task,
      finishDate: {
        checkDate: !task?.finishDate?.checkDate,
        date: task?.finishDate?.date,
      },
    });
  };

  return (
    <Modal
      onClick={() => {
        saveTask();
        closeModal();
      }}
      active={activeModal}
    >
      <ModalContent
        onClick={(event) => event.stopPropagation()}
        active={activeModal}
      >
        <ModalWrapperHeader>
          <HeaderBlock
            setChangeHeaderTask={setChangeHeaderTask}
            changeHeaderTask={changeHeaderTask}
            saveTask={saveTask}
            onChangeTask={onChangeTask}
            closeModal={closeModal}
            task={task}
          />
        </ModalWrapperHeader>
        <ModalBodyWrapper>
          <ContainerModal width="100%">
            <ModalOtherBlock>
              <WrapperBlock margin="10px 0 10px 40px" alignItems="center">
                <PDiscriptionEl
                  margin="0 5px 0 0"
                  fontSize="12px"
                  lineHeight="normal"
                >
                  Current column:
                </PDiscriptionEl>
                <H6 fontSize="14px">{selectTask.column}</H6>
              </WrapperBlock>
              <DetailsBlock
                task={task}
                changeLabelDeadline={changeLabelDeadline}
                timeIsOverdueDate={timeIsOverdueDate}
              />
              <DescriptionBlock
                setChangeDescriptionTask={setChangeDescriptionTask}
                setChangeHeaderTask={setChangeHeaderTask}
                changeDescriptionTask={changeDescriptionTask}
                task={task}
                onChangeTask={onChangeTask}
                saveTask={saveTask}
              />
              {task?.subTasks?.length > 0 && (
                <SubTasksBlock task={task} setTask={setTask} />
              )}
              {activeBlockInvestment ? (
                <InvestmentBlock task={task} setTask={setTask} />
              ) : null}

              <ActionBlock
                setIdSelectComment={setIdSelectComment}
                setSelectComments={setSelectComments}
                addSubCommetns={addSubCommetns}
                saveComments={saveComments}
                onChangeComment={onChangeComment}
                commentTextValue={commentTextValue}
                task={task}
                TextAreaRef={TextAreaRef}
              />
            </ModalOtherBlock>
            <WrapperNavigation>
              <PDiscriptionEl
                margin="0 0 10px 0"
                lineHeight="normal"
                fontSize="13px"
              >
                Add to card
              </PDiscriptionEl>
              <NavigationBlock
                setActiveModalDate={setActiveModalDate}
                setActiveModalSubTask={setActiveModalSubTask}
                setActiveModalMarker={setActiveModalMarker}
                setActiveBlockInvestment={setActiveBlockInvestment}
                setActiveModalDelete={setActiveModalDelete}
              />
              {activeModalDate && (
                <ModalNavigation name="Term" setClose={setActiveModalDate}>
                  <DatesModal
                    activeInputDate={activeInputDate}
                    task={task}
                    setTask={setTask}
                    setActiveInputDate={setActiveInputDate}
                    setActiveModalDate={setActiveModalDate}
                  />
                </ModalNavigation>
              )}
              {activeModalSubTask && (
                <ModalNavigation
                  name="Adding a task list"
                  setClose={setActiveModalSubTask}
                >
                  <SubTaskModal
                    setActiveModalSubTask={setActiveModalSubTask}
                    task={task}
                    setTask={setTask}
                  />
                </ModalNavigation>
              )}

              {activeModalMarker && (
                <ModalNavigation name="Priority" setClose={setActiveModalMarker}>
                  <MarkerPriorityModal
                    setActiveModalMarker={setActiveModalMarker}
                    task={task}
                    setTask={setTask}
                  />
                </ModalNavigation>
              )}
              {activeModalDelete && 
                  <ModalNavigation name="Deleting a card" setClose={setActiveModalDelete}>
                  <DeleteTaskModal />
                </ModalNavigation>
              }
            </WrapperNavigation>
          </ContainerModal>
        </ModalBodyWrapper>
      </ModalContent>
    </Modal>
  );
};
export default ModalEditTask;
