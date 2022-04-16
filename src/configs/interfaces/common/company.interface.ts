import { IUser } from "./user.interface";

export interface ICompany {
  _id: string;
  name: string;
  email: string;
  users?: IUser[];
  createdAt: Date;
  updatedAt: Date;
}
