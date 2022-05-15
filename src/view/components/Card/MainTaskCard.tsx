import { ITask } from "configs/interfaces/common/task.interface";
import { SystemColor } from "configs/styles/colors";
import moment from "moment";
import styled from "styled-components";
import { ProfileBadges } from "../Badge/ProfileBadge";
import TaskStatusIconButton from "../Button/IconButton/TaskStatusIconButton";
import ColumnFlexSection from "../Layout/ColumnFlexSection";
import RowFlexSection from "../Layout/RowFlexSection";
import Typo from "../Typo/Typo";
import { ReactComponent as CommentIcon } from "assets/common/CommentIcon.svg";
import { useNavigate } from "react-router-dom";
import useEventFocus from "util/hooks/useEventFocus";

interface ITaskCardProps {
  task: ITask;
}

export default function MainTaskCard({ task }: ITaskCardProps) {
  const { title, status, deadline, involvedUsers } = task;
  const navigate = useNavigate();
  const { setTaskEventFocus } = useEventFocus();
  const handleClick = () => {
    navigate(`/workspace/tasktree/${task.project._id}`);
    setTaskEventFocus(task._id);
  };

  return (
    <CardContainer id={task._id} onClick={handleClick}>
      <ColumnFlexSection>
        <RowFlexSection gap={2}>
          <TaskStatusIconButton status={status} />
          <TaskTitle>{title}</TaskTitle>
          <ProfileBadges users={[task.author, ...involvedUsers]} />
        </RowFlexSection>
        <RowFlexSection
          justifyContent={
            deadline?.from || deadline?.to ? "space-between" : "flex-end"
          }
        >
          {(deadline?.from || deadline?.to) && (
            <Typo color="#aaa" fontSize="0.65rem">
              {deadline.from &&
                moment(deadline.from).local().format("YY/MM/DD")}
              ~{deadline.to && moment(deadline.to).local().format("YY/MM/DD")}
            </Typo>
          )}
          {task.comments?.length ? (
            <RowFlexSection>
              <CommentIcon width={18} height={18} />
              <Typo color="#aaa" fontSize="0.65rem">
                {task.comments.length}
              </Typo>
            </RowFlexSection>
          ) : (
            <></>
          )}
        </RowFlexSection>
      </ColumnFlexSection>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  width: 360px;
  height: 60px;
  background: white;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  :hover {
    outline: 1px solid ${SystemColor.Blue50};
  }
`;

const TaskTitle = styled.p`
  width: 100%;
  margin: 0;
  color: #333;
`;
