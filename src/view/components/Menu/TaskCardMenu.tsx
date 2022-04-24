import { useQuery } from "@apollo/react-hooks";
import { DatePicker, Select } from "antd";
import { PROJECT_USERS } from "api/queries/projectUsers";
import { IDateRange } from "configs/interfaces/common/date-range.interface";
import { IUserMeta } from "configs/interfaces/common/user-meta.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import { TaskTitleCommand } from "configs/shortcuts/task-title-shortcuts";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import errorLogger from "util/logger/error-logger";
import Typo from "../Typo/Typo";

type TaskCardMenuType =
  | TaskTitleCommand.AssignMembers
  | TaskTitleCommand.SetDeadline;
export interface ITaskCardMenuOption {
  visible?: boolean;
  type?: TaskCardMenuType;
}

export interface ITaskCardMenuProps {
  task: ITask;
  menu?: ITaskCardMenuOption;
  setMenu: React.Dispatch<
    React.SetStateAction<ITaskCardMenuOption | undefined>
  >;
  setInputFocus?: () => void;
  setInvolvedUsers?: React.Dispatch<
    React.SetStateAction<IUserMeta[] | undefined>
  >;
  setDeadline?: React.Dispatch<React.SetStateAction<IDateRange | undefined>>;
  setChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCardMenu = (props: ITaskCardMenuProps) => {
  const {
    task,
    menu,
    setMenu,
    setInputFocus,
    setInvolvedUsers,
    setDeadline,
    setChanged,
  } = props;
  const [users, setUsers] = useState<IUserMeta[]>([]);
  const {
    data: userData,
    error: userError,
    loading: userLoading,
    refetch: refetchUsers,
  } = useQuery<{ projectUsers: IUserMeta[] }, { id: string }>(PROJECT_USERS, {
    variables: { id: task.project?._id! },
    skip: menu?.type !== TaskTitleCommand.AssignMembers || !task.project?._id,
  });
  const [isDateRange, setIsDateRange] = useState<boolean>(
    !!task.deadline?.from && !!task.deadline?.to
  );

  useEffect(() => {
    if (userData) {
      setUsers(userData.projectUsers);
    }
  }, [userData]);
  useEffect(() => {
    if (userError) {
      errorLogger(userError);
    }
  }, [userError]);
  useEffect(() => {
    refetchUsers().catch(() => {});
  }, [refetchUsers]);

  const captureCloseKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      setMenu({ visible: false });
      setInputFocus && setInputFocus();
    }
  };

  const captureInDeadline = (e: React.KeyboardEvent<HTMLElement>) => {
    captureCloseKey(e);
    if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      setIsDateRange((prev) => !prev);
    }
  };

  const handleChangeAssignedMembers = (values: string[], option: any) => {
    const involvedUserIds = values.filter((id) => id !== task.author._id);
    const involvedUsers = involvedUserIds
      .map((id) => {
        const user = users.find((user) => user._id === id);
        if (!user) {
          errorLogger(new Error(`cannot find user: ${id}`));
        }
        return user;
      })
      .filter((user) => user);
    setInvolvedUsers && setInvolvedUsers(involvedUsers as IUserMeta[]);
    setChanged && setChanged(true);
  };

  const handleChangeDateRange = ([fromMoment, toMoment]: any) => {
    setDeadline &&
      setDeadline({
        from: (fromMoment as Moment).toDate(),
        to: (toMoment as Moment).toDate(),
      });
    setChanged && setChanged(true);
  };

  const handleChangeDate = (toMoment: Moment | null) => {
    setDeadline &&
      setDeadline({
        from: undefined,
        to: (toMoment as Moment).toDate(),
      });
    setChanged && setChanged(true);
  };

  switch (menu?.type) {
    case TaskTitleCommand.AssignMembers:
      return (
        <MenuContainer>
          <Select
            showSearch
            mode="multiple"
            allowClear
            placeholder="Select members"
            optionFilterProp="children"
            defaultValue={[
              task.author._id,
              ...task.involvedUsers.map((user) => user._id),
            ]}
            defaultOpen={true}
            onKeyDown={captureCloseKey}
            onChange={handleChangeAssignedMembers}
            autoFocus
            loading={userLoading}
          >
            {users.map((user) => (
              <Select.Option
                value={user._id}
                key={user._id}
                disabled={task.author._id === user._id}
              >
                {user.name} ({user.email})
              </Select.Option>
            ))}
          </Select>
        </MenuContainer>
      );
    case TaskTitleCommand.SetDeadline:
      return (
        <MenuContainer>
          {isDateRange ? (
            <DatePicker.RangePicker
              defaultValue={[
                task.deadline?.from ? moment(task.deadline?.from) : moment(),
                task.deadline?.to ? moment(task.deadline?.to) : moment(),
              ]}
              onKeyDown={captureInDeadline}
              onChange={handleChangeDateRange}
              autoFocus
            />
          ) : (
            <DatePicker
              defaultValue={
                task.deadline?.to ? moment(task.deadline?.to) : moment()
              }
              onKeyDown={captureInDeadline}
              onChange={handleChangeDate}
              autoFocus
            />
          )}
          <Typo padding="12px 0 0" fontSize="0.75rem" color="#aaa">
            <Typo span code fontSize="0.675rem">
              Shift
            </Typo>{" "}
            <Typo span code fontSize="0.675rem">
              Tab
            </Typo>{" "}
            to set the {isDateRange ? "date" : "date range"}
          </Typo>
        </MenuContainer>
      );
    default:
      return <></>;
  }
};

const MenuContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  .ant-select {
    width: 100%;
  }
`;

export default TaskCardMenu;
export const getTaskCardMenuTitle = (menu?: ITaskCardMenuOption) => {
  if (!menu?.type) {
    return "";
  }
  switch (menu.type) {
    case TaskTitleCommand.AssignMembers:
      return "Assign members";
    case TaskTitleCommand.SetDeadline:
      return "Set deadline";
    default:
      return "";
  }
};
