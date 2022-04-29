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
import useFocus from "./useEventFocus";
import { DELETE_TASK } from "api/mutations/delete-task";
import { useReward } from "react-rewards";
import useCustomized from "./useCustomized";
import { useSetRecoilState } from "recoil";
import { TaskDetailCardCurrentIdState } from "recoil/atoms";

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
  children: ITask[];
  createNewChild: (isInSameDepth: boolean) => Promise<void>;
  refetch: () => Promise<void>;
  deleted: boolean;
  handleDelete: () => void;
  detailVisible: boolean;
  setDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useTask(
  originalTask: ITask,
  parentId: string | undefined,
  setDeleteConfirmVisible?: React.Dispatch<React.SetStateAction<boolean>>
): IConnectedTaskOptions {
  const projectId = originalTask.project?._id;

  const { flatTasks, refetch: refetchTasks } = useSyncronizeTask(projectId);
  const { setTaskEventFocus } = useFocus();
  const { setTaskViewFocus } = useCustomized(projectId);

  const task = flatTasks[originalTask._id];

  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const setDetailCurrentId = useSetRecoilState(TaskDetailCardCurrentIdState);

  const [deleted, setDeleted] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [children, setChildren] = useState<ITask[]>(task?.children || []);
  // inputs
  const [title, setTitle] = useState<string>(task?.title || "");
  const [content, setContent] = useState<string | undefined>(
    task?.content || ""
  );
  const [deadline, setDeadline] = useState<IDateRange | undefined>(
    omitTypename(task?.deadline)
  );
  const [involvedUsers, setInvolvedUsers] = useState<IUserMeta[] | undefined>(
    task?.involvedUsers
  );
  const [status, setStatus] = useState<TaskStatus | undefined>(task?.status);
  const [comments, setComments] = useState<ITaskComment[]>(task?.comments);
  // hooks
  const debouncedTitle = useDebounce({ value: title, delay: 500 });
  const debouncedContent = useDebounce({ value: content, delay: 500 });
  const { reward } = useReward("reward-target", "emoji", {
    emoji: ["👍", "❤️"],
    lifetime: 160,
    elementSize: 14,
    elementCount: 20,
    spread: 60,
  });
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
  const [createTask] = useMutation<
    { createTask: ITask },
    { task: ICreateTaskInput }
  >(CREATE_TASK);
  const [updateTask] = useMutation<
    { updateTask: ITask[] },
    { task: IUpdateTaskInput }
  >(UPDATE_TASK);
  const [deleteTask] = useMutation<{ deleteTask: string }, { id: string }>(
    DELETE_TASK
  );

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

  const handleCaptureShortcut = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const command = getCommandByShortcuts(e, TaskTitleShortcuts);

    if (command === TaskTitleCommand.DeleteTaskIfInputEmpty) {
      if (!title?.length) {
        e.preventDefault();
        setDeleteConfirmVisible && setDeleteConfirmVisible(true);
        return;
      } else {
        return;
      }
    }

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
        createNewChild(true);
      }
      if (command === TaskTitleCommand.NewTaskInNewDepth) {
        createNewChild(false);
      }
      if (command === TaskTitleCommand.ViewDetail) {
        setDetailCurrentId(task._id);
        setDetailVisible(true);
      }
      if (command === TaskTitleCommand.SetViewFocus) {
        setTaskViewFocus(task._id);
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
    if (next === "Done") {
      reward();
    }
    setChanged(true);
  };

  const handleSubmit = async () => {
    if (!task?._id) {
      return;
    }
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
  };

  const handleDelete = async () => {
    if (!task?._id) {
      return;
    }
    try {
      await deleteTask({
        variables: {
          id: task._id,
        },
      });
      setDeleted(true);
      setTaskEventFocus(parentId);
      await refetchTasks();
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  const createNewChild = async (isInSameDepth: boolean) => {
    try {
      if (!task?.project?._id) {
        return;
      }
      const newChild = {
        projectId: task.project._id,
        parentTaskId: isInSameDepth ? parentId : task._id,
        title: "",
      };
      const { data } = await createTask({
        variables: {
          task: newChild,
        },
      });
      await refetchTasks();
      data?.createTask._id && setTaskEventFocus(data.createTask._id);
    } catch (err) {
      errorLogger(
        new Error(`cannot create new children: ${(err as Error).message}`)
      );
    }
  };

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
    children,
    createNewChild,
    refetch: refetchTasks,
    deleted,
    handleDelete,
    detailVisible,
    setDetailVisible,
  };
}
