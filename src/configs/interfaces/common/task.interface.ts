import { IDateRange } from "./date-range.interface";
import { IProject } from "./project.interface";
import { ITaskComment } from "./task-comment.interface";
import { IUser } from "./user.interface";

export interface ITask {
  _id: string;
  author: IUser;
  title: string;
  content?: string;
  project: IProject;
  isTopDepth: boolean;
  childrens?: ITask[];
  involvedUsers: IUser[];
  comments: ITaskComment[];
  deadline?: IDateRange;
  status?: "Ready" | "OnGoing" | "Done";
  createdAt: Date;
  updatedAt: Date;
}
