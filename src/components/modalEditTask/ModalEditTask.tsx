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

import DropDown from "../dropDown/DropDown";

import {
  setCloseEditTaskModal,
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
  const [activeDropDownDate, setActiveDropDownDate] = useState<boolean>(false);
  const [activeDropDownSubTask, setActiveDropDownSubTask] =
    useState<boolean>(false);
  const [activeDropDownMarker, setActiveDropDownMarker] =
    useState<boolean>(false);
  const [activeBlockInvestment, setActiveBlockInvestment] =
    useState<boolean>(false);

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
    setActiveDropDownDate(false);
    setActiveDropDownMarker(false);
    setActiveDropDownSubTask(false);
    if (!task.files.length) {
      setActiveBlockInvestment(false);
    }
    setCommentTextValue("");
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
                  Current status:
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
                setActiveDropDownDate={setActiveDropDownDate}
                setActiveDropDownSubTask={setActiveDropDownSubTask}
                setActiveDropDownMarker={setActiveDropDownMarker}
                setActiveBlockInvestment={setActiveBlockInvestment}
              />
              {activeDropDownDate && (
                <DropDown name="Term" setClose={setActiveDropDownDate}>
                  <DatesModal
                    activeInputDate={activeInputDate}
                    task={task}
                    setTask={setTask}
                    setActiveInputDate={setActiveInputDate}
                    setActiveDropDownDate={setActiveDropDownDate}
                  />
                </DropDown>
              )}
              {activeDropDownSubTask && (
                <DropDown
                  name="Adding a task list"
                  setClose={setActiveDropDownSubTask}
                >
                  <SubTaskModal
                    setActiveDropDownSubTask={setActiveDropDownSubTask}
                    task={task}
                    setTask={setTask}
                  />
                </DropDown>
              )}

              {activeDropDownMarker && (
                <DropDown name="Priority" setClose={setActiveDropDownMarker}>
                  <MarkerPriorityModal
                    setActiveDropDownMarker={setActiveDropDownMarker}
                    task={task}
                    setTask={setTask}
                  />
                </DropDown>
              )}
            </WrapperNavigation>
          </ContainerModal>
        </ModalBodyWrapper>
      </ModalContent>
    </Modal>
  );
};
export default ModalEditTask;
