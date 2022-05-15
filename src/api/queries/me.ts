import { UserFragment } from "api/fragments/user-fragment";
import gql from "graphql-tag";

export const ME = gql`
  ${UserFragment}
  query Me {
    me {
      ...UserFragment
    }
  }
`;
