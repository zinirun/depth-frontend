import { useMutation } from "@apollo/react-hooks";
import { CREATE_TASK, ICreateTaskInput } from "api/mutations/create-task";
import { IUpdateTaskInput, UPDATE_TASK } from "api/mutations/update-task";
import { IDateRange } from "configs/interfaces/common/date-range.interface";
import { TaskStatus } from "configs/interfaces/common/task.interface";
import { IUserMeta } from "configs/interfaces/common/user-meta.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import {
  TaskTitleCommand,
  TaskTitleShortcuts,
} from "configs/shortcuts/task-title-shortcuts";
import { useEffect, useState } from "react";
import errorLogger from "util/logger/error-logger";
import {
  getNextTaskStatus,
  getPrevTaskStatus,
} from "view/components/Button/IconButton/TaskStatusIconButton";
import { ITaskCardMenuOption } from "view/components/Menu/TaskCardMenu";
import getCommandByShortcuts from "view/components/_util/getCommandByShortcuts";
import omitTypename from "view/components/_util/omitTypename";
import useDebounce from "view/components/_util/useDebounce";
import useSyncronizeTask from "./useSyncronizeTask";
import { ITaskComment } from "configs/interfaces/common/task-comment.interface";

export interface IConnectedTaskOptions {
  title: string;
  content?: string;
  deadline?: IDateRange;
  involvedUsers?: IUserMeta[];
  status?: TaskStatus;
  comments?: ITaskComment[];
  handleContentChange: (value?: string) => any;
  setDeadline: React.Dispatch<React.SetStateAction<IDateRange | undefined>>;
  setInvolvedUsers: React.Dispatch<
    React.SetStateAction<IUserMeta[] | undefined>
  >;
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus | undefined>>;
  setComments: React.Dispatch<React.SetStateAction<ITaskComment[]>>;
  handleTitleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleCaptureShortcut: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  menu?: ITaskCardMenuOption;
  setMenu: React.Dispatch<
    React.SetStateAction<ITaskCardMenuOption | undefined>
  >;
  closeMenu: () => void;
  openMenuWithAssignMember: (
    e?: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined
  ) => void;
  openMenuWithSetDeadline: (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => void;
  setChanged: React.Dispatch<React.SetStateAction<boolean>>;
  childrens: ITask[];
  createNewChildren: (isInSameDepth: boolean) => Promise<void>;
  refetch: () => Promise<void>;
}

export default function useTask(
  task: ITask,
  parentId: string | undefined
): IConnectedTaskOptions {
  const [needReset, setNeedReset] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [childrens, setChildrens] = useState<ITask[]>(task.childrens || []);
  // inputs
  const [title, setTitle] = useState<string>(task.title || "");
  const [content, setContent] = useState<string | undefined>(
    task.content || ""
  );
  const [deadline, setDeadline] = useState<IDateRange | undefined>(
    omitTypename(task.deadline)
  );
  const [involvedUsers, setInvolvedUsers] = useState<IUserMeta[] | undefined>(
    task.involvedUsers
  );
  const [status, setStatus] = useState<TaskStatus | undefined>(task.status);
  const [comments, setComments] = useState<ITaskComment[]>(task.comments);
  // hooks
  const { refetch: refetchTasks } = useSyncronizeTask(task.project?._id);
  const debouncedTitle = useDebounce({ value: title, delay: 700 });
  const debouncedContent = useDebounce({ value: content, delay: 700 });
  // dropdown menu
  const [menu, setMenu] = useState<ITaskCardMenuOption>();
  const closeMenu = () => setMenu({ ...menu, visible: false });
  const openMenuWithAssignMember = (e?: React.MouseEvent<HTMLDivElement>) => {
    setMenu({ visible: true, type: TaskTitleCommand.AssignMembers });
    e?.stopPropagation();
  };
  const openMenuWithSetDeadline = (e?: React.MouseEvent<HTMLElement>) => {
    setMenu({ visible: true, type: TaskTitleCommand.SetDeadline });
    e?.stopPropagation();
  };
  // api
  const [updateTask] = useMutation<
    { updateTask: ITask[] },
    { task: IUpdateTaskInput }
  >(UPDATE_TASK);
  const [createTask] = useMutation<
    { createTask: ITask },
    { task: ICreateTaskInput }
  >(CREATE_TASK);

  const handleTitleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
    if (!changed) {
      setChanged(true);
    }
  };
  const handleCaptureShortcut = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const command = getCommandByShortcuts(e, TaskTitleShortcuts);
    if (command) {
      e.preventDefault();
      if (command === TaskTitleCommand.AssignMembers) {
        openMenuWithAssignMember();
      }
      if (command === TaskTitleCommand.SetDeadline) {
        openMenuWithSetDeadline();
      }
      if (command === TaskTitleCommand.CloseMenu) {
        closeMenu();
      }
      if (command === TaskTitleCommand.TogglePreviousStatus) {
        togglePreviousStatus(status);
      }
      if (command === TaskTitleCommand.ToggleNextStatus) {
        toggleNextStatus(status);
      }
      if (command === TaskTitleCommand.NewTaskInSameDepth) {
        createNewChildren(true);
      }
    }
  };

  const handleContentChange = (value?: string) => {
    setContent(value || "");
    if (!changed) {
      setChanged(true);
    }
  };

  const togglePreviousStatus = (status?: TaskStatus) => {
    const prev = getPrevTaskStatus(status);
    if (!prev) {
      return;
    }
    setStatus(prev);
    setChanged(true);
  };

  const toggleNextStatus = (status?: TaskStatus) => {
    const next = getNextTaskStatus(status);
    if (!next) {
      return;
    }
    setStatus(next);
    setChanged(true);
  };

  const handleSubmit = async () => {
    try {
      const input = {
        title,
        deadline,
        involvedUserIds: involvedUsers?.map((user) => user._id),
        status,
        content,
      };
      await updateTask({
        variables: { task: { id: task._id, ...input } },
      });
      setChanged(false);
    } catch (err) {
      errorLogger(err as Error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const createNewChildren = async (isInSameDepth: boolean) => {
    try {
      if (!task.project?._id) {
        return;
      }
      const newChildren = {
        projectId: task.project._id,
        parentTaskId: isInSameDepth ? parentId : task._id,
        title: "",
      };
      const { data } = await createTask({
        variables: {
          task: newChildren,
        },
      });
      if (!isInSameDepth && data?.createTask) {
        setChildrens([...childrens, data?.createTask]);
      } else {
        refetch();
      }
    } catch (err) {
      errorLogger(
        new Error(`cannot create new children: ${(err as Error).message}`)
      );
    }
  };

  useEffect(() => {
    if (needReset && task) {
      setTitle(task.title || "");
      setContent(task.content || "");
      setDeadline(omitTypename(task.deadline));
      setInvolvedUsers(task.involvedUsers);
      setStatus(task.status);
      setComments(task.comments);
      setNeedReset(false);
    }
  }, [needReset, task]);

  // auto submit hooks
  useEffect(() => {
    if (debouncedTitle && changed) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle]);

  useEffect(() => {
    if (debouncedContent && changed) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent]);

  useEffect(() => {
    if (deadline && changed) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  useEffect(() => {
    if (involvedUsers && changed) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [involvedUsers]);

  useEffect(() => {
    if (status && changed) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const refetch = async () => {
    await refetchTasks();
    setTimeout(() => setNeedReset(true), 500);
  };

  return {
    title,
    content,
    deadline,
    involvedUsers,
    status,
    comments,
    handleTitleChange,
    handleContentChange,
    setDeadline,
    setInvolvedUsers,
    setStatus,
    setComments,
    handleCaptureShortcut,
    menu,
    setMenu,
    closeMenu,
    openMenuWithAssignMember,
    openMenuWithSetDeadline,
    setChanged,
    childrens,
    createNewChildren,
    refetch,
  };
}
