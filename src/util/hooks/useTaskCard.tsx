import { ApolloQueryResult } from "@apollo/react-hooks";
import { message } from "antd";
import { IUpdateTaskUserInput } from "api/mutations/update-task";
import { IDateRange } from "configs/interfaces/common/date-range.interface";
import { ITaskComment } from "configs/interfaces/common/task-comment.interface";
import { ITaskTree } from "configs/interfaces/common/task-tree.interface";
import { ITask, TaskStatus } from "configs/interfaces/common/task.interface";
import { IUserMeta } from "configs/interfaces/common/user-meta.interface";
import {
  TaskTitleCommand,
  TaskTitleShortcuts,
} from "configs/shortcuts/task-title-shortcuts";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { TaskDetailCardCurrentIdState } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";
import {
  getNextTaskStatus,
  getPrevTaskStatus,
} from "view/components/Button/IconButton/TaskStatusIconButton";
import { ITaskCardMenuOption } from "view/components/Menu/TaskCardMenu";
import getCommandByShortcuts from "view/components/_util/getCommandByShortcuts";
import omitTypename from "view/components/_util/omitTypename";
import useDebounce from "view/components/_util/useDebounce";
import useConfetti from "./useConfetti";
import useCustomized from "./useCustomized";
import useEventFocus from "./useEventFocus";
import useTaskMutation from "./useTaskMutation";
import useTaskTree from "./useTaskTree";
import useSyncronizeTask from "./useSyncronizeTask";

export interface IConnectedTaskOptions {
  task: ITask;
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
  createNewChild: (isInSameDepth: boolean) => Promise<void>;
  refetch: () => Promise<ApolloQueryResult<{ task: ITask }>>;
  refetchTree: () => Promise<ApolloQueryResult<{ taskTree: ITaskTree[] }>>;
  deleted: boolean;
  handleDelete: () => void;
  detailVisible: boolean;
  setDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useTaskCard(
  id: string,
  parentId: string | undefined,
  setDeleteConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
): IConnectedTaskOptions {
  // ------------------ data
  const { task, tasks, refetch } = useSyncronizeTask(id);
  const projectId = task?.project?._id;

  // ------------------ input states (user-side)
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

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setContent(task.content || "");
      setDeadline(task.deadline);
      setInvolvedUsers(task.involvedUsers);
      setStatus(task.status);
      setComments(task.comments);
    }
  }, [task]);

  // ------------------ state helpers
  const [deleted, setDeleted] = useState<boolean>(false);

  // ------------------ Tree hooks
  const { refetch: refetchTree } = useTaskTree(projectId);

  // ------------------ detail card
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const setDetailCurrentId = useSetRecoilState(TaskDetailCardCurrentIdState);

  // ------------------ CUD api
  const { create, update, remove } = useTaskMutation();

  // ------------------ global customized options
  const { setTaskEventFocus } = useEventFocus();
  const { setTaskViewFocus } = useCustomized(projectId);

  // ------------------ card dropdown
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

  // ------------------ input debounced hooks & methods
  const debouncedTitle = useDebounce<string>({ value: title, delay: 500 });
  const debouncedContent = useDebounce<string | undefined>({
    value: content,
    delay: 500,
  });
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
  const handleContentChange = (value?: string) => {
    setContent(value || "");
    if (!changed) {
      setChanged(true);
    }
  };

  // ------------------ etc hooks
  const { show: showConfetti } = useConfetti();

  // ------------------ task status related hooks
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
      showConfetti();
    }
    setChanged(true);
  };

  // ------------------ auto update hooks
  const [changed, setChanged] = useState<boolean>(false);
  useEffect(() => {
    if ((debouncedTitle || debouncedTitle === "") && changed) {
      handleUpdate({ title });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle]);

  useEffect(() => {
    if ((debouncedContent || debouncedContent === "") && changed) {
      handleUpdate({ content });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent]);

  useEffect(() => {
    if (deadline && changed) {
      handleUpdate({ deadline });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  useEffect(() => {
    if (involvedUsers && changed) {
      handleUpdate({ involvedUserIds: involvedUsers.map((user) => user._id) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [involvedUsers]);

  useEffect(() => {
    if (status && changed) {
      handleUpdate({ status });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // ------------------ CUD methods
  const handleUpdate = async (input: IUpdateTaskUserInput) => {
    let _input: IUpdateTaskUserInput = {};
    const { title, content, status, deadline, involvedUserIds } = input;

    if (title) {
      _input.title = title;
    }
    if (content) {
      _input.content = content;
    }
    if (status) {
      _input.status = status;
    }
    if (deadline) {
      _input.deadline = deadline;
    }
    if (involvedUserIds) {
      _input.involvedUserIds = involvedUserIds;
    }

    try {
      setChanged(false);
      await update({
        variables: {
          task: {
            id,
            ...input,
          },
        },
      });
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  const handleDelete = async () => {
    try {
      await remove({
        variables: {
          id,
        },
      });
      setDeleted(true);
      setTaskEventFocus(parentId);
      await refetchTree();
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  const handleCreate = async (isInSameDepth: boolean, sortAfterId?: string) => {
    try {
      if (!task?.project?._id) {
        return;
      }
      const newChild = {
        projectId: task.project._id,
        parentTaskId: isInSameDepth ? parentId : task._id,
        title: "",
      };

      let sortIndex: number | undefined = undefined;
      if (sortAfterId && parentId) {
        const sortAfterIndex = tasks[parentId]?.children?.findIndex(
          (task) => task._id === sortAfterId
        );
        if (sortAfterIndex !== undefined && sortAfterIndex !== -1) {
          sortIndex = sortAfterIndex + 1;
        }
      }

      const { data } = await create({
        variables: {
          task: { ...newChild, sortIndex },
        },
      });
      await refetchTree();
      data?.createTask._id && setTaskEventFocus(data.createTask._id);
    } catch (err) {
      errorLogger(
        new Error(`cannot create new children: ${(err as Error).message}`)
      );
    }
  };

  // ------------------ Input methods
  const handleCaptureShortcut = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const command = getCommandByShortcuts(e, TaskTitleShortcuts);

    if (command === TaskTitleCommand.DeleteTaskIfInputEmpty) {
      if (!task.title?.length) {
        e.preventDefault();
        setDeleteConfirmVisible(true);
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
        togglePreviousStatus(task.status);
      }
      if (command === TaskTitleCommand.ToggleNextStatus) {
        toggleNextStatus(task.status);
      }
      if (command === TaskTitleCommand.NewTaskInSameDepth) {
        handleCreate(true, task._id);
      }
      if (command === TaskTitleCommand.NewTaskInNewDepth) {
        handleCreate(false);
      }
      if (command === TaskTitleCommand.ViewDetail) {
        setDetailCurrentId(task._id);
        setDetailVisible(true);
      }
      if (command === TaskTitleCommand.SetViewFocus) {
        setTaskViewFocus(task._id);
        message.success(`Set view focus to ` + (task.title || "this task"));
      }
    }
  };

  return {
    task,
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
    createNewChild: handleCreate,
    refetchTree,
    refetch,
    deleted,
    handleDelete,
    detailVisible,
    setDetailVisible,
  };
}
