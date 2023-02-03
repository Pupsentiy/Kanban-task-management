import { FC } from 'react'
import Moment from 'react-moment'

import CheckBox from '../../../checkBox/CheckBox'

import { IDetailBlockProps } from './DetailsBlock.types'

import { TaskDetailsBlock, Marker, WrapperExpirationDate } from '../../ModalEditTask.styled'
import { WrapperEl, PDiscriptionEl, Flex } from '../../../../styles/index.styled'

const DetailsBlock:FC<IDetailBlockProps> = ({task,changeLabelDeadline,timeIsOverdueDate}) => {
  return (
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
  )
}

export default DetailsBlock