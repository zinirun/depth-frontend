import { Drawer, Popover } from "antd";
import { ITask } from "configs/interfaces/common/task.interface";
import { SystemColor } from "configs/styles/colors";
import moment from "moment";
import { useRef, useState } from "react";
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
import { ReactComponent as CommentIcon } from "assets/common/CommentIcon.svg";
import InputTypo from "../Input/InputTypo";
import { useSetRecoilState } from "recoil";
import { TaskDetailCardCurrentIdState } from "recoil/atoms";

interface ITaskCardProps {
  task: ITask;
  depth: number;
  parentId?: string;
}

export function TaskCard({ task, depth, parentId }: ITaskCardProps) {
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] =
    useState<boolean>(false);
  const setDetailCurrentId = useSetRecoilState(TaskDetailCardCurrentIdState);

  const connectedTaskOptions = useTask(
    task,
    parentId,
    setIsDeleteConfirmVisible
  );
  const {
    title,
    comments,
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
    deleted,
    handleDelete,
    detailVisible,
    setDetailVisible,
  } = connectedTaskOptions;

  const inputRef = useRef<HTMLInputElement>(null);
  const setInputFocus = () => {
    inputRef.current?.focus();
  };

  const handleCloseDeleteDrawer = () => {
    setIsDeleteConfirmVisible(false);
    setInputFocus();
  };

  const handleCaptureDelete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setIsDeleteConfirmVisible(false);
      handleDelete();
    }
  };

  const handleOpenDetail = () => {
    setDetailVisible && setDetailVisible(true);
    closeMenu();
    setDetailCurrentId(task._id);
  };

  return (
    <>
      {!deleted && (
        <>
          {detailVisible && (
            <TaskDetailCard
              task={task}
              connectedTaskOptions={connectedTaskOptions}
              setInputFocus={setInputFocus}
            />
          )}
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
              <RowFlexSection
                justifyContent="space-between"
                padding="6px 0 4px"
              >
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
              onClick={handleOpenDetail}
              className="task-card-container"
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
                  <ProfileBadges
                    users={[task.author, ...involvedUsers]}
                    onClick={openMenuWithAssignMember}
                  />
                </RowFlexSection>
                <RowFlexSection
                  justifyContent={
                    deadline?.from || deadline?.to
                      ? "space-between"
                      : "flex-end"
                  }
                >
                  {(deadline?.from || deadline?.to) && (
                    <Typo
                      color="#aaa"
                      fontSize="0.65rem"
                      onClick={openMenuWithSetDeadline}
                    >
                      {deadline.from &&
                        moment(deadline.from).local().format("YY/MM/DD")}
                      ~
                      {deadline.to &&
                        moment(deadline.to).local().format("YY/MM/DD")}
                    </Typo>
                  )}
                  {comments?.length ? (
                    <RowFlexSection>
                      <CommentIcon width={18} height={18} />
                      <Typo color="#aaa" fontSize="0.65rem">
                        {comments.length}
                      </Typo>
                    </RowFlexSection>
                  ) : (
                    <></>
                  )}
                </RowFlexSection>
              </ColumnFlexSection>
              <Drawer
                title={
                  isDeleteConfirmVisible && (
                    <ColumnFlexSection>
                      <InputTypo
                        fontSize="0.85rem"
                        color="white"
                        onKeyDown={handleCaptureDelete}
                        autoFocus
                        readOnly
                        value="Press ⌫"
                      />
                      <Typo fontSize="0.85rem" color="white">
                        to delete
                      </Typo>
                    </ColumnFlexSection>
                  )
                }
                closable={false}
                placement="right"
                getContainer={false}
                visible={isDeleteConfirmVisible}
                style={{ position: "absolute" }}
                onClose={handleCloseDeleteDrawer}
                bodyStyle={{ display: "none" }}
                headerStyle={{
                  border: "none",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                  background: "#f70f3b",
                  overflow: "hidden",
                }}
                width="30%"
                maskStyle={{
                  backgroundColor: "transparent",
                }}
              />
            </CardContainer>
          </Popover>
        </>
      )}
    </>
  );
}

const CardContainer = styled.div<{
  depth: number;
}>`
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
