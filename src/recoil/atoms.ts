import { IProject } from "configs/interfaces/common/project.interface";
import { atom } from "recoil";
import { IHeaderOption } from "view/components/Header";
import { IUser } from "../configs/interfaces/common/user.interface";

export const UserState = atom<IUser | null>({
  key: "app/user",
  default: null,
});

export const HeaderState = atom<IHeaderOption>({
  key: "app/header",
  default: {},
});

export const ProjectsState = atom<IProject[]>({
  key: "project/list",
  default: [],
});
