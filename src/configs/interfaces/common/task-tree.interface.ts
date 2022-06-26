import { TaskStatus } from "./task.interface";

export interface ITaskTree {
  _id: string;
  children: ITaskTree[];
  status?: TaskStatus;
  // Frontend uses
  key: string;
  parentId?: string;
  updated?: boolean;
}
