import { ICompany } from "./company.interface";

export interface IUser {
  _id: string;
  company: ICompany;
  authType: "Plain" | "Google";
  oauthProvider?: string;
  oauthId?: string;
  email: string;
  name?: string;
  role: "Common" | "Manager" | "Admin";
  inviteStatus: "Pending" | "Assigned";
  createdAt: Date;
  updatedAt: Date;
}
