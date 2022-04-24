import { Popover } from "antd";
import { ITask } from "configs/interfaces/common/task.interface";
import { SystemColor } from "configs/styles/colors";
import moment from "moment";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { TaskDetailCardCurrentIdState } from "recoil/atoms";
import styled from "styled-components";
import useTask from "util/hooks/useTask";
import { ProfileBadges } from "../Badge/ProfileBadge";
import CloseIconButton from "../Button/IconButton/CloseIconButton";
import TaskStatusIconButton from "../Button/IconButton/TaskStatusIconButton";
import Input from "../Input/Input";
import ColumnFlexSection from "../Layout/ColumnFlexSection";
import RowFlexSection from "../Layout/RowFlexSection";
import TaskCardMenu, { getTaskCardMenuTitle } from "../Menu/TaskCardMenu";
import Typo from "../Typo/Typo";
import TaskDetailCard from "./TaskDetailCard";

interface ITaskCardProps {
  task: ITask;
  depth: number;
  parentId?: string;
}

export function TaskCard({ task, depth, parentId }: ITaskCardProps) {
  // title, deadline, status related hooks
  const connectedTaskOptions = useTask(task, parentId);
  const {
    title,
    content,
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
  } = connectedTaskOptions;

  const inputRef = useRef<HTMLInputElement>(null);
  const setInputFocus = () => {
    inputRef.current?.focus();
  };

  const [detailCardCurrentId, setDetailCardCurrentId] = useRecoilState(
    TaskDetailCardCurrentIdState
  );

  const handleOpenDetailCard = () => {
    closeMenu();
    setDetailCardCurrentId(task._id);
  };

  return (
    <>
      <TaskDetailCard
        task={task}
        parentId={parentId}
        connectedTaskOptions={connectedTaskOptions}
      />
      <Popover
        content={() =>
          TaskCardMenu({
            task,
            menu,
            setMenu,
            setInputFocus,
            setInvolvedUsers,
            setDeadline,
            setChanged,
          })
        }
        title={
          <RowFlexSection justifyContent="space-between" padding="6px 0 4px">
            <Typo fontSize="0.9rem">{getTaskCardMenuTitle(menu)}</Typo>
            <CloseIconButton onClick={closeMenu} />
          </RowFlexSection>
        }
        visible={menu?.visible}
        onVisibleChange={(visible) => setMenu({ visible })}
        placement={"bottomLeft"}
        trigger=""
      >
        <CardContainer
          id={task._id}
          depth={depth}
          onClick={handleOpenDetailCard}
          currentDetailOpened={detailCardCurrentId === task._id}
        >
          <ColumnFlexSection>
            <RowFlexSection gap={2}>
              <TaskStatusIconButton
                status={status}
                setStatus={setStatus}
                setChanged={setChanged}
              />
              <Input
                ref={inputRef}
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleCaptureShortcut}
              />
            </RowFlexSection>

            {(deadline?.from || deadline?.to) && (
              <Typo
                color="#bbb"
                fontSize="0.65rem"
                onClick={openMenuWithSetDeadline}
              >
                {deadline.from &&
                  moment(deadline.from).local().format("YY/MM/DD")}
                ~{deadline.to && moment(deadline.to).local().format("YY/MM/DD")}
              </Typo>
            )}
          </ColumnFlexSection>
          <ProfileBadges
            users={[task.author, ...involvedUsers]}
            onClick={openMenuWithAssignMember}
          />
        </CardContainer>
      </Popover>
      {childrens.map((childrenTask) => (
        <TaskCard
          depth={depth + 1}
          key={childrenTask._id}
          task={childrenTask}
          parentId={task._id}
        />
      ))}
    </>
  );
}

const CardContainer = styled.div<{
  depth: number;
  currentDetailOpened?: boolean;
}>`
  display: flex;
  width: 360px;
  height: 60px;
  background: white;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 12px;
  position: relative;
  cursor: pointer;
  margin-left: ${(props) => (props.depth - 1) * 40}px;
  ${(props) =>
    props.currentDetailOpened && `outline: 1.5px solid ${SystemColor.Blue50};`}
  :hover {
    outline: 1px solid ${SystemColor.Blue50};
  }
`;
