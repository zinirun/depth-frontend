import gql from "graphql-tag";

export interface ICreateUserInput {
  email: string;
  role: "Common" | "Manager" | "Admin";
}

export const INVITE_USER_TO_COMPANY = gql`
  mutation InviteUserToCompany($user: CreateUserInput!) {
    inviteUserToCompany(user: $user) {
      _id
      name
      email
    }
  }
`;
