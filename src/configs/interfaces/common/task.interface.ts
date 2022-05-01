import { IDateRange } from "./date-range.interface";
import { IProject } from "./project.interface";
import { ITaskComment } from "./task-comment.interface";
import { IUser } from "./user.interface";

export type TaskStatus = "Ready" | "OnGoing" | "Done";
export interface ITask {
  _id: string;
  key: string; // in after-mapping (same with _id)
  parentId?: string; // in after-mapping (top-depth task is undefined)
  author: IUser;
  title?: string;
  content?: string;
  project: IProject;
  isTopDepth: boolean;
  children?: ITask[];
  involvedUsers: IUser[];
  comments: ITaskComment[];
  deadline?: IDateRange;
  status?: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
