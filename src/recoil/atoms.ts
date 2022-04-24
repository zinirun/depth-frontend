import { IProject } from "configs/interfaces/common/project.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import { atom } from "recoil";
import { ITaskDetailCardProps } from "view/components/Card/TaskDetailCard";
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

export const ProjectsState = atom<IProject[]>({
  key: "project/list",
  default: [],
});

export const TaskStore = atom<Record<string, ITask[]>>({
  key: "project/task-store",
  default: {},
});

export const TaskDetailCardCurrentIdState = atom<string | undefined>({
  key: "task/detail-card",
  default: undefined,
});
