import { UserFragment } from "api/fragments/user-fragment";
import gql from "graphql-tag";

export interface IUpdateUserInput {
  id: string;
  name?: string;
  role?: "Common" | "Manager" | "Admin";
}

export const UPDATE_ME = gql`
  ${UserFragment}
  mutation UpdateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      ...UserFragment
    }
  }
`;
