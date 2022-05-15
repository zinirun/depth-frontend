import { IProject } from "configs/interfaces/common/project.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ICustomizedOption } from "util/hooks/useCustomized";
import { IHeaderOption } from "view/components/Header";
import { IModalProps } from "view/components/Modal";
import { IUser } from "../configs/interfaces/common/user.interface";

const { persistAtom } = recoilPersist();

export const UserState = atom<IUser | undefined>({
  key: "app/user",
  default: undefined,
});

export const UserPendingState = atom<
  | {
      id: string;
      email: string;
      name?: string;
      authType: string;
      companyName: string;
    }
  | undefined
>({
  key: "app/user-pending",
  default: undefined,
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
  effects: [persistAtom],
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

export const MyTasksState = atom<{
  today: ITask[];
  thisWeek: ITask[];
  recent: ITask[];
}>({
  key: "workspace/my-tasks",
  default: {
    today: [],
    thisWeek: [],
    recent: [],
  },
});

export const TaskDetailCardCurrentIdState = atom<string | undefined>({
  key: "task/detail-card",
  default: undefined,
});

export const WorkspaceMainTabKeyState = atom<string>({
  key: "workspace/main-tab-key",
  default: "projects",
  effects: [persistAtom],
});
