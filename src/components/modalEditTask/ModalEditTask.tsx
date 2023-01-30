import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import "moment/locale/ru";

import HeaderModalEditTask from "./headerBlock/HeaderModalEditTask";
import DescriptionModalEditTask from "./descriptionBlock/DescriptionModalEditTask";
import ActionModalEditTask from "./actionBlock/ActionModalEditTask";
import CheckBox from "../checkBox/CheckBox";
import NavigationTask from "./navigation/NavigationTask";
import CreateSubTask from "./createSubTask/CreateSubTask";
import SubTasks from "./subTasks/SubTasks";
import CreatingMarkerPriority from "./creatingMarkerPriority/CreatingMarkerPriority";
import Investment from "./investment/Investment";
import Dates from "./datesBlock/Dates";
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
  TaskDetailsBlock,
  WrapperExpirationDate,
  Marker,
} from "./ModalEditTask.styled";
import { Flex, H6, PDiscriptionEl, WrapperEl } from "../../styles/index.styled";

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
    const [activeBlockInvestment,setActiveBlockInvestment] = useState<boolean>(false)

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
    dispatch(setEditTask(task, id, selectTask.column.toLowerCase()));
    setActiveInputDate(false);
    setActiveDropDownDate(false);
    setActiveDropDownMarker(false);
    setActiveDropDownSubTask(false);
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
          <HeaderModalEditTask
            setChangeHeaderTask={setChangeHeaderTask}
            changeHeaderTask={changeHeaderTask}
            saveTask={saveTask}
            onChangeTask={onChangeTask}
            closeModal={closeModal}
            task={task}
          />
        </ModalWrapperHeader>
        <ModalBodyWrapper>
          <Flex width="100%">
            <ModalOtherBlock>
              <Flex margin="10px 0 10px 40px" alignItems="center">
                <PDiscriptionEl
                  margin="0 5px 0 0"
                  fontSize="12px"
                  lineHeight="normal"
                >
                  Current status:
                </PDiscriptionEl>
                <H6 fontSize="14px">{selectTask.column}</H6>
              </Flex>
              <TaskDetailsBlock>
                {task?.priorityMarker ? (
                  <WrapperEl margin="5px 15px 5px 0px">
                    <PDiscriptionEl>Priority</PDiscriptionEl>
                    <Marker background={task?.priorityMarker.colorCircle}>
                      {task?.priorityMarker.name.replace("Приоритет", "№")}
                    </Marker>
                  </WrapperEl>
                ) : null}
                {task?.finishDate ? (
                  <WrapperEl margin="5px 10px 5px 10px">
                    <PDiscriptionEl>Term</PDiscriptionEl>
                    <Flex alignItems="center">
                      <WrapperEl margin=" 0 5px 0 0">
                        <CheckBox
                          onClick={() => changeLabelDeadline()}
                          active={task?.finishDate?.checkDate}
                        />
                      </WrapperEl>
                      <WrapperExpirationDate>
                        <Moment format={" DD MMM - HH:mm"} locale="en">
                          {task?.finishDate?.date}
                        </Moment>
                        {timeIsOverdueDate < 0 &&
                        !task?.finishDate?.checkDate ? (
                          <span className="overdue">
                            <PDiscriptionEl
                              lineHeight="17px"
                              color="#fff"
                              fontSize="12px"
                            >
                              overdue
                            </PDiscriptionEl>
                          </span>
                        ) : task?.finishDate?.checkDate ? (
                          <span className="performed">
                            <PDiscriptionEl
                              lineHeight="17px"
                              color="#fff"
                              fontSize="12px"
                            >
                              done
                            </PDiscriptionEl>
                          </span>
                        ) : null}
                      </WrapperExpirationDate>
                    </Flex>
                  </WrapperEl>
                ) : null}
              </TaskDetailsBlock>
              <DescriptionModalEditTask
                setChangeDescriptionTask={setChangeDescriptionTask}
                setChangeHeaderTask={setChangeHeaderTask}
                changeDescriptionTask={changeDescriptionTask}
                task={task}
                onChangeTask={onChangeTask}
                saveTask={saveTask}
              />
              {task?.subTasks?.length > 0 && (
                <SubTasks task={task} setTask={setTask} />
              )}
              {activeBlockInvestment ? <Investment task={task} setTask={setTask}/> :null}
              
              <ActionModalEditTask
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
              <NavigationTask
                setActiveDropDownDate={setActiveDropDownDate}
                setActiveDropDownSubTask={setActiveDropDownSubTask}
                setActiveDropDownMarker={setActiveDropDownMarker}
                setActiveBlockInvestment={setActiveBlockInvestment}
              />
              {activeDropDownDate && (
                <DropDown name="Term" setClose={setActiveDropDownDate}>
                  <Dates
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
                  <CreateSubTask
                    setActiveDropDownSubTask={setActiveDropDownSubTask}
                    task={task}
                    setTask={setTask}
                  />
                </DropDown>
              )}

              {activeDropDownMarker && (
                <DropDown name="Priority" setClose={setActiveDropDownMarker}>
                  <CreatingMarkerPriority
                    setActiveDropDownMarker={setActiveDropDownMarker}
                    task={task}
                    setTask={setTask}
                  />
                </DropDown>
              )}
            </WrapperNavigation>
          </Flex>
        </ModalBodyWrapper>
      </ModalContent>
    </Modal>
  );
};
export default ModalEditTask;
