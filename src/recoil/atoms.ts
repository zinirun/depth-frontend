import { IProject } from "configs/interfaces/common/project.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import { atom } from "recoil";
import { ICustomizedOption } from "util/hooks/useCustomized";
import { IHeaderOption } from "view/components/Header";
import { IModalProps } from "view/components/Modal";
import { IUser } from "../configs/interfaces/common/user.interface";

export const UserState = atom<IUser | null>({
  key: "app/user",
  default: null,
});

export const HeaderState = atom<IHeaderOption>({
  key: "app/header",
  default: {},
});

export const ModalState = atom<IModalProps>({
  key: "app/modal",
  default: {
    visible: false,
  },
});

// customized setting by user (view-focus, fold..)
export const CustomzizedState = atom<
  Record<string, ICustomizedOption | undefined>
>({
  key: "project/customized",
  default: {}, // projectId: ICustomizedOption
});

// after create children, move children..
export const TaskEventFocusState = atom<string | undefined>({
  key: "app/task-event-focus",
  default: undefined,
});

export const ProjectsState = atom<IProject[]>({
  key: "project/list",
  default: [],
});

export const TaskStore = atom<Record<string, ITask[]>>({
  key: "project/task-store",
  default: {},
});

export const FlatTaskStore = atom<Record<string, Record<string, ITask>>>({
  key: "project/flat-task-store",
  default: {},
});

export const TaskDetailCardCurrentIdState = atom<string | undefined>({
  key: "task/detail-card",
  default: undefined,
});
