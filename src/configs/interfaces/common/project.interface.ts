import { ICompany } from "./company.interface";
import { IUser } from "./user.interface";

export interface IProject {
  _id: string;
  company?: ICompany;
  title: string;
  accesses: IUser[];
  manager: IUser;
  taskUpdatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
