import { IUser } from "./user.interface";

export interface ITaskComment {
  author: IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
