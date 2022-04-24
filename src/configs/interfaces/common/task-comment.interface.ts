import { IUser } from "./user.interface";

export interface ITaskComment {
  _id: string;
  author: IUser;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
