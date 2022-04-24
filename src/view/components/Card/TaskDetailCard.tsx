import { ITask } from "configs/interfaces/common/task.interface";
import { Size } from "configs/styles/size";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { TaskDetailCardCurrentIdState } from "recoil/atoms";
import styled from "styled-components";
import { IConnectedTaskOptions } from "util/hooks/useTask";
import { ProfileBadges } from "../Badge/ProfileBadge";
import CloseIconButton from "../Button/IconButton/CloseIconButton";
import TaskStatusIconButton from "../Button/IconButton/TaskStatusIconButton";
import MarkdownInput from "../Input/MarkdownInput";
import MultilineInput from "../Input/MultilineInput";
import RowFlexSection from "../Layout/RowFlexSection";
import Line from "../Line";
import Typo from "../Typo/Typo";
import CommentsCard from "./CommentsCard";

export interface ITaskDetailCardProps {
  task?: ITask;
  parentId?: string;
  connectedTaskOptions?: Partial<IConnectedTaskOptions>;
}

const TaskDetailCard = (props: ITaskDetailCardProps) => {
  const { task, parentId, connectedTaskOptions } = props;
  // title, deadline, status related hooks
  const {
    title,
    content,
    comments,
    setComments,
    handleContentChange,
    involvedUsers = [],
    setInvolvedUsers,
    deadline,
    setDeadline,
    status,
    setStatus,
    handleTitleChange,
    handleCaptureShortcut,
    menu,
    setMenu,
    openMenuWithAssignMember,
    openMenuWithSetDeadline,
    closeMenu,
    setChanged,
    childrens,
    createNewChildren,
    refetch,
  } = connectedTaskOptions || {};
  const [visible, setVisible] = useState<boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useRecoilState(
    TaskDetailCardCurrentIdState
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const setInputFocus = () => {
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setVisible(false);
    setCurrentTaskId(undefined);
  };

  useEffect(() => {
    if (task?._id === currentTaskId) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [currentTaskId, task]);

  return (
    <Container visible={visible}>
      {task && (
        <>
          <RowFlexSection
            gap={2}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <TaskStatusIconButton
              status={status}
              setStatus={setStatus}
              setChanged={setChanged}
              big
            />
            <MultilineInput
              ref={inputRef}
              value={title}
              onChange={handleTitleChange}
            />
            <CloseIconButton onClick={handleClose} />
          </RowFlexSection>
          <RowFlexSection
            gap={2}
            alignItems="flex-start"
            justifyContent="space-between"
            padding="6px 0"
          >
            <Typo
              color="#555"
              fontSize="0.65rem"
              onClick={openMenuWithSetDeadline}
              code
              span
              borderRadius="20px"
              padding="4px 8px"
            >
              {deadline?.from || deadline?.to ? (
                <>
                  {deadline.from &&
                    moment(deadline.from).local().format("YY/MM/DD")}
                  ~
                  {deadline.to &&
                    moment(deadline.to).local().format("YY/MM/DD")}
                </>
              ) : (
                "Set deadline"
              )}
            </Typo>
            <ProfileBadges
              users={[task.author, ...involvedUsers]}
              onClick={openMenuWithAssignMember}
            />
          </RowFlexSection>
          <Line space={8} />
          <ContentContainer>
            <MarkdownInput value={content} onChange={handleContentChange} />
          </ContentContainer>
          <Line space={8} />
          <CommentsCard
            taskId={task._id}
            refetch={refetch}
            comments={comments || []}
          />
        </>
      )}
    </Container>
  );
};

export default TaskDetailCard;

const Container = styled.div<{ visible?: boolean }>`
  width: 550px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  padding: 12px;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  gap: 8px;
  position: absolute;
  top: ${Size.HeaderHeight + 20}px;
  z-index: 9;
  right: 8px;
  box-shadow: rgb(15 15 15 / 10%) 0 0 4px;
`;

const ContentContainer = styled.div`
  height: 240px;
  overflow: auto;
`;
