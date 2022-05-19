import { Drawer, Popover } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import { ITask } from "configs/interfaces/common/task.interface";
import { TaskTitleCommand } from "configs/shortcuts/task-title-shortcuts";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { TaskDetailCardCurrentIdState } from "recoil/atoms";
import styled from "styled-components";
import { IConnectedTaskOptions } from "util/hooks/useTask";
import { ProfileBadge, ProfileBadges } from "../Badge/ProfileBadge";
import CloseIconButton from "../Button/IconButton/CloseIconButton";
import TaskStatusIconButton from "../Button/IconButton/TaskStatusIconButton";
import MarkdownInput from "../Input/MarkdownInput";
import MultilineInput from "../Input/MultilineInput";
import RowFlexSection from "../Layout/RowFlexSection";
import Line from "../Line";
import TaskCardMenu, {
  getTaskCardMenuTitle,
  ITaskCardMenuOption,
} from "../Menu/TaskCardMenu";
import Typo from "../Typo/Typo";
import CommentsCard from "./CommentsCard";

export interface ITaskDetailCardProps {
  task: ITask;
  connectedTaskOptions?: Partial<IConnectedTaskOptions>;
  setInputFocus?: () => void;
}

const TaskDetailCard = (props: ITaskDetailCardProps) => {
  const {
    task,
    connectedTaskOptions,
    setInputFocus: setTaskCardInputFocus,
  } = props;
  // title, deadline, status related hooks
  const {
    title,
    content,
    comments,
    handleContentChange,
    involvedUsers = [],
    setInvolvedUsers,
    deadline,
    setDeadline,
    status,
    setStatus,
    handleTitleChange,
    setChanged,
    children,
    refetch,
    detailVisible: visible,
    setDetailVisible: setVisible,
  } = connectedTaskOptions || {};

  const detailCurrentId = useRecoilValue(TaskDetailCardCurrentIdState);

  const [menu, setMenu] = useState<ITaskCardMenuOption>();
  const openMenuWithAssignMember = () => {
    setMenu({ visible: true, type: TaskTitleCommand.AssignMembers });
  };
  const openMenuWithSetDeadline = () => {
    setMenu({ visible: true, type: TaskTitleCommand.SetDeadline });
  };
  const popoverProps = {
    title: (
      <RowFlexSection justifyContent="space-between" padding="6px 0 4px">
        <Typo fontSize="0.9rem">{getTaskCardMenuTitle(menu)}</Typo>
      </RowFlexSection>
    ),
    content: () =>
      TaskCardMenu({
        task,
        menu,
        setMenu,
        setInputFocus,
        setInvolvedUsers,
        setDeadline,
        setChanged,
        withCaptureClose: false,
      }),
    trigger: "click",
    placement: "bottom" as TooltipPlacement,
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const setInputFocus = () => {
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setTaskCardInputFocus && setTaskCardInputFocus();
    setVisible && setVisible(false);
  };

  useEffect(() => {
    if (detailCurrentId === task._id) {
      setVisible && setVisible(true);
    } else {
      handleClose();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailCurrentId, task._id]);

  return (
    <Drawer
      visible={visible}
      onClose={handleClose}
      headerStyle={{
        display: "none",
      }}
      bodyStyle={{
        overflow: "hidden",
      }}
      width={560}
      mask={false}
    >
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
        alignItems="flex-start"
        justifyContent="space-between"
        padding="6px 0"
      >
        <Popover {...popoverProps}>
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
                ~{deadline.to && moment(deadline.to).local().format("YY/MM/DD")}
              </>
            ) : (
              "Set deadline"
            )}
          </Typo>
        </Popover>
        <RowFlexSection gap={8}>
          <RowFlexSection gap={4}>
            {involvedUsers?.length ? (
              <Typo fontSize="0.65rem" color="#777">
                Assigned to
              </Typo>
            ) : (
              <></>
            )}
            <Popover {...popoverProps}>
              {involvedUsers?.length ? (
                <ProfileBadges
                  users={involvedUsers}
                  onClick={openMenuWithAssignMember}
                  overflowCount={5}
                />
              ) : (
                <Typo
                  color="#555"
                  fontSize="0.65rem"
                  code
                  span
                  borderRadius="20px"
                  padding="4px 8px"
                  onClick={openMenuWithAssignMember}
                >
                  Assign members
                </Typo>
              )}
            </Popover>
          </RowFlexSection>
          <RowFlexSection gap={4}>
            <Typo fontSize="0.65rem" color="#777">
              Created by
            </Typo>
            <ProfileBadge user={task.author} />
          </RowFlexSection>
        </RowFlexSection>
      </RowFlexSection>
      <Line space={8} />
      <ContentContainer>
        <MarkdownInput value={content} onChange={handleContentChange} />
      </ContentContainer>
      <Line space={8} />
      <CommentsCard
        taskId={task._id}
        refetch={refetch}
        comments={task.comments || []}
      />
    </Drawer>
  );
};

export default TaskDetailCard;

const ContentContainer = styled.div`
  height: 50vh;
  overflow: auto;
`;
